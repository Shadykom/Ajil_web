'use client';

import React from 'react';
import ModularSolutions from '../components/ModularSolutions';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Dedicated demo page for the Modular Solutions component
export default function ModularSolutionsDemo() {
  return (
    <main className="min-h-screen" style={{ background: '#F6F9FC' }}>
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/stripe-style" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Stripe Style</span>
            </Link>
            
            <div className="text-sm font-medium text-gray-500">
              Modular Solutions Demo
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-16" />
      
      {/* Main Component */}
      <ModularSolutions />
      
      {/* Footer with info */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">
            This component demonstrates Stripe-like interactive behavior with:
          </p>
          <ul className="text-gray-600 text-sm space-y-1 max-w-md mx-auto">
            <li>✓ Hover state with opacity transitions</li>
            <li>✓ Animated SVG connectors between related cards</li>
            <li>✓ Subtle idle floating animations</li>
            <li>✓ Scroll-triggered reveal animation</li>
            <li>✓ Keyboard accessibility with focus states</li>
            <li>✓ Smooth spring-based animations via Framer Motion</li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
