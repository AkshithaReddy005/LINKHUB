import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Link as LinkType } from '../types';
import { SearchBar } from '../components/SearchBar';
import { HeroSection } from '../components/HeroSection';
import { FloatingElements } from '../components/FloatingElements';
import { ScrollAnimation } from '../components/ScrollAnimations';
import { useSupabaseLinks } from '../hooks/useSupabaseLinks';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  Code, 
  Bot, 
  FileText, 
  BookOpen, 
  MoreHorizontal,
  ArrowRight,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';

import { AuthPage } from '../components/AuthPage';

interface DashboardProps {
  user: any;
  setUser: React.Dispatch<any>;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const { links, loading, error } = useSupabaseLinks('all', user);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { 
      id: 'coding', 
      title: 'Coding Profiles', 
      description: 'GitHub, LeetCode, HackerRank, etc.',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-50',
      path: '/coding'
    },
    { 
      id: 'ai', 
      title: 'AI Tools', 
      description: 'ChatGPT, Claude, GitHub Copilot, etc.',
      icon: Bot,
      color: 'from-green-500 to-teal-600',
      bgColor: 'from-green-50 to-teal-50',
      path: '/ai-tools'
    },
    { 
      id: 'resume', 
      title: 'Resume & Documents', 
      description: 'CVs, portfolios, certificates',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      path: '/resume'
    },
    { 
      id: 'courses', 
      title: 'Courses & Notes', 
      description: 'Online courses, study materials',
      icon: BookOpen,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50',
      path: '/courses'
    },
    { 
      id: 'others', 
      title: 'Others', 
      description: 'Miscellaneous important links',
      icon: MoreHorizontal,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-50 to-gray-50',
      path: '/others'
    },
  ] as const;

  const filteredLinks = useMemo(() => {
    return links.filter(link => 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.username && link.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [links, searchTerm]);

  const recentLinks = links.slice(-6);
  const totalLinks = links.length;
  const categoriesWithLinks = categories.filter(cat => 
    links.some(link => link.category === cat.id)
  ).length;

  // Always show landing/hero section
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <FloatingElements />
      {/* Hero Section - always visible */}
      <HeroSection />

      {/* Gated dashboard features */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* User Link Count and Stats - only if logged in */}
        {user ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.email}!</h2>
            <p className="text-lg text-gray-600">You have saved <span className="font-semibold text-blue-600">{links.length}</span> links.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mb-8">
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >

            </motion.div>
          </div>
        )}

        {/* Search Section (always visible) */}
        <ScrollAnimation animation="fadeUp" className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Find Your Links Instantly
            </h2>
            <p className="text-xl text-gray-600">
              Search through all your organized resources with lightning speed
            </p>
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </ScrollAnimation>

        {/* Quick Stats (always visible, but can hide user-specific data if needed) */}
        <ScrollAnimation animation="fadeUp" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Dashboard Overview</h2>
            <p className="text-xl text-gray-600">Track your progress and stay organized</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ...stats cards code here... */}
          </div>
        </ScrollAnimation>

        {/* Categories Grid (always visible) */}
        <ScrollAnimation animation="fadeUp" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Organize by Category</h2>
            <p className="text-xl text-gray-600">Access your links organized by purpose and type</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const categoryLinks = links.filter(link => link.category === category.id);
              return (
                <ScrollAnimation key={category.id} animation="fadeUp" delay={index * 0.1}>
                  <Link to={category.path}>
                    <motion.div
                      className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 group cursor-pointer`}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full`} />
                      </motion.div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-6 shadow-lg`}>
                          <category.icon size={28} />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">{category.title}</div>
                        <div className="text-gray-600 text-sm mb-2">{category.description}</div>
                        <div className="text-3xl">{category.emoji}</div>
                        {user && (
                          <div className="mt-2 text-blue-600 font-semibold">
                            {categoryLinks.length} links
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </ScrollAnimation>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <FloatingElements />
      {/* Hero Section */}
      <HeroSection />

      <div className="container mx-auto px-4 py-20 relative z-10">

        {/* User Link Count and Stats - only if logged in */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.email}!</h2>
          <p className="text-lg text-gray-600">You have saved <span className="font-semibold text-blue-600">{links.length}</span> links.</p>
        </div>
        {/* Search Section */}
        <ScrollAnimation animation="fadeUp" className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Find Your Links Instantly
            </h2>
            <p className="text-xl text-gray-600">
              Search through all your organized resources with lightning speed
            </p>
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </ScrollAnimation>

        {/* Quick Stats */}
        <ScrollAnimation animation="fadeUp" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Dashboard Overview</h2>
            <p className="text-xl text-gray-600">Track your progress and stay organized</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: TrendingUp, 
                label: 'Total Links', 
                value: totalLinks, 
                color: 'from-blue-500 to-purple-500',
                bgColor: 'from-blue-50 to-purple-50',
                description: 'Links managed'
              },
              { 
                icon: Users, 
                label: 'Active Categories', 
                value: categoriesWithLinks, 
                color: 'from-green-500 to-teal-500',
                bgColor: 'from-green-50 to-teal-50',
                description: 'Categories in use'
              },

              { 
                icon: Star, 
                label: 'Productivity Score', 
                value: Math.min(Math.round((totalLinks / 20) * 100), 100), 
                color: 'from-yellow-500 to-orange-500',
                bgColor: 'from-yellow-50 to-orange-50',
                description: 'Organization level'
              },
            ].map((stat, index) => (
              <ScrollAnimation key={stat.label} animation="scale" delay={index * 0.1}>
                <motion.div
                  className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200`}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full`} />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6 shadow-lg`}>
                      <stat.icon size={28} />
                    </div>
                    <motion.div
                      className="text-4xl font-bold text-gray-800 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.label === 'Productivity Score' ? `${stat.value}%` : stat.value}
                    </motion.div>
                    <div className="text-gray-800 font-semibold text-lg mb-1">{stat.label}</div>
                    <div className="text-gray-600 text-sm">{stat.description}</div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Categories Grid */}
        <ScrollAnimation animation="fadeUp" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Organize by Category</h2>
            <p className="text-xl text-gray-600">Access your links organized by purpose and type</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const categoryLinks = links.filter(link => link.category === category.id);
              return (
                <ScrollAnimation key={category.id} animation="fadeUp" delay={index * 0.1}>
                  <Link to={category.path}>
                    <motion.div
                      className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 group cursor-pointer`}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full`} />
                      </motion.div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <category.icon size={32} />
                          </div>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ x: 5 }}
                          >
                            <ArrowRight size={24} className="text-gray-600" />
                          </motion.div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gray-800">
                            {categoryLinks.length}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">
                            {categoryLinks.length === 1 ? 'link' : 'links'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollAnimation>
              );
            })}
          </div>
        </ScrollAnimation>

        {/* Recent Links */}
        {recentLinks.length > 0 && (
          <ScrollAnimation animation="fadeUp" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <p className="text-xl text-gray-600">Your latest additions and updates</p>
            </div>
            
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${
                        categories.find(cat => cat.id === link.category)?.color || 'from-gray-400 to-gray-500'
                      } text-white`}>
                        {React.createElement(
                          categories.find(cat => cat.id === link.category)?.icon || MoreHorizontal,
                          { size: 16 }
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {categories.find(cat => cat.id === link.category)?.title}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-2 truncate text-lg">{link.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 truncate">{link.url}</p>
                    {link.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{link.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimation>
        )}

        {/* Features Section */}
        <ScrollAnimation animation="fadeUp" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Link Manager?</h2>
            <p className="text-xl text-gray-600">Built for professionals who value organization and efficiency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Find any link in seconds with our powerful search and organization system",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data stays on your device. No cloud storage, no privacy concerns",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Sparkles,
                title: "Beautiful Design",
                description: "A clean, modern interface that makes link management a pleasure",
                color: "from-blue-500 to-purple-500"
              }
            ].map((feature, index) => (
              <ScrollAnimation key={feature.title} animation="fadeUp" delay={index * 0.2}>
                <motion.div
                  className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Welcome Message for Empty State */}
        {totalLinks === 0 && (
          <ScrollAnimation animation="scale" className="text-center">
            <motion.div
              className="bg-white rounded-3xl p-16 shadow-2xl border border-gray-200 max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="text-8xl mb-8"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Link Manager!</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Start organizing your digital life by adding your first links. Choose from our categories above 
                to begin building your personalized dashboard.
              </p>
              <motion.div
                className="text-blue-600 font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
              >
                Choose a category above to get started →
              </motion.div>
            </motion.div>
          </ScrollAnimation>
        )}
      </div>
    </div>
  );
};