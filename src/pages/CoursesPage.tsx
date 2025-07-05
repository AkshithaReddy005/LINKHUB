import React from 'react';
import { BookOpen } from 'lucide-react';
import { CategoryPage } from './CategoryPage';

export const CoursesPage = ({ user, setUser }) => (
  <CategoryPage
    category="courses"
    title="Courses & Notes"
    description="Online courses, study materials, tutorials, and learning resources"
    icon={BookOpen}
    emoji="📚"
    gradient="from-yellow-500 to-orange-600"
    user={user}
    setUser={setUser}
  />
);