export type MediaItem =
    | { kind: "image"; url: string }
    | { kind: "video"; url: string }
    | { kind: "audio"; url: string }
    | { kind: "embed"; url: string };

const imageExtRegex = /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i;
const audioExtRegex = /\.(mp3|wav|ogg|m4a|flac)(\?.*)?$/i;
const videoExtRegex = /\.(mp4|webm|mov|m3u8)(\?.*)?$/i;
const embedRegex = /(youtube\.com|youtu\.be|tiktok\.com|instagram\.com)/i;

export const parseMediaType = (content: string) => {
    const parts = content
        .trim()
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);
    const media: MediaItem[] = [];
    parts.forEach(item => {
        if (imageExtRegex.test(item)) {
            media.push({ kind: "image", url: item });
        }
        if (videoExtRegex.test(item)) {
            media.push({ kind: "video", url: item });
        }
        if (audioExtRegex.test(item)) {
            media.push({ kind: "audio", url: item });
        }
        if (embedRegex.test(item)) {
            media.push({ kind: "embed", url: item });
        }
    });
    return media;
};
