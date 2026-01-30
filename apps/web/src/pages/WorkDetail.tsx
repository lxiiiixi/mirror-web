import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "@mirror/assets";
import { artsApiClient } from "../api/artsClient";
import { Spinner } from "../ui";
import { MediaItem, parseMediaType, resolveImageUrl } from "@mirror/utils";
import {
    CheckInModal,
    Directory,
    ExternalLink,
    ProductCover,
    WorkDetailAirdrop,
    WorkDetailHero,
    WorkDetailLayout,
    WorkDetailProductionTeam,
} from "../components/WorkDetail";
import { WorkDetailResponseData } from "@mirror/api";

export default function WorkDetail() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const workId = Number(searchParams.get("id") ?? "");
    const queryType = Number(searchParams.get("type") ?? "");

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [data, setData] = useState<WorkDetailResponseData | null>(null);
    const [activePage, setActivePage] = useState(1);
    const [chapterContent, setChapterContent] = useState<string | string[] | null>("");
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [chapterLoading, setChapterLoading] = useState(false);
    const [externalLinks, setExternalLinks] = useState<
        Array<{ link_id: number; link_url: string; link_type: string }>
    >([]);

    const [showCheckInModal, setShowCheckInModal] = useState(false);

    useEffect(() => {
        document.body.classList.add("work-detail-page");
        return () => {
            document.body.classList.remove("work-detail-page");
        };
    }, []);

    useEffect(() => {
        if (!workId || Number.isNaN(workId)) {
            setData(null);
            setStatus("error");
            return;
        }

        let isMounted = true;
        setStatus("loading");
        artsApiClient.work
            .detail({ work_id: workId })
            .then(response => {
                if (!isMounted) return;
                setData(response.data);
                setStatus("success");
            })
            .catch(() => {
                if (!isMounted) return;
                setStatus("error");
            });

        return () => {
            isMounted = false;
        };
    }, [workId]);

    useEffect(() => {
        if (!workId || Number.isNaN(workId)) return;
        artsApiClient.work
            .getExternalLinks({ work_id: workId })
            .then(response => {
                setExternalLinks(response.data?.links ?? []);
            })
            .catch(() => {
                setExternalLinks([]);
            });
    }, [workId]);

    const resolvedType = Number(data?.work_type ?? queryType ?? 0);
    const isMediaWork = useMemo(() => [1, 2, 5, 6, 7, 8, 9].includes(resolvedType), [resolvedType]);

    useEffect(() => {
        if (!workId || Number.isNaN(workId)) return;
        setChapterLoading(true);

        artsApiClient.work
            .getChapter({ work_id: workId, chapter_id: activePage })
            .then(response => {
                const payload = response.data;
                const content = payload.content ?? "";
                const trimmed = content.trim();

                const parts = trimmed
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);

                const media: MediaItem[] = parseMediaType(content);

                if (media.length > 0) {
                    setMediaItems(media);
                    setChapterContent(null);
                    return;
                }

                if (resolvedType === 4) {
                    const images = parts.map(item => resolveImageUrl(item));
                    setChapterContent(images);
                    setMediaItems([]);
                    return;
                }

                setChapterContent(trimmed);
                setMediaItems([]);
            })
            .catch(() => {
                setChapterContent("");
                setMediaItems([]);
            })
            .finally(() => {
                setChapterLoading(false);
            });
    }, [activePage, resolvedType, workId]);

    const showDirectory = useMemo(
        () => Number(data?.work_total_chapter ?? 0) > 1,
        [data?.work_total_chapter],
    );

    const pageTitle = data?.work_name ?? "RWA-Black Myth Wukong";

    if (status === "loading") {
        return (
            <WorkDetailLayout pageTitle={pageTitle}>
                <div className="flex justify-center py-20">
                    <Spinner size="large" />
                </div>
            </WorkDetailLayout>
        );
    }

    if (status === "error") {
        return (
            <WorkDetailLayout pageTitle={t("ticket.empty", { defaultValue: "Detail" })}>
                <div className="px-4 py-20 text-center text-[20px] text-[#c0c1c7]">
                    {t("ticket.empty")}
                </div>
            </WorkDetailLayout>
        );
    }

    if (status !== "success" || !data) {
        return null;
    }

    return (
        <WorkDetailLayout pageTitle={pageTitle}>
            {/* 头部大图 + 圆形头像 + 标题 */}
            <WorkDetailHero
                coverUrl={data.work_cover_url}
                avatarUrl={data.token_cover_url ?? data.work_cover_url}
                title={data.work_name}
                showTokenBorder={Boolean(data.show_token_border)}
                workId={workId}
                signedIn={data.signed_in === true}
            />

            <div className="p-6 space-y-6">
                {/* 空投/推广区块（有数据或占位展示） */}
                <WorkDetailAirdrop
                    workId={workId}
                    workName={data.work_name}
                    visits={data.airdrop_visits}
                    progressPercent={data.airdrop_progress_percent}
                    countdown={data.airdrop_countdown}
                    airdropAmount={data.airdrop_amount}
                    invitedCount={data.invited_count}
                />

                {/* 作品信息卡片：封面 + 标题/作者/简介 */}
                <ProductCover
                    coverUrl={data.work_cover_url}
                    title={data.work_name}
                    author={data.work_creator_name}
                    description={data.work_description}
                />

                <ExternalLink links={externalLinks} />

                {/* 制作团队 */}
                <WorkDetailProductionTeam members={data.production_team} />

                {/* 预告与剧照 */}

                {showDirectory ? (
                    <section className="px-[51px] pb-4">
                        <p className="mb-2 text-[20px] text-white/70">
                            {t("works.detail.chapterContents", {
                                defaultValue: "Chapter table of contents:",
                            })}
                        </p>
                        <Directory
                            total={data.work_total_chapter}
                            active={activePage}
                            progress={data.unlocked_chapter_count}
                            onChange={page => setActivePage(page)}
                            onBuyChapter={page => setActivePage(page)}
                        />
                    </section>
                ) : null}

                {/* 章节内容 / 媒体 */}
                <section className="px-[51px] pb-8">
                    {chapterLoading ? (
                        <div className="flex justify-center py-8">
                            <Spinner size="medium" />
                        </div>
                    ) : null}
                    {Array.isArray(chapterContent) ? (
                        <div className="flex flex-col gap-3">
                            {chapterContent.map(item => (
                                <img key={item} src={item} alt="" className="w-full rounded-lg" />
                            ))}
                        </div>
                    ) : null}
                    {typeof chapterContent === "string" && chapterContent ? (
                        <div className="whitespace-pre-wrap text-[16px] leading-relaxed text-[#aeb2ce]">
                            {chapterContent}
                        </div>
                    ) : null}
                    {mediaItems.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {mediaItems.map((item, index) => {
                                if (item.kind === "image") {
                                    return (
                                        <img
                                            key={`img-${index}`}
                                            src={item.url}
                                            alt=""
                                            className="w-full rounded-lg"
                                        />
                                    );
                                }
                                if (item.kind === "audio") {
                                    return (
                                        <audio key={`audio-${index}`} controls className="w-full">
                                            <source src={item.url} />
                                        </audio>
                                    );
                                }
                                if (item.kind === "embed") {
                                    return (
                                        <iframe
                                            key={`embed-${index}`}
                                            src={item.url}
                                            className="aspect-video w-full rounded-lg"
                                            allow="autoplay; encrypted-media"
                                            title={`embed-${index}`}
                                        />
                                    );
                                }
                                return (
                                    <video
                                        key={`video-${index}`}
                                        className="w-full rounded-lg"
                                        src={item.url}
                                        controls
                                    />
                                );
                            })}
                        </div>
                    ) : null}
                </section>
            </div>

            <CheckInModal open={showCheckInModal} onClose={() => setShowCheckInModal(false)} />
        </WorkDetailLayout>
    );
}
