import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Code, 
  Bot, 
  FileText, 
  BookOpen, 
  MoreHorizontal, 
  Menu, 
  X,
  Sparkles,
  Square as LinkSquare
} from 'lucide-react';

import { supabase } from '../supabaseClient';

interface NavbarProps {
  user: any;
  setUser: React.Dispatch<any>;
}

import { AuthPage } from './AuthPage';

export const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/coding', label: 'Coding', icon: Code },
    { path: '/ai-tools', label: 'AI Tools', icon: Bot },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/others', label: 'Others', icon: MoreHorizontal },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl py-2' 
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-lg py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-2 border-white/70"
                whileHover={{ rotate: 5 }}
                animate={{
                  boxShadow: [
                    "0 4px 8px rgba(59, 130, 246, 0.2)", 
                    "0 8px 16px rgba(59, 130, 246, 0.3)", 
                    "0 4px 8px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <LinkSquare size={24} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Link Manager
                </h1>
                <p className="text-xs text-gray-600">
                  Professional Dashboard
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {!user && (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Login / Signup
                  </button>
                </>
              )}

              {user && (
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setUser(null);
                  }}
                  className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Logout
                </button>
              )}

              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow card border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        animate={isActive(item.path) ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon size={18} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-xl"
                          layoutId="activeTab"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 shadow transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <motion.div
          className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            scale: isOpen ? 1 : 0.95, 
            y: isOpen ? 0 : -20 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 space-y-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-semibold ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow card border border-blue-200'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={isActive(item.path) ? { rotate: [0, 5, -5, 0] } : {}}
                    >
                      <item.icon size={22} />
                    </motion.div>
                    <span className="font-medium text-lg">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={16} className="text-blue-500" />
                      </motion.div>
                    )}
                  </>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {/* End Mobile Menu */}

      {/* Global Auth Modal (always overlays full app) */}
      {showAuthModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/10 transition-opacity duration-300 z-40"
      onClick={() => setShowAuthModal(false)}
    />
    {/* Modal */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="relative z-50 flex flex-col items-center w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="absolute -top-5 -right-5 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none z-10 bg-white/90 rounded-full px-2 shadow"
        onClick={() => setShowAuthModal(false)}
        aria-label="Close Login Modal"
      >
        ×
      </button>
      <AuthPage onAuth={() => setShowAuthModal(false)} />
    </motion.div>
  </div>
)}
    </>
  );
};