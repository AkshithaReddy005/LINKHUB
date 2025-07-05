import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from '../types';
import { LinkCard } from '../components/LinkCard';
import { LinkModal } from '../components/LinkModal';
import { SearchBar } from '../components/SearchBar';
import { FloatingElements } from '../components/FloatingElements';
import { ScrollAnimation } from '../components/ScrollAnimations';
import { useSupabaseLinks } from '../hooks/useSupabaseLinks';

interface CategoryPageProps {
  category: 'coding' | 'ai' | 'resume' | 'courses' | 'others';
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  emoji: string;
  gradient: string;
  user?: any;
  setUser?: (user: any) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
  description,
  icon: Icon,
  emoji,
  gradient,
  user,
  setUser
}) => {
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Please login to access this section.</h2>
        </motion.div>
      </div>
    );
  }
  const navigate = useNavigate();
  const { links, loading, error, addLink, editLink, deleteLink } = useSupabaseLinks(category, user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryLinks = links.filter(link => 
    link.category === category &&
    (link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (link.username && link.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
     (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleAddLink = () => {
    setEditingLink(undefined);
    setIsModalOpen(true);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleDeleteLink = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await deleteLink(id);
      } catch (err) {
        alert('Error deleting link: ' + err);
      }
    }
  };

  const handleModalSubmit = async (data: any) => {
    try {
      if (editingLink) {
        await editLink(editingLink.id, data);
      } else {
        await addLink({ ...data, category });
      }
      setIsModalOpen(false);
      setEditingLink(undefined);
    } catch (err) {
      alert('Error saving link: ' + err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden pt-24">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <ScrollAnimation animation="fadeUp" className="mb-12">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-6">
              <motion.button
                onClick={() => navigate('/')}
                className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </motion.button>
              
              <motion.div
                className={`relative p-6 rounded-3xl bg-gradient-to-r ${gradient} text-white shadow-xl`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  boxShadow: [
                    "0 10px 20px rgba(59, 130, 246, 0.2)",
                    "0 15px 30px rgba(59, 130, 246, 0.3)",
                    "0 10px 20px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon size={40} />
                <motion.div
                  className="absolute -top-2 -right-2 text-3xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {emoji}
                </motion.div>
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3"
                  whileHover={{ x: 5 }}
                >
                  {title}
                </motion.h1>
                <p className="text-gray-600 text-lg mb-2">{description}</p>
                <motion.p 
                  className="text-blue-600 font-semibold"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {categoryLinks.length} {categoryLinks.length === 1 ? 'link' : 'links'} stored
                </motion.p>
              </div>
            </div>
            
            <motion.button
              onClick={handleAddLink}
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
                transition={{ duration: 0.3 }}
              >
                <Plus size={24} />
              </motion.div>
              <span>Add New Link</span>
            </motion.button>
          </motion.div>
        </ScrollAnimation>

        {/* Search Bar */}
        <ScrollAnimation animation="fadeUp" className="max-w-3xl mx-auto mb-12">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </ScrollAnimation>

        {/* Links Grid */}
        <ScrollAnimation animation="fadeUp">
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-500">Loading links...</div>
          ) : error ? (
            <div className="text-center py-20 text-lg text-red-500">Error loading links: {error}</div>
          ) : links.length === 0 ? (
            <motion.div
              className="bg-white rounded-3xl p-20 text-center border border-gray-200 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
              }}
            >
              <motion.div
                className="text-9xl mb-10"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {emoji}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Icon size={100} className="mx-auto text-gray-300 mb-10" />
                <h3 className="text-3xl font-bold text-gray-800 mb-6">No {title.toLowerCase()} yet</h3>
                <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-md mx-auto">
                  Start building your collection of {title.toLowerCase()} to stay organized and efficient
                </p>
                <motion.button
                  onClick={handleAddLink}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={20} />
                  <span>Add your first link</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {links.map((link, index) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={handleEditLink}
                  onDelete={handleDeleteLink}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </ScrollAnimation>
      </div>

      {/* Modal */}
      <LinkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLink(undefined);
        }}
        onSubmit={handleModalSubmit}
        editingLink={editingLink}
      />
    </div>
  );
};