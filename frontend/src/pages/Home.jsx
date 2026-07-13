import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../api/projectService";
import { createInquiry } from "../api/inquiryService";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Wrench,
  Paintbrush,
  Compass,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Users,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";
import { ServiceCard, ProjectCard } from "../components/UI/Card";
import Button from "../components/UI/Button";
import { useAppTheme } from "../context/ThemeContext";

// Mock projects fallback in case backend is loading or unavailable
const fallbackProjects = [
  {
    id: 1,
    title: "Muscat Corporate Center",
    category: "Commercial",
    location: "Muscat, Oman",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
  },
  {
    id: 2,
    title: "Al Mouj Luxury Villas",
    category: "Residential",
    location: "Muscat, Oman",
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600",
  },
  {
    id: 3,
    title: "Modern Library Complex",
    category: "Education",
    location: "Amman, Jordan",
    imageUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600",
  },
  {
    id: 4,
    title: "Prime Hub Headquarters",
    category: "Office",
    location: "Dubai, UAE",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
  },
];

const services = [
  {
    icon: Hammer,
    title: "Building Construction",
    description:
      "Execution of grand commercial towers and structural building blueprints with standard load calculations and safety approvals.",
  },
  {
    icon: Paintbrush,
    title: "Interior Renovation",
    description:
      "Upgrading existing layouts with contemporary space-saving designs, premium finishes, and modern lighting systems.",
  },
  {
    icon: Wrench,
    title: "Facility Maintenance",
    description:
      "Scheduled diagnostic inspects, structural repairs, electrical retrofitting, and high-efficiency ventilation upkeep.",
  },
  {
    icon: Compass,
    title: "Architectural Design",
    description:
      "Conceptual layout blueprints, 3D structural model walkthroughs, sustainable energy plans, and zoning permits.",
  },
];

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    tagline: "We Build Your Dream",
    description:
      "Delivering world-class engineering solutions for complex civic, commercial, and luxury residential projects.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    tagline: "From Concept to Creation",
    description:
      "Guiding you through site analysis, architectural layouts, material sourcing, and complete keys-in-hand construction.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    tagline: "Built with Precision & Pride",
    description:
      "Providing sustainable concrete infrastructures, modern glass architectures, and structural safety guarantees.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Projects State
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Form Booking State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "Residential Construction",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", text: "" });
  const [submittingForm, setSubmittingForm] = useState(false);

  const appointmentFormRef = useRef(null);

  // Auto transition hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const scrollToAppointment = () => {
    appointmentFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Form submit handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmittingForm(true);
    setFormStatus({ type: "", text: "" });

    try {
      const data = await createInquiry(formData);
      setFormStatus({
        type: "success",
        text: "Thank you! Your appointment booking has been submitted.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        service: "Building Construction",
        message: "",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Unable to connect to the server. Please try again later.";
      setFormStatus({ type: "error", text: errorMsg });
    } finally {
      setSubmittingForm(false);
    }
  };

  // Filter project lists
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Simple stats count-up layout
  const stats = [
    { label: "Completed Projects", value: 1500, suffix: "+" },
    { label: "Active Experts", value: 450, suffix: "" },
    { label: "Satisfied Clients", value: 670, suffix: "+" },
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* 1. Dynamic Hero Slider Section */}
      <section className="relative h-[85vh] min-h-[560px] sm:min-h-[600px] md:min-h-[680px] w-full overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].tagline}
              className="w-full h-full object-cover transform scale-102 transition-transform duration-[6000ms]"
            />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full text-white space-y-4 md:space-y-6">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-3 py-1 text-xs uppercase tracking-widest font-bold font-display"
                >
                  <Sparkles size={12} /> ANB Constructions
                </motion.span>

                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-7xl font-display font-extrabold tracking-tight uppercase leading-tight max-w-4xl"
                >
                  {heroSlides[currentSlide].tagline}
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-300 text-sm md:text-lg max-w-2xl font-light leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="pt-2 md:pt-4"
                >
                  <Button
                    onClick={scrollToAppointment}
                    variant="primary"
                    size="lg"
                  >
                    Make An Appointment
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={handlePrevSlide}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 text-white hover:bg-primary hover:text-secondary rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 text-white hover:bg-primary hover:text-secondary rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* 2. Company Statistics Counter */}
      <section className="bg-primary text-secondary py-12 relative z-30 shadow-premium">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1 border-gray-900/10 last:border-none md:border-r"
            >
              <span className="block text-5xl md:text-6xl font-display font-black tracking-tight">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-xs uppercase tracking-widest font-extrabold opacity-80">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Core Services Matrix Section */}
      <section className={`py-24 transition-colors duration-300 ${theme === "anbGold" ? "bg-[#2d2d2d]" : "bg-surface"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xl md:text-3xl uppercase tracking-widest font-black text-primary anb-border pl-3">
              WHAT WE DO
            </span>
            <h2 className="text-2xl md:text-5xl font-display force-light-black-text uppercase">
              Core Building & Engineering Services
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                index={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dynamic Portfolio Container (Filterable Tab Matrix) */}
      <section className="py-24 bg-white dark:bg-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
                OUR WORKS
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-secondary dark:text-white uppercase leading-none">
                Featured Portfolios
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["All", "Commercial", "Residential", "Education", "Office"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors border ${
                      activeFilter === tab
                        ? "bg-primary border-primary text-secondary"
                        : "bg-transparent border-gray-200 dark:border-gray-800 text-secondary dark:text-gray-400 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Project Grid */}
          {loadingProjects ? (
            <div className="text-center py-12">
              <span className="text-gray-400">Loading portfolios...</span>
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
                    onClick={() =>
                      navigate(`/projects/${project._id || project.id}`)
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. Active Forms Handler (Appointment Block) */}
      <section
        ref={appointmentFormRef}
        className="relative py-24 bg-cover bg-center bg-fixed text-text-primary transition-colors duration-300"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200")',
        }}
      >
        <div className="absolute inset-0 bg-white/95 dark:bg-secondary/90 backdrop-blur-xs transition-colors duration-300" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary">
              SCHEDULING PORTAL
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-secondary dark:text-white uppercase">
              Schedule Your Free Consultation
            </h2>
            <p className="text-text-secondary dark:text-gray-300 text-sm max-w-xl mx-auto">
              Book a session with our design architect and engineering
              estimators to obtain quotes.
            </p>
          </div>

          {/* Alert Status */}
          {formStatus.text && (
            <div
              className={`p-4 mb-6 rounded text-sm text-center font-medium ${
                formStatus.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-500/20 dark:border-rose-500/30"
              }`}
            >
              {formStatus.text}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface dark:bg-black/40 p-8 md:p-12 border border-gray-200 dark:border-white/10 transition-colors duration-300"
          >
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                placeholder="Ex. John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                placeholder="Ex. john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                placeholder="Ex. +91 94430 00000"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Requested Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Selected Service Specialty *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
              >
                <option
                  value="Residential Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Residential Construction
                </option>
                <option
                  value="Commercial Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Commercial Construction
                </option>
                <option
                  value="Industrial Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Industrial Construction
                </option>
                <option
                  value="Apartment Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Apartment Construction
                </option>
                <option
                  value="Villa Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Villa Construction
                </option>
                <option
                  value="Home Renovation"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Home Renovation
                </option>
                <option
                  value="Home Extension"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Home Extension
                </option>
                <option
                  value="Interior Design"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Interior Design
                </option>
                <option
                  value="Exterior Design"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Exterior Design
                </option>
                <option
                  value="Architecture Planning"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Architecture Planning
                </option>
                <option
                  value="Structural Engineering"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Structural Engineering
                </option>
                <option
                  value="Construction Consultation"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Construction Consultation
                </option>
                <option
                  value="Turnkey Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Turnkey Construction
                </option>
                <option
                  value="Building Maintenance"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Building Maintenance
                </option>
                <option
                  value="Civil Engineering"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Civil Engineering
                </option>
                <option
                  value="Waterproofing"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Waterproofing
                </option>
                <option
                  value="Plumbing"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Plumbing
                </option>
                <option
                  value="Electrical Works"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Electrical Works
                </option>
                <option
                  value="False Ceiling"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  False Ceiling
                </option>
                <option
                  value="Flooring"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Flooring
                </option>
                <option
                  value="Painting"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Painting
                </option>
                <option
                  value="Roofing"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Roofing
                </option>
                <option
                  value="Landscaping"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Landscaping
                </option>
                <option
                  value="Modular Kitchen"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Modular Kitchen
                </option>
                <option
                  value="Bathroom Renovation"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Bathroom Renovation
                </option>
                <option
                  value="Smart Home Solutions"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Smart Home Solutions
                </option>
                <option
                  value="Site Inspection"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Site Inspection
                </option>
                <option
                  value="Project Management"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Project Management
                </option>
                <option
                  value="Cost Estimation"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Cost Estimation
                </option>
                <option
                  value="3D Design & Visualization"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  3D Design & Visualization
                </option>
                <option
                  value="Custom Construction"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Custom Construction
                </option>
                <option
                  value="Other"
                  className="bg-white dark:bg-secondary text-text-primary dark:text-white"
                >
                  Other
                </option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-text-secondary dark:text-gray-400 font-medium">
                Consultation Requirements & Notes *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-text-primary"
                placeholder="Ex. Brief overview of site location, budget considerations, and project blueprints..."
              />
            </div>

            <div className="md:col-span-2 text-center pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submittingForm}
                className="w-full sm:w-auto"
              >
                Submit Consultation Form
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
