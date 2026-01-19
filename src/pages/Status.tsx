function Status() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-emerald-100/40 backdrop-blur">
        <h2 className="text-xl font-semibold">System Status</h2>
        <p className="mt-2 text-sm text-slate-600">
          Live signals from your services and pipelines.
        </p>
        <div className="mt-6 space-y-3 text-sm text-slate-700">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <span>API Gateway</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <span>Worker Queue</span>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
              Degraded
            </span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <span>Realtime Sync</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              Healthy
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8">
        <h2 className="text-xl font-semibold text-slate-900">Activity</h2>
        <p className="mt-2 text-sm text-slate-600">
          Recent deploys and incidents that matter to you.
        </p>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="font-semibold text-slate-900">Deploy 1.8.2</p>
            <p className="mt-1 text-slate-500">13 minutes ago · 2 regions</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="font-semibold text-slate-900">Queue spike</p>
            <p className="mt-1 text-slate-500">1 hour ago · autoscaled</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="font-semibold text-slate-900">Security sweep</p>
            <p className="mt-1 text-slate-500">Yesterday · no findings</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Status
