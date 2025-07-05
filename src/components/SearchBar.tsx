import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative">
        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <Search size={22} />
        </motion.div>
        
        <motion.input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search your links..."
          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          whileFocus={{ 
            scale: 1.02,
            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
          }}
        />
        
        {/* Sparkle animation when focused */}
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={18} />
        </motion.div>
      </div>
      
      {/* Search suggestions hint */}
      {value && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p className="text-sm text-gray-600">
            Searching for: <span className="font-semibold text-blue-600">"{value}"</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};