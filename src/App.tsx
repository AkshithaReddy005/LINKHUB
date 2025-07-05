import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { CodingPage } from './pages/CodingPage';
import { AIToolsPage } from './pages/AIToolsPage';
import { ResumePage } from './pages/ResumePage';
import { CoursesPage } from './pages/CoursesPage';
import { OthersPage } from './pages/OthersPage';

import { supabase } from './supabaseClient';
import { AuthPage } from './components/AuthPage';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/coding" element={<CodingPage user={user} setUser={setUser} />} />
          <Route path="/ai-tools" element={<AIToolsPage user={user} setUser={setUser} />} />
          <Route path="/resume" element={<ResumePage user={user} setUser={setUser} />} />
          <Route path="/courses" element={<CoursesPage user={user} setUser={setUser} />} />
          <Route path="/others" element={<OthersPage user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;