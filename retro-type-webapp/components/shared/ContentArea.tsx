import React from 'react';
import { useCurrentRoute } from '@/hooks/useNavigation';
import Home from '@/components/contents/Home';
import Playground from '@/components/playground/Playground';
import Rankings from '@/components/rankings/Rankings';
import Settings from '@/components/settings/Settings';
import About from '@/components/contents/About';
import Login from '@/components/login/Login';
import Dashboard from '@/components/dashboard/Dashboard';

export default function ContentArea() {
  const currentRoute = useCurrentRoute();

  return (
    <section className="content-area" id="main-content-section">
      {currentRoute === 'home' && <Home />}
      {currentRoute === 'playground' && <Playground />}
      {currentRoute === 'rankings' && <Rankings />}
      {currentRoute === 'settings' && <Settings />}
      {currentRoute === 'about' && <About />}
      {currentRoute === 'login' && <Login />}
      {currentRoute === 'dashboard' && <Dashboard />}
    </section>
  );
}
