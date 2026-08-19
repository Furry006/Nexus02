import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HeroSection } from './components/HeroSection';
import { AuthCard } from './components/AuthCard';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { useAuthStore } from './store/useAuthStore';
import { userApi } from './lib/api';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuthStore();

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#09090b] text-zinc-100">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuthStore();

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#09090b] text-zinc-100">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/workspaces" replace />;
  }

  return <>{children}</>;
}

const AuthPageLayout: React.FC = () => (
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
);

export function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      setAuthLoading(true);
      try {
        const user = await userApi.getMe();
        if (isMounted) {
          if (user) {
            setUser(user);
          } else {
            clearUser();
          }
        }
      } catch {
        if (isMounted) {
          clearUser();
        }
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser, setAuthLoading]);

  return (
    <>
      <Toaster position="top-right" theme="dark" richColors />
      <Routes>
        {/* Protected Dashboard & Workspace Routes */}
        <Route
          path="/workspaces"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspaces/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Guest Auth Routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <AuthPageLayout />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <AuthPageLayout />
            </GuestRoute>
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/workspaces" replace />} />
      </Routes>
    </>
  );
}

export default App;
