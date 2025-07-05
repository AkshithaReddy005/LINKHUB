import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Code, Bot, FileText, BookOpen, MoreHorizontal, Sparkles } from 'lucide-react';
import { Link } from '../types';
import { LinkCard } from './LinkCard';
import { AnimatedSection } from './AnimatedSection';

import { Lock } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  category: 'coding' | 'ai' | 'resume' | 'courses' | 'others';
  links: Link[];
  onAddLink: (category: 'coding' | 'ai' | 'resume' | 'courses' | 'others') => void;
  onEditLink: (link: Link) => void;
  onDeleteLink: (id: string) => void;
  user?: any;
  onRequireLogin?: () => void;
}

const categoryIcons = {
  coding: Code,
  ai: Bot,
  resume: FileText,
  courses: BookOpen,
  others: MoreHorizontal,
};

const categoryColors = {
  coding: 'from-blue-500 to-purple-600',
  ai: 'from-green-500 to-teal-600',
  resume: 'from-orange-500 to-red-600',
  courses: 'from-yellow-500 to-orange-600',
  others: 'from-gray-500 to-gray-600',
};

const categoryEmojis = {
  coding: '💻',
  ai: '🤖',
  resume: '📄',
  courses: '📚',
  others: '🔗',
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  category,
  links,
  onAddLink,
  onEditLink,
  onDeleteLink,
  user,
  onRequireLogin,
}) => {
  const Icon = categoryIcons[category];
  const colorClass = categoryColors[category];
  const emoji = categoryEmojis[category];

  return (
    <AnimatedSection className="mb-12">
      <motion.div
        className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
        whileHover={{ 
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          y: -2
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} text-white shadow mb-3 mx-auto`}>
            <Icon size={28} />
          </div>
          <div>
            <motion.h2 
              className="text-base font-semibold text-gray-800 mb-0.5"
              whileHover={{ x: 3 }}
            >
              {title}
            </motion.h2>
          </div>
        </div>
        {user && (
          <motion.button
            onClick={() => onAddLink(category)}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold text-lg"
            whileHover={{ 
              scale: 1.05,
              y: -3,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Plus size={24} />
            </motion.div>
            <span>Add Link</span>
          </motion.button>
        )}
      </motion.div>
      {user && (
        links.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
            }}
          >
            <div className="text-2xl mb-2">{emoji}</div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles size={32} className="text-blue-400 mb-4" />
              <p className="text-lg text-gray-500 font-semibold">No links yet in this category.</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {links.map((link, index) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={onEditLink}
                onDelete={onDeleteLink}
                index={index}
              />
            ))}
          </motion.div>
        )
      )}
    </AnimatedSection>
  );
};