import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Tailwind Ready
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Mirror UI Preview
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            A small Tailwind sample with gradients, cards, and buttons. If you
            can see this styling, Tailwind is working.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-emerald-100/50 backdrop-blur">
            <h2 className="text-xl font-semibold">Launch checklist</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Tailwind v4 Vite plugin active
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Utility classes compiled
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                Component polish in progress
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                onClick={() => setCount((value) => value + 1)}
              >
                Clicked {count} times
              </button>
              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                View details
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Live Status
            </p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-sm text-slate-500">Latency</p>
                <p className="text-2xl font-semibold text-slate-900">128ms</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-sm text-slate-500">Deploy</p>
                <p className="text-2xl font-semibold text-slate-900">Green</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
