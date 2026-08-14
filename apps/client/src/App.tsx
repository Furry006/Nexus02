import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HeroSection } from './components/HeroSection';
import { AuthCard } from './components/AuthCard';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

export function App() {
  return (
    <>
      <Toaster position="top-right" theme="dark" richColors />
      <Routes>
        {/* Main Authenticated Discord-Inspired Dashboard Shell */}
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/channels/*" element={<DashboardLayout />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <div className="min-h-screen lg:h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#08080a] text-zinc-100 antialiased selection:bg-purple-500/20 selection:text-purple-300 overflow-y-auto lg:overflow-hidden">
              <section className="lg:col-span-7 h-full relative flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800/40 overflow-hidden">
                <HeroSection />
              </section>
              <section className="lg:col-span-5 h-full relative flex items-center justify-center p-6 sm:p-12 lg:p-14 bg-[#08080a] overflow-y-auto">
                <div className="absolute w-72 h-72 rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />
                <div className="w-full relative z-10 max-w-md my-auto">
                  <AuthCard />
                </div>
              </section>
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div className="min-h-screen lg:h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#08080a] text-zinc-100 antialiased selection:bg-purple-500/20 selection:text-purple-300 overflow-y-auto lg:overflow-hidden">
              <section className="lg:col-span-7 h-full relative flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800/40 overflow-hidden">
                <HeroSection />
              </section>
              <section className="lg:col-span-5 h-full relative flex items-center justify-center p-6 sm:p-12 lg:p-14 bg-[#08080a] overflow-y-auto">
                <div className="absolute w-72 h-72 rounded-full bg-purple-900/10 blur-[100px] pointer-events-none" />
                <div className="w-full relative z-10 max-w-md my-auto">
                  <AuthCard />
                </div>
              </section>
            </div>
          }
        />

        {/* Default route to /dashboard */}
        <Route path="/" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
