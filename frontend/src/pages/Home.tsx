import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-150">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              Unified Wealth Intelligence Platform
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Real-time decision intelligence for modern wealth management.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-gray-300">
              Seamlessly connect portfolios, compliance oversight, client relationship tools, and security operations in a single intelligent web experience.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold px-6 py-3 text-sm transition hover:opacity-90 shadow-lg shadow-emerald-500/10"
              >
                Access Dashboard
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-gray-850 px-6 py-3 text-sm font-semibold text-gray-100 transition hover:border-emerald-500 hover:text-emerald-350"
              >
                Register Instance
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-500/10 bg-gray-900/70 p-8 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Strategic Allocation', value: 'Multi-asset' },
                { title: 'Regulatory View', value: 'Compliance-first' },
                { title: 'Client Intelligence', value: 'Behavioral insights' },
                { title: 'Secure Access', value: 'Enterprise-grade' },
              ].map((stat) => (
                <div key={stat.title} className="rounded-3xl bg-gray-950/90 p-5 ring-1 ring-gray-850">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-gray-400 font-mono">{stat.title}</h3>
                  <p className="mt-3 text-lg font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Equity Analytics', description: 'Equity portfolio dashboards with live pricing and order insights.' },
            { title: 'Private Assets', description: 'Integrated real estate, private credit, and alternative holdings.' },
            { title: 'Operations & Security', description: 'Compliance, audit, and security controls across every deployment.' },
          ].map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-gray-850 bg-gray-900/95 p-6 shadow-xl">
              <h3 className="text-base font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-xs leading-5 text-gray-400 font-mono">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
