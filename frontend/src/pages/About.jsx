import React from 'react';
import { Shield, Target, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { icon: Shield, title: 'Safety Integrity', desc: 'Putting site health and structural safety parameters above all else, ensuring strict load testing and compliance.' },
    { icon: Target, title: 'Geometric Precision', desc: 'Maintaining accuracy in execution of structural blueprints using modular prefabrications and advanced surveying.' },
    { icon: Award, title: 'Materials Quality', desc: 'Deploying high-strength steel grades, concrete mixes, and custom glass designs for premium durability.' },
    { icon: Users, title: 'Expert Synergy', desc: 'Collaborating closely with architectural visionaries, civil estimators, and dedicated site craftsmen.' }
  ];

  const milestones = [
    { year: '2012', title: 'Company Founded', desc: 'Started as a local civil contracting agency in Muscat, Oman.' },
    { year: '2016', title: 'Commercial Expansion', desc: 'Won contracts for high-rise commercial structures and municipal offices.' },
    { year: '2020', title: 'Global Integration', desc: 'Expanded services across Oman, UAE, and Jordan, adopting LEED sustainable building standards.' },
    { year: '2025', title: 'Digital Architectural Era', desc: 'Wired our blueprint designs directly to automated prefabrication workflows.' }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-white dark:bg-dark text-text-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-extrabold text-primary anb-border pl-3">
            WHO WE ARE
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-secondary dark:text-white mt-3">
            About ANB Constructions
          </h1>
          <div className="w-16 h-1 bg-primary mt-4" />
        </div>

        {/* Section 1: Image & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" 
              alt="ANB Constructions Site" 
              className="w-full h-96 object-cover border-4 border-primary shadow-premium"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary -z-10 hidden sm:block" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-secondary dark:text-white uppercase">
              Shaping Architectural Landscapes Since 2012
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              ANB Constructions stands at the forefront of contemporary construction, architectural planning, and infrastructure development. We specialize in transforming complex structural blueprints into highly functional realities. 
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Our multidisciplinary teams of senior civil architects, design engineers, environmental consultants, and heavy machinery operators work in unison to assure your construction is delivered with premium quality, on-schedule, and within budget.
            </p>
            <div className="border-l-4 border-primary pl-4 py-2 italic text-sm text-text-secondary">
              "We don't just build frameworks; we design communities, corporate hubs, and residential retreats built to last generations."
            </div>
          </div>
        </div>

        {/* Section 2: Core Values Grid */}
        <div className="bg-surface dark:bg-dark-card p-12 mb-24 border border-gray-150 dark:border-gray-800 transition-colors">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-secondary dark:text-white uppercase">
              Our Core Construction Values
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-xl mx-auto">
              The fundamental principles that guide our site inspections, engineering analyses, and safety declarations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mx-auto rounded-full">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-secondary dark:text-white text-lg">
                    {v.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: History Timeline */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-secondary dark:text-white uppercase">
              Our Historical Milestones
            </h2>
            <p className="text-text-secondary text-sm mt-2">
              From our humble beginnings to a renowned structural contractor.
            </p>
          </div>

          <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-32 space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                {/* Year tag left aligned on desktop */}
                <div className="absolute -left-4 md:-left-32 top-0 font-display font-black text-2xl text-primary md:w-24 text-left">
                  {m.year}
                </div>
                
                {/* Connector Dot */}
                <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-primary border-4 border-white dark:border-dark" />
                
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-secondary dark:text-white text-lg uppercase leading-tight">
                    {m.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
