import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ANBLogo from './UI/ANBLogo';

const Facebook = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);


const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-400 pt-16 pb-24 md:pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About section */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center">
            <ANBLogo size={36} />
          </Link>
          <p className="text-sm leading-relaxed">
            Leading international construction and architectural engineering
            organization dedicated to building premium infrastructures with
            modern structural safety, geometric innovation, and sustainable
            techniques.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="#"
              className="w-8 h-8 rounded bg-gray-800 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors text-gray-300"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded bg-gray-800 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors text-gray-300"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded bg-gray-800 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors text-gray-300"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded bg-gray-800 hover:bg-primary hover:text-secondary flex items-center justify-center transition-colors text-gray-300"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-850 w-fit">
            Navigation Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Company
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="hover:text-primary transition-colors"
              >
                Featured Projects
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Company Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Details
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-850 w-fit">
            Our Specialties
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Building Construction
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Renovation & Design
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Industrial Maintenance
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Architectural Planning
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Civil Infrastructure
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-850 w-fit">
            Get In Touch
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Arif Nagar, Tirupathur, Tamil Nadu, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+91 94430 00000</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>info@anbconstructions.com</span>
            </li>
          </ul>

          <div className="pt-2">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Subscribe to newsletter
            </label>
            <form
              className="flex border border-gray-800 roundedoverflow-hidden"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 border-none px-3 py-2 text-xs focus:ring-0 w-full text-white placeholder-gray-500 outline-none"
              />
              <button className="bg-primary hover:bg-primary-hover text-secondary px-3 flex items-center justify-center transition-colors">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} ANB Constructions. All Rights
          Reserved. Inspired by theme7x.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
