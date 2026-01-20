import { ReactNode, useEffect } from 'react'

export interface ModalProps {
  /**
   * 是否显示弹窗
   */
  open: boolean

  /**
   * 标题
   */
  title?: string

  /**
   * 内容区域
   */
  children: ReactNode

  /**
   * 底部操作区
   */
  actions?: ReactNode

  /**
   * 关闭回调
   */
  onClose?: () => void

  /**
   * 点击遮罩是否关闭
   */
  closeOnBackdrop?: boolean
}

/**
 * Modal 组件
 * 玻璃拟态弹窗容器
 */
export function Modal({
  open,
  title,
  children,
  actions,
  onClose,
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (!open || !onClose) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-[--color-card-border] bg-[image:var(--gradient-card)] text-[--color-text] shadow-[0_30px_80px_rgba(3,6,32,0.6)] backdrop-blur-3xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
            {title ? (
              <h3 className="text-lg font-semibold">
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  {title}
                </span>
              </h3>
            ) : (
              <span />
            )}
            {onClose ? (
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xl text-white/80 transition hover:border-white/40 hover:text-white"
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            ) : null}
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
        {actions ? (
          <div className="border-t border-white/10 px-6 py-4">{actions}</div>
        ) : null}
      </div>
    </div>
  )
}
