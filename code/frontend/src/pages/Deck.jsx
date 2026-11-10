import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ChevronRight, ChevronDown, Crown, Shield, AlertTriangle, ArrowRight, Users } from 'lucide-react';
import Layout from '../components/Layout.jsx';
import SlideShell from '../components/SlideShell.jsx';
import DetailDrawer from '../components/DetailDrawer.jsx';
import {
  StatCounter, ChevronChain, FiveForcesRadar, ValueCurve, ValueNetwork, MaturityHeatmap,
} from '../components/Charts.jsx';
import data from '../data/deck-data.json';

const SLIDE_KEY = 'evdeck_slide';
const MEMBERS_KEY = 'evdeck_members_v2';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ---------------- Individual slides ---------------- */

function SlideTitle() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl">
        <motion.img
          src={data.meta.heroImage}
          alt="EV charging"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full min-h-[240px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
        <div className="absolute bottom-0 p-6">
          {['Electric Vehicles', 'e-Business Transformation', 'of the EV Industry'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className="font-heading text-xl font-bold text-white md:text-2xl"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-[#64748B]">{data.meta.subtitle}</div>
        <div className="mt-1 text-sm font-semibold text-[#0E7490]">{data.meta.session}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.companies.map((c, i) => (
            <motion.span
              key={c.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: c.color, color: c.color, borderTopWidth: 3 }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.name}
            </motion.span>
          ))}
        </div>
        <div className="mt-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#94A3B8]">Agenda · 20 Points</div>
          {data.scorecard.map((q, i) => (
            <motion.div
              key={q.q}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-bold text-[#A3E635]">{q.q}</span>
              <span className="flex-1 text-sm font-semibold">{q.label}</span>
              <span className="rounded-full bg-[#F4F7FB] px-2.5 py-1 text-xs font-bold text-[#64748B]">{q.points} pts</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideSnapshot({ activeCompany }) {
  return (
    <div>
      <p className="mb-5 max-w-3xl text-sm text-[#64748B]">
        The EV vertical is the clearest proof of ICT-driven e-business transformation — from direct online sales
        to software-defined cars. We profile four distinct archetypes across the digital maturity spectrum.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((s, i) => (
          <StatCounter key={s.label} stat={s} delay={i * 0.1} />
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.companies.map((c, i) => {
          const dimmed = activeCompany !== 'all' && activeCompany !== c.id;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
              style={{ borderTop: `3px solid ${c.color}` }}
            >
              <img src={c.image} alt={c.name} className="h-28 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="font-heading text-sm font-bold">{c.name}</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-[#0F172A]">{c.role}</div>
                <div className="mt-1 text-xs text-[#64748B]">{c.tagline}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ExpandCard({ item, index, open, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
      style={{ borderTop: '3px solid #0E7490' }}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-bold text-[#A3E635]">{index + 1}</span>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.14em] text-[#94A3B8]">{item.macro}</div>
          <h3 className="font-heading text-sm font-bold text-[#0F172A]">{item.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm text-[#64748B]"><span className="font-semibold text-[#0F172A]">What: </span>{item.what}</p>
      <button
        onClick={() => onToggle(item.id)}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0E7490]"
      >
        Why it is significant <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 rounded-lg bg-[#F4F7FB] p-3 text-sm text-[#64748B]">{item.why}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideQ1Macro() {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen((o) => (o === id ? null : id));
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.q1Macro.map((item, i) => (
        <ExpandCard key={item.id} item={item} index={i} open={open === item.id} onToggle={toggle} />
      ))}
    </div>
  );
}

function SlideQ1Structure() {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen((o) => (o === id ? null : id));
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        {data.q1Structure.map((item, i) => (
          <ExpandCard key={item.id} item={item} index={i + 3} open={open === item.id} onToggle={toggle} />
        ))}
      </div>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">Porter's Five Forces · ICT shift</div>
        <FiveForcesRadar />
      </div>
    </div>
  );
}

function SlideValueChain({ activeCompany }) {
  return (
    <div>
      <p className="mb-4 max-w-3xl text-sm text-[#64748B]">
        The EV industry value chain, with company overlays showing who controls each digital stage. The more
        stages an OEM owns, the more e-business value it captures.
      </p>
      <ChevronChain activeCompany={activeCompany} />
      <div className="mt-5 flex flex-wrap gap-3">
        {data.companies.map((c) => (
          <span key={c.id} className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} /> {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function SlideValueMapping({ activeCompany }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.2fr]">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">Value Curve (0–10)</div>
        <ValueCurve activeCompany={activeCompany} />
      </div>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">Value Network · flows to the customer</div>
        <ValueNetwork />
      </div>
    </div>
  );
}

function SlideQ3() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.q3Changes.map((c, i) => (
        <motion.div
          key={c.n}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
          style={{ borderTop: '3px solid #A3E635' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-[#0F172A]/20">{c.n}</span>
            <h3 className="font-heading text-sm font-bold leading-tight text-[#0F172A]">{c.title}</h3>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#F4F7FB] p-2.5 text-xs">
            <span className="text-[#64748B]">{c.from}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#0E7490]" />
            <span className="font-semibold text-[#0F172A]">{c.to}</span>
          </div>
          <p className="mt-3 text-xs text-[#64748B]">{c.rationale}</p>
        </motion.div>
      ))}
    </div>
  );
}

function SlideMaturity({ activeCompany }) {
  return (
    <div>
      <p className="mb-4 max-w-3xl text-sm text-[#64748B]">
        e-Business readiness across five dimensions. Click or hover a cell for the rating rationale.
      </p>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <MaturityHeatmap activeCompany={activeCompany} />
      </div>
      <div className="mt-3 flex gap-4 text-xs text-[#64748B]">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#10B981]" /> High</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#F59E0B]" /> Medium</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#F43F5E]" /> Low</span>
      </div>
    </div>
  );
}

const verdictIcon = { Leaders: Crown, 'Strong Challenger': Shield, 'Risk of Disruption': AlertTriangle };
const verdictTone = { high: '#10B981', medium: '#F59E0B', low: '#F43F5E' };

function SlideVerdicts({ activeCompany }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.verdicts.map((v, i) => {
        const Icon = verdictIcon[v.type];
        return (
          <motion.div
            key={v.type}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
            style={{ borderTop: `3px solid ${verdictTone[v.tone]}` }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${verdictTone[v.tone]}18` }}>
                <Icon className="h-5 w-5" style={{ color: verdictTone[v.tone] }} />
              </span>
              <h3 className="font-heading text-sm font-bold">{v.type}</h3>
            </div>
            <div className="mt-4 space-y-3">
              {v.items.map((it) => {
                const company = data.companies.find((c) => c.id === it.id);
                const dimmed = activeCompany !== 'all' && activeCompany !== it.id;
                return (
                  <div key={it.id} className="rounded-xl bg-[#F4F7FB] p-3" style={{ opacity: dimmed ? 0.35 : 1 }}>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: company.color }} />
                      <span className="text-xs font-bold text-[#0F172A]">{company.name}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">{it.text}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function SlideConclusion({ members, setMember }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#94A3B8]">Scorecard · 20 Points</div>
        <div className="grid grid-cols-2 gap-3">
          {data.scorecard.map((q, i) => (
            <motion.div
              key={q.q}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-bold text-[#A3E635]">{q.q}</span>
                <span className="font-heading text-2xl font-bold text-[#0F172A]">{q.points}</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#0F172A]">{q.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#0F172A] to-[#0e7490] p-5 text-white">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#A3E635]">Key Takeaways</div>
          <ul className="mt-3 space-y-2">
            {data.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#A3E635]" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 font-heading text-xl font-bold">Questions?</div>
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
          <Users className="h-4 w-4" /> Team Assignment
        </div>
        <div className="space-y-3">
          {members.map((m, i) => {
            const company = data.companies.find((c) => c.id === m.company);
            return (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm" style={{ borderLeft: `4px solid ${company.color}` }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: company.color }}>
                  {company.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setMember(i, e.currentTarget.textContent.trim())}
                    className="rounded px-1 text-sm font-semibold text-[#0F172A] outline-none focus:bg-[#F4F7FB] focus:ring-1 focus:ring-[#A3E635]"
                  >
                    {m.member}
                  </div>
                  <div className="text-xs text-[#64748B]">{company.name} · {company.role}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-[#94A3B8]">Click a name to edit · saved automatically.</p>
      </div>
    </div>
  );
}

/* ---------------- Deck root ---------------- */

export default function Deck() {
  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = parseInt(localStorage.getItem(SLIDE_KEY), 10);
    return Number.isInteger(saved) && saved >= 0 && saved < 10 ? saved : 0;
  });
  const [direction, setDirection] = useState(1);
  const [activeCompany, setActiveCompany] = useState('all');
  const [presenting, setPresenting] = useState(false);
  const [drawerSlide, setDrawerSlide] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(MEMBERS_KEY));
      if (Array.isArray(saved) && saved.length === data.teamDefault.length) return saved;
    } catch (e) { /* ignore */ }
    return data.teamDefault;
  });
  const containerRef = useRef(null);

  useEffect(() => { localStorage.setItem(SLIDE_KEY, String(currentSlide)); }, [currentSlide]);

  const goTo = useCallback((idx) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(Math.max(0, Math.min(9, idx)));
  }, [currentSlide]);

  const next = useCallback(() => {
    setCurrentSlide((c) => { if (c < 9) { setDirection(1); return c + 1; } return c; });
  }, []);
  const prev = useCallback(() => {
    setCurrentSlide((c) => { if (c > 0) { setDirection(-1); return c - 1; } return c; });
  }, []);

  const setMember = useCallback((idx, value) => {
    setMembers((prevM) => {
      const copy = prevM.map((m, i) => (i === idx ? { ...m, member: value || 'Member name' } : m));
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(copy));
      return copy;
    });
  }, []);

  const onPresent = useCallback(async () => {
    const el = containerRef.current;
    try {
      if (el && el.requestFullscreen) {
        await el.requestFullscreen();
        setPresenting(true);
        toast.success('Presenter mode – press Esc to exit');
      } else {
        setPresenting(true);
        toast('Fullscreen unavailable — using CSS full view');
      }
    } catch (e) {
      setPresenting(true);
      toast('Presenter mode (CSS fallback)');
    }
  }, []);

  const onPrint = useCallback(() => {
    toast('Preparing print view…');
    setTimeout(() => window.print(), 150);
  }, []);

  useEffect(() => {
    const onFs = () => { if (!document.fullscreenElement) setPresenting(false); };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(e.target.tagName))) return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { prev(); }
      else if (e.key === 'Home') { goTo(0); }
      else if (e.key === 'End') { goTo(9); }
      else if (e.key === 'Escape') {
        if (drawerSlide) setDrawerSlide(null);
        else if (presenting && document.fullscreenElement) document.exitFullscreen();
        else if (presenting) setPresenting(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, drawerSlide, presenting]);

  const slide = data.slides[currentSlide];

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <SlideTitle />;
      case 1: return <SlideSnapshot activeCompany={activeCompany} />;
      case 2: return <SlideQ1Macro />;
      case 3: return <SlideQ1Structure />;
      case 4: return <SlideValueChain activeCompany={activeCompany} />;
      case 5: return <SlideValueMapping activeCompany={activeCompany} />;
      case 6: return <SlideQ3 />;
      case 7: return <SlideMaturity activeCompany={activeCompany} />;
      case 8: return <SlideVerdicts activeCompany={activeCompany} />;
      case 9: return <SlideConclusion members={members} setMember={setMember} />;
      default: return null;
    }
  };

  const showDetails = currentSlide >= 2 && currentSlide <= 8;

  return (
    <div ref={containerRef} className="bg-[#F4F7FB]">
      <Layout
        currentSlide={currentSlide}
        goTo={goTo}
        next={next}
        prev={prev}
        activeCompany={activeCompany}
        setActiveCompany={setActiveCompany}
        presenting={presenting}
        onPresent={onPresent}
        onPrint={onPrint}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="print-area w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: direction > 0 ? 0.35 : 0.22, ease: 'easeOut' }}
            >
              <SlideShell slide={slide} onDetails={setDrawerSlide} showDetails={showDetails}>
                {renderSlide()}
              </SlideShell>
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>
      <DetailDrawer slideId={drawerSlide} onClose={() => setDrawerSlide(null)} />
    </div>
  );
}
