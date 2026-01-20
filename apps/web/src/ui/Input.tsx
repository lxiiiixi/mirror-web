import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'

export type InputSize = 'small' | 'medium' | 'large'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 输入框标签
   */
  label?: string

  /**
   * 辅助文案（错误优先展示）
   */
  helperText?: string

  /**
   * 错误提示
   */
  error?: string

  /**
   * 输入框尺寸
   */
  size?: InputSize

  /**
   * 是否全宽
   */
  fullWidth?: boolean

  /**
   * 左侧装饰内容
   */
  leftAdornment?: ReactNode

  /**
   * 右侧装饰内容
   */
  rightAdornment?: ReactNode
}

/**
 * Input 组件
 * 适配移动端与桌面端的基础输入控件
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'medium',
      fullWidth = false,
      leftAdornment,
      rightAdornment,
      id,
      className = '',
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? useId()
    const feedbackText = error ?? helperText

    const wrapperClasses = [
      'flex',
      'flex-col',
      'gap-2',
      fullWidth ? 'w-full' : 'w-full max-w-sm',
    ]

    const containerBaseClasses = [
      'flex',
      'items-center',
      'gap-3',
      'rounded-full',
      'border',
      'border-transparent',
      'bg-[--color-input-bg]',
      'px-5',
      'text-[--color-input-text]',
      'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]',
      'transition',
      'duration-200',
      'focus-within:border-[--color-primary]',
      'focus-within:ring-2',
      'focus-within:ring-[--color-primary]',
      disabled ? 'opacity-50' : 'opacity-100',
    ]

    const sizeClasses: Record<InputSize, string[]> = {
      small: ['h-10', 'text-sm'],
      medium: ['h-12', 'text-base'],
      large: ['h-14', 'text-lg'],
    }

    const errorClasses = error
      ? ['border-[--color-danger]', 'focus-within:ring-[--color-danger]']
      : []

    const containerClasses = [
      ...containerBaseClasses,
      ...sizeClasses[size],
      ...errorClasses,
    ]
      .filter(Boolean)
      .join(' ')

    const inputClasses = [
      'w-full',
      'bg-transparent',
      'outline-none',
      'placeholder:text-[--color-input-placeholder]',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <label className={wrapperClasses.join(' ')}>
        {label ? (
          <span className="text-sm font-semibold text-[--color-text]">
            {label}
          </span>
        ) : null}
        <span className={containerClasses}>
          {leftAdornment ? (
            <span className="text-[--color-text-muted]">{leftAdornment}</span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          {rightAdornment ? (
            <span className="text-[--color-text-muted]">{rightAdornment}</span>
          ) : null}
        </span>
        {feedbackText ? (
          <span
            className={[
              'text-xs',
              error ? 'text-[--color-danger]' : 'text-[--color-text-muted]',
            ].join(' ')}
          >
            {feedbackText}
          </span>
        ) : null}
      </label>
    )
  },
)

Input.displayName = 'Input'
