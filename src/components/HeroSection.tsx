import React from 'react';
import { motion } from 'framer-motion';
import { Square as LinkSquare, Sparkles, TrendingUp, Shield, ArrowRight, Play } from 'lucide-react';
import { ScrollAnimation, ParallaxElement } from './ScrollAnimations';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-12 md:mt-20">

      {/* Animated Background Elements */}
      <ParallaxElement speed={0.2} className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl" />
      </ParallaxElement>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-20 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollAnimation animation="fadeLeft" delay={0.2}>
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 font-medium shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={16} className="text-blue-600" />
                <span>Professional Link Management</span>
              </motion.div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeLeft" delay={0.4}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow">
                <span className="text-gray-900">
                  Organize Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Life
                </span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeLeft" delay={0.6}>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
                The ultimate dashboard for students and professionals to manage coding profiles, 
                AI tools, resumes, courses, and important resources in one beautiful place.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeLeft" delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                <motion.button
                  className="btn-primary group flex items-center justify-center space-x-3 px-8 py-4"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started</span>
                  <motion.div
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>

                <motion.button
                  className="btn-secondary flex items-center justify-center space-x-3 px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  <span>Watch Demo</span>
                </motion.button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeLeft" delay={1}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 sm:pt-8 text-sm sm:text-base font-medium">
                {[
                  { icon: Shield, text: "Secure", color: "text-green-600" },
                  { icon: TrendingUp, text: "Efficient", color: "text-blue-600" },
                  { icon: Sparkles, text: "Beautiful", color: "text-purple-600" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <div className={`p-2 rounded-lg bg-white shadow-sm ${feature.color}`}>
                      <feature.icon size={16} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Content - Animated Illustration */}
          <div className="relative">
            <ScrollAnimation animation="fadeRight" delay={0.5}>
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <motion.div
                  className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <LinkSquare size={20} />
                      </motion.div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                        animate={{ 
                          y: [0, -2, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          duration: 2 + i * 0.5, 
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Link Cards */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-gray-200 rounded w-32"></div>
                        </div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xl"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  ⚡
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🚀
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl shadow-lg"
                  animate={{ 
                    x: [0, 10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Bottom Stats */}
        <ScrollAnimation animation="fadeUp" delay={1.2} className="mt-20">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8 text-center">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Links Managed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="space-y-2 card"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};