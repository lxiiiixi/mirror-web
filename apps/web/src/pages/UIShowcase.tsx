import { useState } from 'react'
import { Button } from '../ui'

/**
 * UI 组件展示页面
 * 用于展示所有可用的纯 UI 组件
 */
function UIShowcase() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">UI 组件展示</h2>
        <p className="mt-2 text-sm text-slate-600">
          纯 UI 组件，不包含业务逻辑，专为复用性和一致性设计
        </p>
      </div>

      {/* Button 组件展示 */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Button 按钮组件</h3>
          <p className="mt-1 text-sm text-slate-600">
            多功能按钮组件，支持多种变体和尺寸，使用 Tailwind CSS 实现
          </p>
        </div>

        {/* 基础按钮 */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            按钮变体
          </h4>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white/50 p-6">
            <Button
              variant="primary"
              onClick={() => setClickCount((c) => c + 1)}
            >
              主题按钮
            </Button>
            <Button
              variant="secondary"
              onClick={() => setClickCount((c) => c + 1)}
            >
              次要按钮
            </Button>
            <Button variant="primary" disabled>
              禁用按钮
            </Button>
            <span className="ml-4 text-sm text-slate-600">
              点击次数: {clickCount}
            </span>
          </div>
        </div>

        {/* 不同尺寸 */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            按钮尺寸
          </h4>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white/50 p-6">
            <Button variant="primary" size="small">
              小按钮
            </Button>
            <Button variant="primary" size="medium">
              中等按钮
            </Button>
            <Button variant="primary" size="large">
              大按钮
            </Button>
          </div>
        </div>

        {/* 圆角按钮 */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            圆角按钮
          </h4>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white/50 p-6">
            <Button variant="primary" rounded>
              主题圆角
            </Button>
            <Button variant="secondary" rounded>
              次要圆角
            </Button>
            <Button variant="primary" rounded size="small">
              小圆角
            </Button>
            <Button variant="primary" rounded size="large">
              大圆角
            </Button>
          </div>
        </div>

        {/* 全宽按钮 */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            全宽按钮
          </h4>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/50 p-6">
            <Button variant="primary" fullWidth>
              主题全宽按钮
            </Button>
            <Button variant="secondary" fullWidth>
              次要全宽按钮
            </Button>
          </div>
        </div>

        {/* 代码示例 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            代码示例
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-6">
            <pre className="text-sm text-slate-200">
              <code>{`import { Button } from '@/ui'

// 主题按钮
<Button variant="primary">
  点击我
</Button>

// 次要按钮
<Button variant="secondary">
  次要按钮
</Button>

// 不同尺寸
<Button size="small">小按钮</Button>
<Button size="medium">中等按钮</Button>
<Button size="large">大按钮</Button>

// 圆角按钮
<Button rounded>圆角按钮</Button>

// 全宽按钮
<Button fullWidth>全宽按钮</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>

// 组合使用
<Button variant="secondary" size="large" rounded>
  大圆角次要按钮
</Button>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 主题配置展示 */}
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">主题配置</h3>
          <p className="mt-1 text-sm text-slate-600">
            使用 CSS 变量定义主题色，配合 Tailwind CSS 使用
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 主题色 */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/50 p-4">
            <div
              className="h-20 rounded-lg"
              style={{ background: '#EB1484' }}
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">主题色 Primary</p>
              <p className="font-mono text-xs text-slate-600">#EB1484</p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                --color-primary
              </p>
            </div>
          </div>

          {/* 次要色 */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/50 p-4">
            <div
              className="h-20 rounded-lg"
              style={{
                background: 'rgba(126, 126, 126, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                次要色 Secondary
              </p>
              <p className="font-mono text-xs text-slate-600">
                rgba(126, 126, 126, 0.3)
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                --color-secondary-bg
              </p>
            </div>
          </div>

          {/* 圆角 */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/50 p-4">
            <div className="flex h-20 items-center justify-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-slate-300" />
              <div className="h-12 w-12 rounded-xl bg-slate-300" />
              <div className="h-12 w-12 rounded-full bg-slate-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">圆角样式</p>
              <p className="font-mono text-xs text-slate-600">
                rounded-lg / xl / full
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                Tailwind 内置
              </p>
            </div>
          </div>
        </div>

        {/* 主题配置代码 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            主题配置代码
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-6">
            <pre className="text-sm text-slate-200">
              <code>{`/* src/index.css */
@import "tailwindcss";

:root {
  /* 自定义主题色配置 - Mirror UI */
  --color-primary: #EB1484;
  --color-primary-hover: #D01276;
  --color-primary-active: #B81068;
  
  --color-secondary-bg: rgba(126, 126, 126, 0.3);
  --color-secondary-hover: rgba(126, 126, 126, 0.4);
  --color-secondary-active: rgba(126, 126, 126, 0.5);
  
  --color-border-secondary: rgba(255, 255, 255, 0.3);
  --color-border-secondary-focus: rgba(255, 255, 255, 0.5);
}

/* 在 Tailwind 类名中使用 CSS 变量 */
// bg-[--color-primary]
// hover:bg-[--color-primary-hover]
// active:bg-[--color-primary-active]`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">组件特点</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-emerald-900">纯 UI 组件</h4>
                <p className="mt-1 text-sm text-emerald-700">
                  不包含任何业务逻辑，只负责展示和交互
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="font-semibold text-blue-900">Tailwind 驱动</h4>
                <p className="mt-1 text-sm text-blue-700">
                  使用 Tailwind CSS 实现，样式统一且易于维护
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔧</span>
              <div>
                <h4 className="font-semibold text-purple-900">高度可配置</h4>
                <p className="mt-1 text-sm text-purple-700">
                  支持多种 Props 配置，满足不同场景需求
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">♿️</span>
              <div>
                <h4 className="font-semibold text-orange-900">无障碍支持</h4>
                <p className="mt-1 text-sm text-orange-700">
                  遵循 HTML 语义化，支持键盘操作和屏幕阅读器
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UIShowcase
