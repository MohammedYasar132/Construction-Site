import React from 'react';
import { Hammer, Wrench, Paintbrush, Compass, HardHat, Landmark, ShieldCheck, Cpu, Clock } from 'lucide-react';
import { ServiceCard } from '../components/UI/Card';

const Services = () => {
  const serviceList = [
    { icon: Hammer, title: 'Building Construction', description: 'Complete development of high-rise commercial structures, residential complexes, and civil workspaces using top-grade concrete mixtures and architectural steel framework configurations.' },
    { icon: Paintbrush, title: 'Interior Renovation', description: 'Upgrading commercial offices, residential spaces, and hotel lobbies with contemporary aesthetic designs, efficient layouts, acoustic installations, and custom glass systems.' },
    { icon: Wrench, title: 'Facility Maintenance', description: 'Proactive diagnostic checks, electrical systems maintenance, plumbing overhaul, thermal insulation upgrades, and emergency HVAC mechanical systems restorations.' },
    { icon: Compass, title: 'Architectural Design', description: 'Providing site planning analysis, computer-aided 3D layout renderings, elevation maps, sustainable zoning structures, and structural load calculations.' },
    { icon: HardHat, title: 'Project Management', description: 'Direct supervising of sites, sub-contractor alignment, supply logistics optimization, budget estimations, and architectural safety audits.' },
    { icon: Landmark, title: 'Zoning & Permitting', description: 'Navigating building codes, submitting municipal site permit requests, coordinating fire code approvals, and preparing environmental impact declarations.' }
  ];

  const features = [
    { icon: ShieldCheck, title: 'Certified Safe Sites', desc: 'We follow stringent ISO standard protocols, ensuring Zero-Harm environments for our on-site workforce and stakeholders.' },
    { icon: Cpu, title: 'Advanced Technology', desc: 'Deploying high-resolution 3D models and structural estimation calculators to maintain precision budgets and timelines.' },
    { icon: Clock, title: 'On-Time Handover', desc: 'Operating with strict Gantt charts and modular material sourcing networks to prevent project delay gaps.' }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
            WHAT WE PROVIDE
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-secondary dark:text-white mt-3">
            Our Services
          </h1>
          <div className="w-16 h-1 bg-primary mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {serviceList.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        {/* Section: Why Choose Us */}
        <div className="bg-surface dark:bg-dark-card border border-gray-150 dark:border-gray-800 p-12 transition-colors duration-300">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-secondary dark:text-white uppercase">
              Why Partner With ANB Constructions
            </h2>
            <p className="text-text-secondary text-sm mt-2">
              Our engineering expertise, tech integrations, and commitment to project safety distinguish us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg shrink-0">
                    <Icon size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-secondary dark:text-white text-lg">
                      {f.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
