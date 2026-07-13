import React from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceCard = ({ icon: Icon, title, description, index }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-dark-card p-8 border border-gray-100 dark:border-gray-800 relative hover:shadow-premium group transition-all duration-350"
    >
      {/* Decorative background number */}
      <span className="absolute right-6 top-6 text-7xl font-display font-black text-gray-50 dark:text-gray-900 select-none pointer-events-none group-hover:text-primary/10 transition-colors">
        0{index + 1}
      </span>

      <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors duration-300">
        <Icon size={24} className="transition-transform group-hover:scale-110" />
      </div>

      <h3 className="text-xl font-display font-bold text-secondary dark:text-white mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {description}
      </p>

      <Link 
        to="/services" 
        className="inline-flex items-center text-xs font-display font-bold uppercase tracking-wider text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        Read More <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Hover bottom border line */}
      <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
    </m.div>
  );
};

export const ProjectCard = ({ project, index, onClick }) => {
  return (
    <m.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

      {/* Left indicator line */}
      <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
        <span className="text-[10px] font-display font-bold uppercase tracking-widest text-primary mb-2">
          {project.category}
        </span>
        
        <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">
          {project.title}
        </h3>

        <div className="flex items-center text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MapPin size={12} className="text-primary mr-1 shrink-0" />
          <span>{project.location}</span>
        </div>
      </div>
    </m.div>
  );
};

export const BlogCard = ({ blog, index }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 hover:shadow-premium group overflow-hidden transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Date badge */}
        <div className="absolute left-4 bottom-4 bg-primary text-secondary px-3 py-1 text-xs font-display font-bold uppercase tracking-wider">
          {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <span className="text-xs text-gray-400 font-medium">By {blog.author}</span>
        
        <h3 className="text-lg font-display font-bold text-secondary dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
          <Link to="/blog">{blog.title}</Link>
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {blog.content}
        </p>

        <div className="pt-2">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-xs font-display font-bold uppercase tracking-wider text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            Read Full Article <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </m.div>
  );
};
