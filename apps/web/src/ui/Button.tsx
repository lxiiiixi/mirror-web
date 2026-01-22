import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体
   * - primary: 主题色按钮 (#EB1484)
   * - secondary: 半透明灰色按钮
   */
  variant?: ButtonVariant
  
  /**
   * 按钮尺寸
   */
  size?: ButtonSize
  
  /**
   * 是否为圆角按钮
   */
  rounded?: boolean
  
  /**
   * 是否全宽
   */
  fullWidth?: boolean
  
  /**
   * 按钮内容
   */
  children: React.ReactNode
}

/**
 * Button 组件
 * 纯 UI 组件，不包含业务逻辑
 * 使用 Tailwind CSS 实现样式
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      rounded = false,
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    // 基础样式类
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-semibold',
      'transition-all',
      'duration-200',
      'outline-none',
      'select-none',
      'active:scale-[0.98]',
    ]

    // 根据 variant 设置样式
    const variantClasses: Record<ButtonVariant, string[]> = {
      primary: [
        'bg-[--color-primary]',
        'text-white',
        'border-0',
        'hover:bg-[--color-primary-hover]',
        'active:bg-[--color-primary-active]',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'disabled:active:scale-100',
      ],
      secondary: [
        'bg-[--color-secondary-bg]',
        'text-white',
        'border',
        'border-[--color-border-secondary]',
        'backdrop-blur-sm',
        'hover:bg-[--color-secondary-hover]',
        'hover:border-[--color-border-secondary-focus]',
        'active:bg-[--color-secondary-active]',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'disabled:active:scale-100',
      ],
    }

    // 根据 size 设置尺寸
    const sizeClasses: Record<ButtonSize, string[]> = {
      small: ['px-3', 'py-1', 'text-sm', 'leading-5'],
      medium: ['px-4', 'py-2', 'text-base', 'leading-6'],
      large: ['px-6', 'py-3', 'text-lg', 'leading-7'],
    }

    // 圆角样式
    const roundedClasses = rounded ? ['rounded-full'] : ['rounded-lg']

    // 全宽样式
    const widthClasses = fullWidth ? ['w-full'] : []

    // 组合所有类名
    const classes = [
      ...baseClasses,
      ...variantClasses[variant],
      ...sizeClasses[size],
      ...roundedClasses,
      ...widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        type="button"
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
