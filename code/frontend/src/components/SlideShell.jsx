import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const qColors = { Q1: '#0E7490', Q2: '#2563EB', Q3: '#E11D48', Q4: '#A3E635' };

export default function SlideShell({ slide, onDetails, showDetails, children }) {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,.06)]">
        {/* watermark numeral */}
        <span
          className="pointer-events-none absolute right-4 top-0 select-none font-heading font-bold leading-none text-[#0F172A]"
          style={{ fontSize: '9rem', opacity: 0.06 }}
        >
          {String(slide.id).padStart(2, '0')}
        </span>

        <div className="relative p-6 md:p-10">
          {/* header */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {slide.q && (
              <span
                className="rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ background: qColors[slide.q], color: slide.q === 'Q4' ? '#0F172A' : '#fff' }}
              >
                {slide.q}
              </span>
            )}
            {slide.points && (
              <span className="rounded-full border border-[#E2E8F0] bg-[#F4F7FB] px-3 py-1 text-xs font-semibold text-[#64748B]">
                {slide.points} pts
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
              Slide {String(slide.id).padStart(2, '0')} / 10
            </span>
            {showDetails && (
              <button
                onClick={() => onDetails(slide.id)}
                className="ml-auto flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-xs font-semibold text-[#0F172A] transition hover:border-[#A3E635] hover:shadow-[0_0_0_3px_rgba(163,230,53,0.25)]"
              >
                <FileText className="h-3.5 w-3.5" /> Details
              </button>
            )}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading text-2xl font-bold leading-tight text-[#0F172A] md:text-3xl"
          >
            {slide.title}
          </motion.h2>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
