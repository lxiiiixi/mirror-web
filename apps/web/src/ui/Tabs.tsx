import { HTMLAttributes } from 'react'

export type TabsVariant = 'underline' | 'pill'

export interface TabItem {
  value: string
  label: string
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 标签配置
   */
  items: TabItem[]

  /**
   * 当前选中值
   */
  value: string

  /**
   * 变体样式
   */
  variant?: TabsVariant

  /**
   * 切换回调
   */
  onChange?: (value: string) => void

  /**
   * 是否占满容器宽度
   */
  fullWidth?: boolean
}

/**
 * Tabs 组件
 * 适配移动端横向标签切换
 */
export function Tabs({
  items,
  value,
  variant = 'underline',
  onChange,
  fullWidth = false,
  className = '',
  ...props
}: TabsProps) {
  const wrapperClasses = [
    'flex',
    'items-center',
    'gap-4',
    'overflow-x-auto',
    'pb-2',
    fullWidth ? 'w-full' : 'w-fit',
    variant === 'underline' ? 'border-b border-white/10' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const baseTabClasses = [
    'flex',
    'items-center',
    'gap-2',
    'whitespace-nowrap',
    'text-sm',
    'font-semibold',
    'transition',
    'duration-200',
  ]

  const variantClasses: Record<TabsVariant, { base: string[]; active: string[]; inactive: string[] }> = {
    underline: {
      base: ['pb-2'],
      active: ['text-white', 'border-b-2', 'border-[--color-accent]'],
      inactive: ['text-[--color-text-muted]', 'border-b-2', 'border-transparent', 'hover:text-white'],
    },
    pill: {
      base: ['rounded-full', 'px-4', 'py-2'],
      active: ['bg-[--color-primary]', 'text-white', 'shadow-[0_10px_30px_rgba(235,20,132,0.35)]'],
      inactive: [
        'bg-white/5',
        'text-[--color-text-muted]',
        'hover:bg-white/10',
        'hover:text-white',
      ],
    },
  }

  return (
    <div className={wrapperClasses} {...props}>
      {items.map((item) => {
        const isActive = item.value === value
        const variantConfig = variantClasses[variant]
        const tabClasses = [
          ...baseTabClasses,
          ...variantConfig.base,
          ...(isActive ? variantConfig.active : variantConfig.inactive),
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={item.value}
            type="button"
            className={tabClasses}
            onClick={() => onChange?.(item.value)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
