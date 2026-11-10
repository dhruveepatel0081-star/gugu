import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, BookOpen } from 'lucide-react';
import data from '../data/deck-data.json';

export default function DetailDrawer({ slideId, onClose }) {
  const slide = data.slides.find((s) => s.id === slideId);
  const note = data.speakerNotes[String(slideId)];

  return (
    <AnimatePresence>
      {slideId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#0F172A]/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] p-5">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">Speaker Notes</div>
                <h3 className="font-heading text-lg font-bold text-[#0F172A]">{slide?.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] transition hover:bg-[#F4F7FB]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <section>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                  <Mic className="h-4 w-4 text-[#0E7490]" /> Presenter Script
                </div>
                <p className="text-sm leading-relaxed text-[#64748B]">{note}</p>
              </section>
              <section>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                  <BookOpen className="h-4 w-4 text-[#0E7490]" /> Sources & Caveats
                </div>
                <p className="text-sm leading-relaxed text-[#64748B]">
                  Statistics are team-synthesized estimates based on approximate public figures (2024). Verify
                  against current OEM reports and industry sources (IEA EV Outlook, company annual reports)
                  before the live session.
                </p>
              </section>
            </div>
            <div className="border-t border-[#E2E8F0] p-4">
              <button
                onClick={onClose}
                className="w-full rounded-full bg-[#0F172A] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
              >
                Close
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
