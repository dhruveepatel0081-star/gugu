import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import data from '../data/deck-data.json';

const companyColor = (id) => {
  const c = data.companies.find((x) => x.id === id);
  if (c) return c.color;
  if (id === 'ice') return data.iceBaseline.color;
  return '#64748B';
};
const companyName = (id) => {
  const c = data.companies.find((x) => x.id === id);
  if (c) return c.name;
  if (id === 'ice') return data.iceBaseline.name;
  return id;
};

/* ---------------- StatCounter ---------------- */
export function StatCounter({ stat, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const start = React.useRef(false);

  const onView = () => {
    if (start.current) return;
    start.current = true;
    const duration = 1200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(stat.value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const formatted = useMemo(() => {
    if (stat.value >= 1000) return Math.round(display).toLocaleString();
    if (Number.isInteger(stat.value)) return Math.round(display).toString();
    return display.toFixed(2);
  }, [display, stat.value]);

  return (
    <motion.div
      onViewportEnter={onView}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-[0_8px_30px_rgba(15,23,42,.06)]"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-3xl md:text-4xl font-bold text-[#0F172A]">{formatted}</span>
        <span className="font-heading text-xl font-bold text-[#0E7490]">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-semibold text-[#0F172A]">{stat.label}</div>
      <div className="text-xs text-[#64748B]">{stat.note}</div>
    </motion.div>
  );
}

/* ---------------- ChevronChain ---------------- */
export function ChevronChain({ activeCompany }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.valueChain.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="relative flex-1 min-w-[140px]"
        >
          <div
            className="h-full rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-sm"
            style={{ borderTop: `3px solid ${i < 2 ? '#E11D48' : i < 4 ? '#0E7490' : i < 6 ? '#2563EB' : '#A3E635'}` }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-xs font-semibold leading-tight text-[#0F172A]">{s.step}</span>
            </div>
            <div className="mt-2 text-[11px] text-[#64748B]">{s.overlay}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- FiveForcesRadar ---------------- */
export function FiveForcesRadar() {
  const forces = data.fiveForces;
  const n = forces.length;
  const cx = 160, cy = 150, R = 110;
  const [hover, setHover] = useState(null);

  const point = (idx, val) => {
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const r = (val / 100) * R;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const polygon = (key) => forces.map((f, i) => point(i, f[key]).join(',')).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 320 320" className="w-full max-w-sm">
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <polygon
            key={t}
            points={forces.map((_, i) => point(i, t * 100).join(',')).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        ))}
        {forces.map((_, i) => {
          const [x, y] = point(i, 100);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E2E8F0" strokeWidth="1" />;
        })}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          points={polygon('ice')}
          fill="rgba(148,163,184,0.18)"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          points={polygon('ev')}
          fill="rgba(163,230,53,0.22)"
          stroke="#A3E635"
          strokeWidth="2.5"
        />
        {forces.map((f, i) => {
          const [x, y] = point(i, 118);
          return (
            <g key={f.force} onMouseEnter={() => setHover(f)} onMouseLeave={() => setHover(null)}>
              <circle cx={point(i, f.ev)[0]} cy={point(i, f.ev)[1]} r="4" fill="#A3E635" stroke="#0F172A" strokeWidth="1" className="cursor-pointer" />
              <text x={x} y={y} textAnchor="middle" className="fill-[#0F172A] text-[9px] font-semibold">{f.force}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-4 text-xs text-[#64748B]">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#94A3B8]" /> Legacy ICE</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-[#A3E635]" /> EV + ICT</span>
      </div>
      {hover && (
        <div className="mt-2 rounded-lg bg-[#0F172A] px-3 py-2 text-center text-xs text-white">
          <span className="font-semibold">{hover.force}:</span> {hover.note}
        </div>
      )}
    </div>
  );
}

/* ---------------- ValueCurve ---------------- */
export function ValueCurve({ activeCompany }) {
  const { dimensions, series } = data.valueCurve;
  const [hidden, setHidden] = useState({});
  const W = 560, H = 300, padL = 40, padR = 20, padT = 20, padB = 60;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const x = (i) => padL + (plotW * i) / (dimensions.length - 1);
  const y = (v) => padT + plotH - (plotH * v) / 10;

  const toggle = (id) => setHidden((h) => ({ ...h, [id]: !h[id] }));

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {[0, 2, 4, 6, 8, 10].map((v) => (
          <g key={v}>
            <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#E2E8F0" strokeWidth="1" />
            <text x={padL - 6} y={y(v) + 3} textAnchor="end" className="fill-[#94A3B8] text-[8px]">{v}</text>
          </g>
        ))}
        {dimensions.map((d, i) => (
          <text key={d} x={x(i)} y={H - padB + 16} textAnchor="middle" className="fill-[#64748B] text-[8px] font-medium" transform={`rotate(14 ${x(i)} ${H - padB + 16})`}>
            {d}
          </text>
        ))}
        {series.map((s) => {
          if (hidden[s.id]) return null;
          const dimmed = activeCompany !== 'all' && activeCompany !== s.id && s.id !== 'ice';
          const path = s.scores.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
          return (
            <g key={s.id} style={{ opacity: dimmed ? 0.2 : 1 }}>
              <motion.path
                d={path}
                fill="none"
                stroke={companyColor(s.id)}
                strokeWidth={s.id === 'ice' ? 2 : 2.5}
                strokeDasharray={s.id === 'ice' ? '5 4' : '0'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              {s.scores.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={companyColor(s.id)} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-2">
        {series.map((s) => (
          <button
            key={s.id}
            onClick={() => toggle(s.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
              hidden[s.id] ? 'opacity-40 border-[#E2E8F0]' : 'border-[#E2E8F0] bg-white'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: companyColor(s.id) }} />
            {companyName(s.id)}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ValueNetwork ---------------- */
export function ValueNetwork() {
  const nodes = data.networkNodes;
  const edges = data.networkEdges;
  const [active, setActive] = useState(null);
  const nodeById = (id) => nodes.find((n) => n.id === id);
  const isConnected = (id) =>
    active && (active === id || edges.some(([a, b]) => (a === active && b === id) || (b === active && a === id)));

  return (
    <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
      <div className="relative rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F4F7FB] p-2">
        <svg viewBox="0 0 100 100" className="w-full">
          {edges.map(([a, b], i) => {
            const na = nodeById(a), nb = nodeById(b);
            const hot = active && (a === active || b === active);
            return (
              <line
                key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={hot ? '#22D3EE' : '#A3E635'}
                strokeWidth={hot ? 0.8 : 0.4}
                strokeDasharray="1.5 1.2"
                opacity={active && !hot ? 0.15 : 0.8}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-5.4" dur="1.2s" repeatCount="indefinite" />
              </line>
            );
          })}
          {nodes.map((n) => {
            const dim = active && !isConnected(n.id);
            return (
              <g
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(active === n.id ? null : n.id)}
                className="cursor-pointer"
                style={{ opacity: dim ? 0.3 : 1 }}
              >
                <circle cx={n.x} cy={n.y} r={n.hub ? 7 : 4.5} fill={n.hub ? '#0F172A' : '#FFFFFF'} stroke={n.hub ? '#A3E635' : '#0E7490'} strokeWidth={n.hub ? 1 : 0.8} />
                <text x={n.x} y={n.y + (n.hub ? 0.8 : 0.5)} textAnchor="middle" className={`text-[2.3px] font-bold ${n.hub ? 'fill-white' : 'fill-[#0F172A]'}`}>
                  {n.hub ? 'EV' : ''}
                </text>
                <text x={n.x} y={n.y + (n.hub ? 10 : 7)} textAnchor="middle" className="fill-[#0F172A] text-[2.4px] font-semibold">{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#64748B]">Benefit Ranking</div>
        <div className="space-y-1.5">
          {[...nodes].filter((n) => !n.hub).sort((a, b) => a.rank - b.rank).map((n) => (
            <div
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              className={`flex items-start gap-2 rounded-lg border p-2 text-xs transition ${
                active === n.id ? 'border-[#22D3EE] bg-[#22D3EE]/5' : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[10px] font-bold text-white">{n.rank}</span>
              <div>
                <div className="font-semibold text-[#0F172A]">{n.label}</div>
                <div className="text-[#64748B]">{n.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- MaturityHeatmap ---------------- */
const toneColor = { High: '#10B981', Medium: '#F59E0B', Low: '#F43F5E' };
export function MaturityHeatmap({ activeCompany }) {
  const { dimensions, rows } = data.maturity;
  const [tip, setTip] = useState(null);

  return (
    <div className="relative overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid" style={{ gridTemplateColumns: `140px repeat(${dimensions.length}, 1fr) 90px` }}>
          <div />
          {dimensions.map((d) => (
            <div key={d} className="px-1 pb-2 text-center text-[11px] font-semibold text-[#64748B]">{d}</div>
          ))}
          <div className="px-1 pb-2 text-center text-[11px] font-bold text-[#0F172A]">Overall</div>
          {rows.map((row) => {
            const company = data.companies.find((c) => c.id === row.id);
            const dimmed = activeCompany !== 'all' && activeCompany !== row.id;
            return (
              <React.Fragment key={row.id}>
                <div className="flex items-center gap-2 py-1.5 pr-2" style={{ opacity: dimmed ? 0.35 : 1 }}>
                  <span className="h-3 w-3 rounded-full" style={{ background: company.color }} />
                  <span className="text-xs font-semibold text-[#0F172A]">{company.name}</span>
                </div>
                {row.ratings.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: dimmed ? 0.35 : 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 22 }}
                    whileHover={{ scale: 1.06 }}
                    onMouseEnter={() => setTip({ company: company.name, dim: dimensions[i], rating: r, reason: row.reasons[i] })}
                    onMouseLeave={() => setTip(null)}
                    className="m-0.5 flex cursor-pointer items-center justify-center rounded-lg py-2.5 text-xs font-bold text-white"
                    style={{ background: toneColor[r] }}
                  >
                    {r}
                  </motion.div>
                ))}
                <div className="m-0.5 flex items-center justify-center rounded-lg py-2.5 text-xs font-extrabold text-white" style={{ background: toneColor[row.overall], opacity: dimmed ? 0.35 : 1 }}>
                  {row.overall}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {tip && (
        <div className="mt-3 rounded-lg bg-[#0F172A] px-3 py-2 text-xs text-white">
          <span className="font-bold">{tip.company} — {tip.dim}: {tip.rating}.</span> {tip.reason}
        </div>
      )}
    </div>
  );
}

export { companyColor, companyName };
