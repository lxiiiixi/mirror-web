import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Status from './pages/Status'

function App() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full border px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'border-slate-900 bg-slate-900 text-white shadow shadow-slate-900/20'
        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900',
    ].join(' ')

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Mirror Workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Routing Preview
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              This navigation is powered by React Router, ready for multiple
              pages.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3">
            <NavLink className={navLinkClass} to="/">
              Overview
            </NavLink>
            <NavLink className={navLinkClass} to="/status">
              Status
            </NavLink>
          </nav>
        </header>

        <main className="flex-1">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Status />} path="/status" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
