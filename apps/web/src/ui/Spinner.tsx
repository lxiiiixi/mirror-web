import { HTMLAttributes } from 'react'

export type SpinnerSize = 'small' | 'medium' | 'large'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 加载器尺寸
   */
  size?: SpinnerSize
}

/**
 * Spinner 组件
 * 基础加载动效
 */
export function Spinner({ size = 'medium', className = '', ...props }: SpinnerProps) {
  const sizeClasses: Record<SpinnerSize, string> = {
    small: 'h-4 w-4 border-2',
    medium: 'h-6 w-6 border-2',
    large: 'h-8 w-8 border-[3px]',
  }

  const classes = [
    'inline-block',
    'animate-spin',
    'rounded-full',
    'border-[--color-spinner-track]',
    'border-t-[--color-spinner]',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes} aria-hidden="true" {...props} />
}
