import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Edit2, Trash2, User, Check, Star, Globe } from 'lucide-react';
import { PLATFORM_ICONS } from './platformIcons';
import { Link } from '../types';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete, index = 0 }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);

  const copyToClipboard = async (text: string, type: 'url' | 'username') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } else {
        setCopiedUsername(true);
        setTimeout(() => setCopiedUsername(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
      }}
      layout
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        initial={false}
      />
      
      {/* Decorative corner element */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
      
      {/* Star decoration */}
      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
        initial={{ rotate: 0, scale: 0 }}
        whileHover={{ rotate: 180, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Star size={18} className="text-yellow-400 fill-current" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {/* Domain Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <Globe size={14} />
              <span>{getDomainFromUrl(link.url)}</span>
            </motion.div>
            
            <motion.h3 
              className="text-base font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300 flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              {(() => {
                const iconObj = PLATFORM_ICONS.find(i => i.name === link.icon);
                const Icon = iconObj ? iconObj.icon : Globe;
                return <Icon size={16} className="inline-block mr-1 align-middle" />;
              })()}
              {link.title}
            </motion.h3>
            {link.description && (
              <motion.p 
                className="text-gray-600 text-sm mb-4 leading-relaxed"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {link.description}
              </motion.p>
            )}
          </div>
          
          <motion.div 
            className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            <motion.button
              onClick={() => onEdit(link)}
              className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(link.id)}
              className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={18} />
            </motion.button>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 font-medium transition-colors flex-1 group/link p-3 bg-blue-50 rounded-xl hover:bg-blue-100"
            >
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink size={18} />
              </motion.div>
              <span className="truncate group-hover/link:text-blue-800 font-semibold">Visit Link</span>
            </a>
            <motion.button
              onClick={() => copyToClipboard(link.url, 'url')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                copiedUrl
                  ? 'bg-green-100 text-green-600 scale-110'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={copiedUrl ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {copiedUrl ? <Check size={18} /> : <Copy size={18} />}
              </motion.div>
            </motion.button>
          </motion.div>

          {link.username && (
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3 text-gray-700 flex-1 p-3 bg-gray-50 rounded-xl">
                <User size={18} />
                <span className="truncate font-semibold">{link.username}</span>
              </div>
              <motion.button
                onClick={() => copyToClipboard(link.username!, 'username')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  copiedUsername
                    ? 'bg-green-100 text-green-600 scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={copiedUsername ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {copiedUsername ? <Check size={18} /> : <Copy size={18} />}
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
          filter: 'blur(1px)'
        }}
        initial={false}
      />
    </motion.div>
  );
};