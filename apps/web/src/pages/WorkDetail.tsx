import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "@mirror/assets";
import { artsApiClient } from "../api/artsClient";
import { Spinner } from "../ui";
import { MediaItem, parseMediaType, resolveImageUrl } from "@mirror/utils";
import {
    Directory,
    ExternalLink,
    ProductCover,
    WorkDetailAirdrop,
    WorkDetailHero,
    WorkDetailLayout,
} from "../components/WorkDetail";
import { WorkDetailResponseData } from "@mirror/api";

/** 制作团队：头像 + 姓名 + 角色 */
function WorkDetailProductionTeam({
    members = [],
}: {
    members?: Array<{ name: string; role: string; avatar_url?: string }>;
}) {
    const { t } = useTranslation();
    const list =
        members.length > 0
            ? members
            : [
                  { name: "卞灼", role: "导演", avatar_url: "" },
                  { name: "李振平", role: "饰 谢树文", avatar_url: "" },
                  { name: "王娟", role: "饰 谢淑贞", avatar_url: "" },
                  { name: "李红梅", role: "饰 谢淑娟", avatar_url: "" },
                  { name: "卞灼", role: "导演", avatar_url: "" },
              ];

    return (
        <section className="px-[51px] pb-8">
            <h3 className="mb-5 font-Oxanium text-[20px] font-semibold text-white">
                {t("workDetail.productionTeam", { defaultValue: "Production Team" })}
            </h3>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-6">
                {list.map((person, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="mb-2 h-[100px] w-[100px] overflow-hidden rounded-full bg-[#d9d9d9]">
                            {person.avatar_url ? (
                                <img
                                    src={resolveImageUrl(person.avatar_url)}
                                    alt={person.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : null}
                        </div>
                        <p className="font-Oxanium text-[16px] font-medium text-white">
                            {person.name}
                        </p>
                        <p className="font-Oxanium text-[14px] text-[#aeb1ce]">{person.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/** 预告与剧照：视频占位或列表 */
function WorkDetailTrailers({ videoUrl }: { videoUrl?: string }) {
    const { t } = useTranslation();

    return (
        <section className="px-[51px] pb-10">
            <h3 className="mb-5 font-Oxanium text-[20px] font-semibold text-white">
                {t("workDetail.trailersStills", { defaultValue: "Trailers & Stills" })}
            </h3>
            <div className="relative aspect-video w-full max-w-[648px] overflow-hidden rounded-[20px] bg-[#d9d9d9]">
                {videoUrl ? (
                    <video
                        src={resolveImageUrl(videoUrl)}
                        controls
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <button
                            type="button"
                            className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white/60"
                            aria-label="Play"
                        >
                            <svg
                                className="ml-2 h-12 w-12 text-[#030620]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

const demoData = {
    can_start_tge: 0,
    creative_team_block: null,
    creative_team_members: [],
    creator_id: 467853078473792,
    number_of_participants: 2,
    points_mall_url: "",
    premiere_time: "2025/01/01",
    share_count: 1001,
    show_token_border: false,
    token_border_type: 0,
    token_cover_url: "https://testimage.mirror.fan/upload/lgn/lgn_token.jpg",
    token_name: "LGN",
    token_status: 1,
    unlocked_chapter_count: 6,
    work_cover_url: "https://testimage.mirror.fan/upload/lgn/lgn_poster1.jpeg",
    work_creator_name: "理工男创作团队",
    work_description:
        '上世纪 80 年代，五位天才学子被学校安排到 105 宿舍，他们的成长环境大相径庭，性格迥异。他们对丰富多彩的大学生活充满好奇，带着各自目标，走上成为 "理工男" 的进阶之路，怀揣着极大的学习热情，对各种科技产品充满好奇。赴国外考察  的校长带回来一台先进的电脑，就是这台电脑改变了 105 宿舍五个人的命运。\n时光匆匆，转眼间 30 年过去，5 人已经成为高科技领域的佼佼者，他们各自为科研事业做着自己的一份贡献甚至有人为国捐躯。',
    work_name: "理工男",
    work_total_chapter: 1,
    work_type: 9,
};

const demoChapterContent = {
    id: 1,
    chapter_id: 1,
    parent_id: 439,
    content_type: 1,
    video_url: "https://example.com/trailer.mp4",
    duration_seconds: 120,
    cover_url: "https://example.com/cover.jpg",
    title: "第1章",
    content:
        "https://testimage.mirror.fan/upload/lgn/lgn.mp4,https://testimage.mirror.fan/upload/lgn/lgn_poster2.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster3.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster4.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster5.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster6.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster7.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster8.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster9.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster10.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster11.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster12.jpeg,https://testimage.mirror.fan/upload/lgn/lgn_poster13.jpeg",
    create_time: "2026-01-23T10:07:02+08:00",
    update_time: "2026-01-29T14:11:11+08:00",
};
export default function WorkDetail() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const workId = Number(searchParams.get("id") ?? "");
    const queryType = Number(searchParams.get("type") ?? "");

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [data, setData] = useState<WorkDetailResponseData | null>(demoData);
    const [activePage, setActivePage] = useState(1);
    const [chapterContent, setChapterContent] = useState<string | string[] | null>("");
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [chapterLoading, setChapterLoading] = useState(false);
    const [externalLinks, setExternalLinks] = useState<
        Array<{ link_id: number; link_url: string; link_type: string }>
    >([]);

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
        // setStatus("loading");
        setStatus("success");
        // artsApiClient.work
        //     .detail({ work_id: workId })
        //     .then(response => {
        //         if (!isMounted) return;
        //         setData(response.data);
        //         setStatus("success");
        //     })
        //     .catch(() => {
        //         if (!isMounted) return;
        //         setStatus("error");
        //     });

        return () => {
            isMounted = false;
        };
    }, [workId]);

    useEffect(() => {
        if (!workId || Number.isNaN(workId)) return;
        // artsApiClient.work
        //     .getExternalLinks({ work_id: workId })
        //     .then(response => {
        //         setExternalLinks(response.data?.links ?? []);
        //     })
        //     .catch(() => {
        //         setExternalLinks([]);
        //     });
    }, [workId]);

    const resolvedType = Number(data?.work_type ?? queryType ?? 0);
    const isMediaWork = useMemo(() => [1, 2, 5, 6, 7, 8, 9].includes(resolvedType), [resolvedType]);

    useEffect(() => {
        if (!workId || Number.isNaN(workId)) return;
        setChapterLoading(true);

        const payload = demoChapterContent;
        const content = payload.content ?? "";
        const trimmed = content.trim();

        const parts = trimmed
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);

        const media = parseMediaType(content);

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

        // artsApiClient.work
        //     .getChapter({ work_id: workId, chapter_id: activePage })
        //     .then(response => {
        //         const payload = response.data;
        //         const content = payload.content ?? "";
        //         const trimmed = content.trim();

        //         const parts = trimmed
        //             .split(",")
        //             .map(item => item.trim())
        //             .filter(Boolean);

        //         const media: MediaItem[] = [];
        //         parts.forEach(item => {
        //             if (imageExtRegex.test(item)) {
        //                 media.push({ kind: "image", url: resolveImageUrl(item) });
        //                 return;
        //             }
        //             if (videoExtRegex.test(item)) {
        //                 media.push({ kind: "video", url: resolveImageUrl(item) });
        //                 return;
        //             }
        //             if (audioExtRegex.test(item)) {
        //                 media.push({ kind: "audio", url: resolveImageUrl(item) });
        //                 return;
        //             }
        //             if (embedRegex.test(item)) {
        //                 media.push({ kind: "embed", url: item });
        //             }
        //         });

        //         if (media.length > 0) {
        //             setMediaItems(media);
        //             setChapterContent(null);
        //             return;
        //         }

        //         if (resolvedType === 4) {
        //             const images = parts.map(item => resolveImageUrl(item));
        //             setChapterContent(images);
        //             setMediaItems([]);
        //             return;
        //         }

        //         setChapterContent(trimmed);
        //         setMediaItems([]);
        //     })
        //     .catch(() => {
        //         setChapterContent("");
        //         setMediaItems([]);
        //     })
        //     .finally(() => {
        //         setChapterLoading(false);
        //     });
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
                <div className="px-4 py-20 text-center font-Oxanium text-[20px] text-[#c0c1c7]">
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
            />

            {/* 空投/推广区块（有数据或占位展示） */}
            <WorkDetailAirdrop
                visits={data.airdrop_visits}
                progressPercent={data.airdrop_progress_percent}
                countdown={data.airdrop_countdown}
                airdropAmount={data.airdrop_amount}
                invitationCode={data.invitation_code}
                invitationLink={data.invitation_link}
                invitedCount={data.invited_count}
                onShareX={() => window.open("https://x.com", "_blank")}
                onPointsMall={() => navigate("/vip")}
            />

            {/* 作品信息卡片：封面 + 标题/作者/简介 */}
            <section className="px-[51px] pb-6">
                <div className="flex gap-5 rounded-2xl bg-white/5 p-4">
                    <ProductCover
                        coverUrl={data.work_cover_url}
                        title={data.work_name}
                        author={data.work_creator_name}
                        description={data.work_description}
                    />
                </div>
            </section>

            <section className="px-[51px] pb-4">
                <ExternalLink links={externalLinks} />
            </section>

            {showDirectory ? (
                <section className="px-[51px] pb-4">
                    <p className="mb-2 font-Oxanium text-[20px] text-white/70">
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
                    <div className="whitespace-pre-wrap font-Oxanium text-[16px] leading-relaxed text-[#aeb2ce]">
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

            {/* 制作团队 */}
            <WorkDetailProductionTeam members={data.production_team} />

            {/* 预告与剧照 */}
            <WorkDetailTrailers videoUrl={data.trailer_video_url} />

            <div className="h-20" />
        </WorkDetailLayout>
    );
}
