import React from 'react';
import { Code } from 'lucide-react';
import { CategoryPage } from './CategoryPage';

export const CodingPage = ({ user, setUser }) => (
  <CategoryPage
    category="coding"
    title="Coding Profiles"
    description="GitHub, LeetCode, HackerRank, CodeChef, and other coding platforms"
    icon={Code}
    emoji="💻"
    gradient="from-blue-500 to-purple-600"
    user={user}
    setUser={setUser}
  />
);