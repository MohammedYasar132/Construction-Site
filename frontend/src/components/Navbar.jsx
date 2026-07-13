import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Layers,
  FileText,
  Phone,
  Menu,
  X,
  Settings,
  Sun,
  Moon,
  Info,
  Check,
} from "lucide-react";
import { useAppTheme } from "../context/ThemeContext";
import ANBLogo from "./UI/ANBLogo";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, selectTheme, darkMode, toggleDarkMode, themeProfiles } =
    useAppTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about", icon: Info },
    { label: "Services", path: "/services", icon: Briefcase },
    { label: "Projects", path: "/projects", icon: Layers },
    { label: "Blog", path: "/blog", icon: FileText },
    { label: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <ANBLogo />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium text-sm tracking-wide uppercase transition-colors py-2 ${
                    isActive
                      ? "text-primary"
                      : "text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme & Actions Settings */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-secondary dark:text-gray-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-primary" />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <button
              onClick={() => setThemePanelOpen(!themePanelOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-secondary dark:text-gray-300 relative"
              aria-label="Theme settings"
            >
              <Settings
                size={20}
                className={
                  themePanelOpen ? "text-primary animate-spin-slow" : ""
                }
              />
            </button>

            <Link
              to="/contact"
              className="bg-primary hover:bg-primary-hover text-secondary font-display font-bold text-xs uppercase px-5 py-3 tracking-wider transition-colors duration-200"
            >
              Get A Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top Header (Brand & Toggles) */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 z-40 md:hidden transition-colors duration-300 navbar-mobile-header">
        <Link to="/" className="flex items-center">
          <ANBLogo size={32} />
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-secondary dark:text-gray-300"
          >
            {darkMode ? (
              <Sun size={18} className="text-primary" />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <button
            onClick={() => setThemePanelOpen(!themePanelOpen)}
            className="p-2 rounded-full text-secondary dark:text-gray-300"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-2 z-40 md:hidden transition-colors duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-14 h-full relative transition-colors ${
                isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute top-0 w-8 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center w-14 h-full text-gray-500 dark:text-gray-400"
        >
          <Menu size={20} />
          <span className="text-[10px] font-medium mt-1">More</span>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 w-4/5 max-w-sm h-full bg-white dark:bg-dark-card shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-display font-extrabold text-lg text-secondary dark:text-white">
                    Navigation
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-primary hover:bg-primary-hover text-secondary font-display font-bold text-center block py-3 uppercase tracking-wider transition-colors duration-200"
                >
                  Request A Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slidin Theme Settings Panel */}
      <AnimatePresence>
        {themePanelOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-45 bg-black/20"
              onClick={() => setThemePanelOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 w-80 h-full bg-white dark:bg-dark-card shadow-2xl z-50 p-6 border-l border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-display font-extrabold text-lg text-secondary dark:text-white">
                  Branding Center
                </h3>
                <button
                  onClick={() => setThemePanelOpen(false)}
                  className="p-1 rounded-full text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6">
                <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">
                  Color Schemes
                </h4>
                <div className="space-y-3">
                  {Object.entries(themeProfiles).map(([key, value]) => {
                    const isSelected = theme === key;
                    const primaryColor = value.variables["--color-primary"];
                    const secondaryColor = value.variables["--color-secondary"];
                    return (
                      <button
                        key={key}
                        onClick={() => selectTheme(key)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Color Swatch Dots */}
                          <div className="flex space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-white"
                              style={{ backgroundColor: primaryColor }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white"
                              style={{ backgroundColor: secondaryColor }}
                            />
                          </div>
                          <span className="text-sm font-medium text-secondary dark:text-gray-200">
                            {value.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check size={16} className="text-primary font-bold" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">
                    Mode Settings
                  </h4>
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 text-left transition-all text-secondary dark:text-gray-200 text-sm font-medium"
                  >
                    <div className="flex items-center space-x-3">
                      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                      <span>
                        {darkMode ? "Light Theme Mode" : "Dark Theme Mode"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-center text-xs text-gray-400">
                Custom Dynamic Branding Theme System
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
