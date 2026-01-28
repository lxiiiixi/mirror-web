import { HTMLAttributes } from "react";
import "./spinner.css";

export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * 加载器尺寸
     */
    size?: SpinnerSize;
}

/**
 * Spinner 组件
 * 基础加载动效
 */
export function Spinner({ size = "medium", className = "", ...props }: SpinnerProps) {
    const sizeClasses: Record<SpinnerSize, string> = {
        small: "spinner--sm",
        medium: "spinner--md",
        large: "spinner--lg",
    };

    const classes = ["spinner", sizeClasses[size], className].filter(Boolean).join(" ");

    return (
        <span className={classes} aria-hidden="true" {...props}>
            <span className="spinner__glow" />
        </span>
    );
}
