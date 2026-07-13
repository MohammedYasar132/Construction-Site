import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { createContactInquiry } from '../api/contactService';
import Button from '../components/UI/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'Residential Construction'
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const data = await createContactInquiry({
        ...formData,
        date: new Date(), // Set current date as default for simple contact inquiry
      });

      setStatus({ type: 'success', text: 'Thank you! Your message has been received. Our sales representatives will call you shortly.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: 'Residential Construction'
      });
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Connection failed. Please check your internet connection.';
      setStatus({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const infoDetails = [
    { icon: MapPin, title: 'Office Address', desc: 'Arif Nagar, Tirupathur, Tamil Nadu, India' },
    { icon: Phone, title: 'Phone Number', desc: '+91 94430 00000' },
    { icon: Mail, title: 'Email Address', desc: 'info@anbconstructions.com' },
    { icon: Clock, title: 'Office Hours', desc: 'Monday - Saturday: 9:00 AM - 6:00 PM' }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
            CONNECT
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-secondary dark:text-white mt-3">
            Contact Us
          </h1>
          <div className="w-16 h-1 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {/* Left: Contact Info Block */}
          <div className="space-y-8 bg-surface dark:bg-dark-card p-8 border border-gray-150 dark:border-gray-800 transition-colors">
            <div>
              <h2 className="text-xl font-display font-extrabold text-secondary dark:text-white uppercase">
                Contact Details
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Reach out to us directly for general business queries.
              </p>
            </div>

            <div className="space-y-6">
              {infoDetails.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-400">
                        {info.title}
                      </h3>
                      <p className="text-sm font-semibold mt-1">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Message Form Block */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-display font-extrabold text-secondary dark:text-white uppercase flex items-center gap-2">
                <MessageSquare className="text-primary" size={20} /> Drop Us A Message
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Have a project idea? Fill the quick questionnaire below and we will contact you.
              </p>
            </div>

            {status.text && (
              <div className={`p-4 rounded text-sm text-center font-medium ${
                status.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface dark:bg-dark-card p-8 border border-gray-150 dark:border-gray-800 transition-colors">
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                  placeholder="Ex. John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                  placeholder="+91 94430 00000"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Selected Service Specialty *</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-text-primary"
                >
                  <option value="Residential Construction">Residential Construction</option>
                  <option value="Commercial Construction">Commercial Construction</option>
                  <option value="Industrial Construction">Industrial Construction</option>
                  <option value="Apartment Construction">Apartment Construction</option>
                  <option value="Villa Construction">Villa Construction</option>
                  <option value="Home Renovation">Home Renovation</option>
                  <option value="Home Extension">Home Extension</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Exterior Design">Exterior Design</option>
                  <option value="Architecture Planning">Architecture Planning</option>
                  <option value="Structural Engineering">Structural Engineering</option>
                  <option value="Construction Consultation">Construction Consultation</option>
                  <option value="Turnkey Construction">Turnkey Construction</option>
                  <option value="Building Maintenance">Building Maintenance</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Waterproofing">Waterproofing</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical Works">Electrical Works</option>
                  <option value="False Ceiling">False Ceiling</option>
                  <option value="Flooring">Flooring</option>
                  <option value="Painting">Painting</option>
                  <option value="Roofing">Roofing</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Modular Kitchen">Modular Kitchen</option>
                  <option value="Bathroom Renovation">Bathroom Renovation</option>
                  <option value="Smart Home Solutions">Smart Home Solutions</option>
                  <option value="Site Inspection">Site Inspection</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Cost Estimation">Cost Estimation</option>
                  <option value="3D Design & Visualization">3D Design & Visualization</option>
                  <option value="Custom Construction">Custom Construction</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium">Message Body *</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white dark:bg-dark border border-gray-250 dark:border-gray-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-text-primary"
                  placeholder="Please outline details regarding project scopes, coordinates, materials required, and budgeting limits..."
                />
              </div>

              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md"
                  loading={loading}
                  className="w-full sm:w-auto"
                >
                  Send Inquiry Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Container */}
        <div>
          <h2 className="text-xl font-display font-extrabold text-secondary dark:text-white uppercase mb-6">
            Our Headquarters Location
          </h2>
          <div className="w-full h-96 bg-gray-100 border border-gray-250 dark:border-gray-800 overflow-hidden relative">
            {/* Embedded interactive Google Map placeholder matching professional site design */}
            <iframe 
              title="ANB Constructions Headquarters Map"
              src="https://maps.google.com/maps?q=ANB%20Constructions,%20Arif%20Nagar,%20Tirupathur,%20Tamil%20Nadu,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-none outline-none grayscale dark:invert"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
