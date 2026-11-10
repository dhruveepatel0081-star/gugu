import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Maximize2, Printer, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import data from '../data/deck-data.json';

const qBadge = { Q1: '#0E7490', Q2: '#2563EB', Q3: '#E11D48', Q4: '#A3E635' };

const chips = [
  { id: 'all', name: 'All', color: '#0F172A' },
  ...data.companies.map((c) => ({ id: c.id, name: c.name, color: c.color })),
];

export default function Layout({
  currentSlide, goTo, next, prev, activeCompany, setActiveCompany,
  presenting, onPresent, onPrint, sidebarOpen, setSidebarOpen, children,
}) {
  const progress = ((currentSlide + 1) / data.slides.length) * 100;

  return (
    <div className="flex min-h-screen bg-[#F4F7FB] text-[#0F172A]">
      {/* energy-flow progress bar */}
      <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-[#E2E8F0]">
        <motion.div
          className="relative h-full"
          style={{ background: 'linear-gradient(90deg,#A3E635,#22D3EE)' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#22D3EE] shadow-[0_0_12px_3px_rgba(34,211,238,0.7)]" />
        </motion.div>
      </div>

      {/* Sidebar */}
      {!presenting && (
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside
            className={`fixed z-50 flex h-full w-[260px] flex-col border-r border-[#E2E8F0] bg-white transition-transform lg:static lg:translate-x-0 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A]">
                  <Zap className="h-5 w-5 text-[#A3E635]" />
                </span>
                <div>
                  <div className="font-heading text-sm font-bold leading-none">Voltline</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">EV Strategy Deck</div>
                </div>
              </div>
              <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5 text-[#64748B]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              {data.slides.map((s, i) => {
                const active = i === currentSlide;
                return (
                  <button
                    key={s.id}
                    onClick={() => { goTo(i); setSidebarOpen(false); }}
                    className={`mb-1 flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active ? 'bg-[#0F172A] text-white' : 'hover:bg-[#F4F7FB]'
                    }`}
                  >
                    <span className={`font-heading text-xs font-bold ${active ? 'text-[#A3E635]' : 'text-[#94A3B8]'}`}>
                      {String(s.id).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold leading-tight">{s.title}</span>
                      {s.q && (
                        <span
                          className="mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold"
                          style={{
                            background: active ? 'rgba(255,255,255,0.15)' : `${qBadge[s.q]}20`,
                            color: active ? '#fff' : qBadge[s.q],
                          }}
                        >
                          {s.q} · {s.points}pts
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-1 z-30 flex flex-wrap items-center gap-3 border-b border-[#E2E8F0] bg-white/80 px-4 py-3 backdrop-blur-md">
          {!presenting && (
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5 text-[#0F172A]" />
            </button>
          )}
          <div className="hidden sm:block">
            <div className="font-heading text-sm font-bold leading-none">EV e-Business Transformation</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">EBTAP · Session 9</div>
          </div>

          <div className="ml-auto flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F4F7FB] px-3 py-1.5">
            <button onClick={prev} disabled={currentSlide === 0} className="disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-heading text-sm font-bold tabular-nums">
              {String(currentSlide + 1).padStart(2, '0')} / {data.slides.length}
            </span>
            <button onClick={next} disabled={currentSlide === data.slides.length - 1} className="disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {!presenting && (
            <>
              <button onClick={onPrint} className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold transition hover:border-[#0E7490]">
                <Printer className="h-3.5 w-3.5" /> <span className="hidden md:inline">Print</span>
              </button>
              <button onClick={onPresent} className="flex items-center gap-1.5 rounded-full bg-[#0F172A] px-4 py-1.5 text-xs font-semibold text-white transition hover:shadow-[0_0_0_3px_rgba(163,230,53,0.4)]">
                <Maximize2 className="h-3.5 w-3.5" /> Present
              </button>
            </>
          )}
        </header>

        {/* Company chips */}
        {!presenting && (
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] bg-white px-4 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">Filter</span>
            {chips.map((c) => {
              const active = activeCompany === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCompany(c.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    active ? 'text-white' : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0E7490]'
                  }`}
                  style={active ? { background: c.color, borderColor: c.color, color: c.id === 'all' ? '#fff' : c.id === 'hmgics' ? '#fff' : '#fff' } : {}}
                >
                  {c.id !== 'all' && <span className="h-2 w-2 rounded-full" style={{ background: active ? '#fff' : c.color }} />}
                  {c.name}
                </button>
              );
            })}
          </div>
        )}

        <main className="flex flex-1 items-start justify-center p-4 md:p-8">
          {children}
        </main>

        {presenting && (
          <div className="fixed bottom-4 right-4 z-[60] rounded-full bg-[#0F172A]/80 px-4 py-2 font-heading text-sm font-bold text-white backdrop-blur">
            {String(currentSlide + 1).padStart(2, '0')} / {data.slides.length} · Esc to exit
          </div>
        )}
      </div>
    </div>
  );
}
