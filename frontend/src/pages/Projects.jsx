import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api/projectService';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Info, Calendar, LayoutGrid } from 'lucide-react';
import { ProjectCard } from '../components/UI/Card';
import Button from '../components/UI/Button';

const fallbackProjects = [
  { id: 1, title: 'Muscat Corporate Center', category: 'Commercial', location: 'Muscat, Oman', description: 'A state-of-the-art office skyscraper featuring high-end architectural glass, modern workspace designs, and gold LEED energy certification.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600' },
  { id: 2, title: 'Al Mouj Luxury Villas', category: 'Residential', location: 'Muscat, Oman', description: 'Premium seaside villas showcasing modern architectural geometry, custom interior layouts, and energy-efficient climate control.', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600' },
  { id: 3, title: 'Modern Library Complex', category: 'Education', location: 'Amman, Jordan', description: 'A sprawling educational campus addition integrating reading zones, digital lounges, and sustainable concrete elements.', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600' },
  { id: 4, title: 'Prime Hub Headquarters', category: 'Office', location: 'Dubai, UAE', description: 'Contemporary multi-floor administrative headquarters boasting open floor plans, modular desks, and smart building interfaces.', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600' },
  { id: 5, title: 'Spectrum Academic Wing', category: 'Education', location: 'Nizwa, Oman', description: 'New facility for engineering and laboratory studies, constructed using locally sourced stone and custom ventilation architecture.', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600' },
  { id: 6, title: 'Marina View Apartments', category: 'Residential', location: 'Doha, Qatar', description: 'High-rise residential project incorporating a gym, infinity pool, smart apartments, and breathtaking structural layouts.', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600' }
];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
              PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-secondary dark:text-white mt-3">
              Our Projects
            </h1>
            <div className="w-16 h-1 bg-primary mt-4" />
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Commercial', 'Residential', 'Education', 'Office'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors border ${
                  activeFilter === tab 
                    ? 'bg-primary border-primary text-secondary' 
                    : 'bg-transparent border-gray-200 dark:border-gray-800 text-secondary dark:text-gray-400 hover:border-primary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Matrix */}
        {loading ? (
          <div className="text-center py-24">
            <span className="text-gray-400 animate-pulse text-sm">Loading project files...</span>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project._id || project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Dynamic Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xs"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-white dark:bg-dark-card w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col md:flex-row text-text-primary"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-20 p-2 bg-black/60 text-white rounded-full hover:bg-primary hover:text-secondary transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-auto min-h-[300px] bg-gray-150 relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-4 bottom-4 bg-primary text-secondary px-3 py-1 text-xs font-display font-extrabold uppercase tracking-wide">
                    {selectedProject.category}
                  </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-secondary dark:text-white leading-tight">
                        {selectedProject.title}
                      </h2>
                      <div className="flex items-center text-xs text-text-secondary mt-2">
                        <MapPin size={14} className="text-primary mr-1 shrink-0" />
                        <span>{selectedProject.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center">
                        <Info size={14} className="mr-1 text-primary" /> Project Overview
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                      <div>
                        <span className="block text-[10px] uppercase text-gray-400 font-bold">Category</span>
                        <span className="text-sm font-semibold">{selectedProject.category}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-gray-400 font-bold">Year Completed</span>
                        <span className="text-sm font-semibold">2026</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-wrap gap-3">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => navigate(`/projects/${selectedProject._id || selectedProject.id}`)}
                      className="w-full md:w-auto"
                    >
                      More Details
                    </Button>
                    <Button 
                      variant="darkOutline" 
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="w-full md:w-auto"
                    >
                      Close Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Projects;
