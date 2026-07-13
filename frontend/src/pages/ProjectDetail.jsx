import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, getProjects } from '../api/projectService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  User, 
  Calendar, 
  DollarSign, 
  Tag, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import Button from '../components/UI/Button';

// Fallback project details in case backend is loading or database is not fully populated
const fallbackProjects = [
  {
    _id: '1',
    title: 'Muscat Corporate Center',
    category: 'Commercial',
    location: 'Muscat, Oman',
    description: 'A state-of-the-art office skyscraper featuring high-end architectural glass, modern workspace designs, and gold LEED energy certification.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    fullDescription: 'A landmark 45-story commercial skyscraper standing in the heart of Muscat\'s financial district. The project represents a masterclass in modern structural engineering, featuring state-of-the-art curtain wall glazing, column-free floor plans, and carbon-neutral building techniques.',
    objectives: 'To design a sustainable, iconic high-rise office complex that satisfies Muscat\'s growing corporate hub requirements while achieving gold LEED energy certification ratings.',
    challenges: 'Constructing high-load bearing foundations on sandy, coastal soils close to sea level, and managing high-temperature environment heat loads on large glass facades.',
    solutions: 'We utilized advanced friction pile concrete foundations driven 45 meters deep, and installed triple-pane low-E thermal glass panels with reflective coatings to block infrared rays, reducing air conditioning load by 35%.',
    client: 'Oman Investment Authority',
    startDate: '2024-02-15T00:00:00.000Z',
    completionDate: '2026-06-20T00:00:00.000Z',
    budget: '$85,000,000',
    technologies: ['LEED Energy Modeling', 'Friction Piling Foundation', 'Low-E Glazing Systems', 'BIM 3D Mapping'],
    features: ['Column-Free Interior Office Floorplans', 'Kinetic Solar Panel Facade Grid', 'Smart Climate Airflow Controllers', 'Water Reclamation Filtering Yards'],
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600'
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Fetch specific project details
  useEffect(() => {
    const getProjectData = async () => {
      setLoading(true);
      try {
        const data = await getProjectById(id);
        setProject(data);
        
        // Fetch related projects
        try {
          const allProjects = await getProjects();
          // Filter by same category and exclude current project
          const filtered = allProjects
            .filter(p => p.category === data.category && p._id !== data._id)
            .slice(0, 3);
          setRelatedProjects(filtered);
        } catch (listErr) {
          console.error('Error fetching related projects:', listErr);
        }
      } catch (err) {
        console.error('Error fetching project detail:', err);
        const found = fallbackProjects.find(p => p._id === id || p.id === id);
        if (found) {
          setProject(found);
          setRelatedProjects(fallbackProjects.filter(p => p.category === found.category && p._id !== found._id));
        } else {
          setProject(fallbackProjects[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    getProjectData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-dark">
        <span className="text-gray-400 animate-pulse font-medium text-sm">Retrieving project blueprints...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center bg-white dark:bg-dark">
        <h2 className="text-xl font-bold">Project blueprints not found</h2>
        <Link to="/projects" className="text-primary mt-4 inline-block hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (project.galleryImages && project.galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (project.galleryImages && project.galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % project.galleryImages.length);
    }
  };

  const formattedStartDate = project.startDate 
    ? new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Pending';
  
  const formattedEndDate = project.completionDate 
    ? new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Ongoing';

  return (
    <div className="pt-16 md:pt-20 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      
      {/* 1. Hero & Breadcrumbs Section */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-black/65 z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-7xl mx-auto px-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary bg-primary/10 border border-primary/20 px-3 py-1 font-display w-fit">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight max-w-3xl leading-tight">
              {project.title}
            </h1>
            
            {/* Breadcrumbs */}
            <nav className="text-xs font-display font-semibold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-primary truncate max-w-[200px]">{project.title}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Layout Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Description, Objectives, Challenges, Solutions */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-black text-secondary dark:text-white uppercase flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary" /> Project Overview
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Objectives */}
            {project.objectives && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-secondary dark:text-white uppercase flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary" /> Core Objectives
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {project.objectives}
                </p>
              </div>
            )}

            {/* Challenges & Solutions Split Section */}
            {(project.challenges || project.solutions) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-b border-gray-100 dark:border-gray-800 py-10">
                {project.challenges && (
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
                      Engineering Challenges
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-rose-500/50 pl-4 py-1">
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.solutions && (
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
                      Implemented Solutions
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-emerald-500/50 pl-4 py-1">
                      {project.solutions}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Highlights Features Grid */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-secondary dark:text-white uppercase">
                  Project Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="bg-surface dark:bg-dark-card p-5 border border-gray-100 dark:border-gray-800 flex gap-3 hover:shadow-card transition-shadow">
                      <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-text-primary leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Metadata Info Card */}
          <div className="space-y-8">
            <div className="bg-surface dark:bg-dark-card border border-gray-150 dark:border-gray-800 p-8 shadow-premium rounded transition-colors duration-300">
              <h3 className="font-display font-black text-secondary dark:text-white text-lg uppercase tracking-wide border-b-2 border-primary pb-4 mb-6">
                Project Information
              </h3>
              
              <ul className="space-y-6 text-sm">
                <li className="flex items-start justify-between">
                  <div className="flex items-center text-gray-400">
                    <User size={16} className="mr-2 text-primary shrink-0" />
                    <span>Client</span>
                  </div>
                  <span className="font-semibold text-right max-w-[150px]">{project.client}</span>
                </li>

                <li className="flex items-start justify-between">
                  <div className="flex items-center text-gray-400">
                    <Tag size={16} className="mr-2 text-primary shrink-0" />
                    <span>Category</span>
                  </div>
                  <span className="font-semibold text-right">{project.category}</span>
                </li>

                <li className="flex items-start justify-between">
                  <div className="flex items-center text-gray-400">
                    <MapPin size={16} className="mr-2 text-primary shrink-0" />
                    <span>Location</span>
                  </div>
                  <span className="font-semibold text-right max-w-[150px]">{project.location}</span>
                </li>

                <li className="flex items-start justify-between">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2 text-primary shrink-0" />
                    <span>Timeline</span>
                  </div>
                  <span className="font-semibold text-right text-xs">
                    {formattedStartDate} - {formattedEndDate}
                  </span>
                </li>

                {project.budget && (
                  <li className="flex items-start justify-between">
                    <div className="flex items-center text-gray-400">
                      <DollarSign size={16} className="mr-2 text-primary shrink-0" />
                      <span>Est. Budget</span>
                    </div>
                    <span className="font-semibold text-right">{project.budget}</span>
                  </li>
                )}

                <li className="flex items-start justify-between">
                  <div className="flex items-center text-gray-400">
                    <Clock size={16} className="mr-2 text-primary shrink-0" />
                    <span>Project Status</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Completed
                  </span>
                </li>
              </ul>

              {/* Technologies chip lists inside card */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-800">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center mb-4">
                    <Cpu size={14} className="mr-1 text-primary" /> Technologies Involved
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 text-text-secondary px-3 py-1.5 text-xs font-medium rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action links widget */}
            <div className="bg-secondary text-white p-8 border-l-4 border-primary space-y-4">
              <h4 className="font-display font-bold text-white text-lg leading-tight uppercase">
                Require a Similar Structure?
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Connect with our design surveyors and structural engineers to prepare blueprints and load quotes.
              </p>
              <div className="pt-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate('/contact')}
                  className="w-full"
                >
                  Contact Engineering
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Responsive Gallery Section */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="py-24 bg-surface dark:bg-dark-card border-t border-b border-gray-150 dark:border-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
                GALLERY DETAILS
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-black text-secondary dark:text-white uppercase">
                Construction Sight Galleries
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto mt-2" />
            </div>

            {/* Responsive grid of image thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.galleryImages.map((imgUrl, index) => (
                <div 
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className="relative group overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer shadow-sm hover:shadow-premium transition-all duration-300 border border-gray-100 dark:border-gray-800"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} Gallery - Slide ${index + 1}`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white bg-primary text-secondary font-display font-bold text-xs uppercase px-4 py-2 tracking-wider">
                      Zoom View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-white dark:bg-dark transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
                MATCHING SPECS
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-black text-secondary dark:text-white uppercase">
                Related Portfolios
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relProj) => (
                <div 
                  key={relProj._id}
                  onClick={() => navigate(`/projects/${relProj._id}`)}
                  className="group relative overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800 cursor-pointer border border-gray-150 dark:border-gray-800"
                >
                  <img 
                    src={relProj.imageUrl} 
                    alt={relProj.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Left slide indicator line */}
                  <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-primary mb-1">
                      {relProj.category}
                    </span>
                    <h3 className="text-base font-display font-bold text-white mb-2 leading-tight">
                      {relProj.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin size={12} className="text-primary mr-1 shrink-0" />
                      <span>{relProj.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Call-to-Action Panel Section */}
      <section className="bg-primary text-secondary py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-black opacity-85 flex items-center gap-1.5">
              <Sparkles size={14} /> Get Started Today
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight">
              Ready to Shape Your Construction Ideas?
            </h2>
            <p className="text-xs font-semibold opacity-75">
              Work with our architectural drafting leads and civil estimators to prepare structural plans.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Button 
              variant="secondary" 
              size="md"
              onClick={() => navigate('/contact')}
            >
              Get a Quote
            </Button>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => navigate('/contact')}
              className="!border-secondary !text-secondary hover:!bg-secondary hover:!text-white"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && project.galleryImages && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/95"
            />

            {/* Slider image frame */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] z-10 flex items-center justify-center"
            >
              <img 
                src={project.galleryImages[lightboxIndex]} 
                alt={`${project.title} Zoom View ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
              />

              {/* Close Lightbox */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 p-2 bg-black/60 text-white rounded-full hover:bg-primary hover:text-secondary transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Prev Navigation */}
              <button
                onClick={handlePrevImage}
                className="absolute -left-4 md:-left-16 p-3 bg-black/60 text-white rounded-full hover:bg-primary hover:text-secondary transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Navigation */}
              <button
                onClick={handleNextImage}
                className="absolute -right-4 md:-right-16 p-3 bg-black/60 text-white rounded-full hover:bg-primary hover:text-secondary transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Slide index numbers */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white font-display text-sm tracking-wider font-semibold">
                {lightboxIndex + 1} / {project.galleryImages.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectDetail;
