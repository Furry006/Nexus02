import React from 'react';
import { Toaster } from 'sonner';
import { HeroSection } from './components/HeroSection';
import { AuthCard } from './components/AuthCard';

export function App() {
  return (
    <>
      <Toaster position="top-right" theme="dark" richColors />
      <main className="min-h-screen lg:h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#08080a] text-zinc-100 antialiased selection:bg-purple-500/20 selection:text-purple-300 overflow-y-auto lg:overflow-hidden">
        {/* Left Section - ~55% split on desktop (7 of 12 cols) */}
        <section className="lg:col-span-7 h-full relative flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800/40 overflow-hidden">
          <HeroSection />
        </section>

        {/* Right Section - ~45% split on desktop (5 of 12 cols) */}
        <section className="lg:col-span-5 h-full relative flex items-center justify-center p-6 sm:p-12 lg:p-14 bg-[#08080a] overflow-y-auto">
          {/* Soft background ambient gradient behind auth card */}
          <div className="absolute w-72 h-72 rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />

          <div className="w-full relative z-10 max-w-md my-auto">
            <AuthCard />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

