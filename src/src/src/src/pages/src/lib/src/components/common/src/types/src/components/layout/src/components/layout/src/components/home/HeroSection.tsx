import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pinball-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70"></div>
      
      <AnimatedPinballs />
      
      <div className="container-custom relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-secondary-500 text-gray-900 px-4 py-1 rounded-full font-semibold mb-4 w-fit">
              <MapPin size={16} />
              <span>Serving within 150 miles of Detroit</span>
            </div>
            
            <h1 className="text-white mb-6 leading-tight">
              We Buy <span className="text-primary-500">Pinball</span> Machines
              <span className="block text-secondary-500">Fast Cash & Free Removal!</span>
            </h1>
            
            <p className="text-white text-xl mb-8">
              Turn your unused pinball machine into cash today. We purchase all brands, models, and conditions with immediate payment.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#contact-form" 
                className="btn-primary text-center"
              >
                Get Cash Offer
              </a>
              <a 
                href="#how-it-works" 
                className="btn-outline text-white hover:bg-white/10 text-center"
              >
                Learn How It Works
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#how-it-works" aria-label="Scroll down">
            <ChevronDown className="h-10 w-10 text-white" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedPinballs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 - 50 + '%', 
            y: Math.random() * 100 - 50 + '%',
            opacity: 0.3,
            scale: 0.5 + Math.random() * 0.5
          }}
          animate={{ 
            x: [
              Math.random() * 100 - 50 + '%', 
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%'
            ],
            y: [
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%',
              Math.random() * 100 - 50 + '%'
            ],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-primary-500/20 rounded-lg blur-sm"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroSection;
