import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

interface StatsSectionProps {
  categories: Array<{
    id: string;
    title: string;
  }>;
  filteredLinks: Array<{ category: string }>;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ categories, filteredLinks }) => {
  return (
    <AnimatedSection className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((category, index) => {
          const categoryLinks = filteredLinks.filter(link => link.category === category.id);
          return (
            <motion.div
              key={category.id}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              {/* Animated background gradient */}
              
              
              <div className="relative z-10">
                <motion.div
                  className="text-3xl font-bold text-gray-800 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {categoryLinks.length}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">{category.title}</div>
              </div>
              

            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
};