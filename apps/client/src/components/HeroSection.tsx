import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareCode, Mic, ShieldCheck } from 'lucide-react';
import { HeroBg } from './HeroBg';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative h-full flex flex-col justify-between p-8 lg:p-14 overflow-hidden select-none">
      {/* Dynamic Dark Cosmic Mountain Background */}
      <HeroBg />

      {/* Top Branding / Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/30 border border-purple-400/20">
          <span className="font-bold text-white text-lg tracking-wider">N</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Nexus</span>
      </motion.div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 my-auto py-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Build together.<br />
            Ship <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">faster.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed font-normal">
            A modern collaboration platform for developers and engineering teams. Real-time communication, organized workspaces, and seamless collaboration.
          </p>
        </motion.div>

        {/* Feature Chips */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-3 mt-10"
        >
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/60 border border-white/[0.08] backdrop-blur-md text-xs font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80">
            <MessageSquareCode className="w-3.5 h-3.5 text-purple-400" />
            <span>Real-time Collaboration</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/60 border border-white/[0.08] backdrop-blur-md text-xs font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80">
            <Mic className="w-3.5 h-3.5 text-purple-400" />
            <span>Voice & Video</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/60 border border-white/[0.08] backdrop-blur-md text-xs font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Secure Workspaces</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="relative z-10 text-xs text-zinc-500"
      >
        © {new Date().getFullYear()} Nexus Inc. Built for high-velocity engineering teams.
      </motion.div>
    </div>
  );
};
