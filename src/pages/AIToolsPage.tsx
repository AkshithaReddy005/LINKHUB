import React from 'react';
import { Bot } from 'lucide-react';
import { CategoryPage } from './CategoryPage';

export const AIToolsPage = ({ user, setUser }) => (
  <CategoryPage
    category="ai"
    title="AI Tools"
    description="ChatGPT, Claude, GitHub Copilot, and other AI-powered tools"
    icon={Bot}
    emoji="🤖"
    gradient="from-green-500 to-teal-600"
    user={user}
    setUser={setUser}
  />
);