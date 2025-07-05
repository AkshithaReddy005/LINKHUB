import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { CategoryPage } from './CategoryPage';

export const OthersPage = ({ user, setUser }) => (
  <CategoryPage
    category="others"
    title="Other Links"
    description="Miscellaneous important links and resources"
    icon={MoreHorizontal}
    emoji="🔗"
    gradient="from-gray-500 to-gray-600"
    user={user}
    setUser={setUser}
  />
);