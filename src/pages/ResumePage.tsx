import React from 'react';
import { FileText } from 'lucide-react';
import { CategoryPage } from './CategoryPage';

export const ResumePage = ({ user, setUser }) => (
  <CategoryPage
    category="resume"
    title="Resume & Documents"
    description="CVs, portfolios, certificates, and important documents"
    icon={FileText}
    emoji="📄"
    gradient="from-orange-500 to-red-600"
    user={user}
    setUser={setUser}
  />
);