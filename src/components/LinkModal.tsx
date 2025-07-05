import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sparkles } from 'lucide-react';
import { PLATFORM_ICONS, PlatformIconName } from './platformIcons';
import { Link, LinkFormData } from '../types';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LinkFormData) => void;
  editingLink?: Link;
}

export const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingLink,
}) => {
  const [formData, setFormData] = useState<LinkFormData & { icon?: PlatformIconName }>({
    title: '',
    url: '',
    username: '',
    category: 'coding',
    description: '',
    icon: 'website',
  });

  useEffect(() => {
    if (editingLink) {
      setFormData({
        title: editingLink.title,
        url: editingLink.url,
        username: editingLink.username || '',
        category: editingLink.category,
        description: editingLink.description || '',
        icon: editingLink.icon || 'website',
      });
    } else {
      setFormData({
        title: '',
        url: '',
        username: '',
        category: 'coding',
        description: '',
        icon: 'website',
      });
    }
  }, [editingLink, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-none sm:rounded-2xl max-w-full w-full sm:max-w-md p-4 sm:p-8 shadow-2xl border border-gray-200 relative overflow-hidden overflow-y-auto max-h-screen"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated background decoration */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Save size={20} />
                  </motion.div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editingLink ? 'Edit Link' : 'Add New Link'}
                  </h2>
                </motion.div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Title *
                  </label>
                  <motion.input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-800 text-sm"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    URL *
                  </label>
                  <motion.input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-800 text-sm"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Username (optional)
                  </label>
                  <motion.input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-800 text-sm"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category *
                  </label>
                  <motion.select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as LinkFormData['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-800 text-sm"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="coding">💻 Coding Profiles</option>
                    <option value="ai">🤖 AI Tools</option>
                    <option value="resume">📄 Resume & Documents</option>
                    <option value="courses">📚 Courses & Notes</option>
                    <option value="others">🔗 Others</option>
                  </motion.select>

                  {/* Icon Picker */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Icon</label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORM_ICONS.map(({ name, icon: Icon, label }) => (
                        <button
                          type="button"
                          key={name}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${formData.icon === name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                          onClick={() => setFormData({ ...formData, icon: name })}
                          aria-label={label}
                          title={label}
                        >
                          <Icon size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description (optional)
                  </label>
                  <motion.textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 bg-white text-gray-800 text-sm"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  className="flex space-x-4 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-sm"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -1,
                      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{editingLink ? 'Update' : 'Add'} Link</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};