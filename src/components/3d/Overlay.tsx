'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface OverlayProps {
  activeZone: {
    title: string;
    description: string;
    link: string;
    color: string;
  } | null;
}

export function Overlay({ activeZone }: OverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {/* HUD / Instructions */}
      <div className="absolute bottom-10 left-10 text-white/50 bg-black/50 p-4 rounded-xl backdrop-blur-md">
        <h3 className="font-bold text-white mb-2">Controls</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span>W / Up</span> <span>Forward</span>
          <span>S / Down</span> <span>Backward</span>
          <span>A / Left</span> <span>Turn Left</span>
          <span>D / Right</span> <span>Turn Right</span>
          <span>Space</span> <span>Brake</span>
          <span>R</span> <span>Reset</span>
        </div>
      </div>

      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4" style={{ color: activeZone.color }}>
              {activeZone.title}
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {activeZone.description}
            </p>
            <Link href={activeZone.link}>
              <button 
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-105 active:scale-95"
                style={{ background: activeZone.color }}
              >
                Apply Now
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
