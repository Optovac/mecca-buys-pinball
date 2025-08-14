import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Truck, DollarSign, ThumbsUp } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-4">Sell Your Pinball Machine in <span className="text-primary-500">3 Easy Steps</span></h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Our simple process makes selling your machine quick and hassle-free, with no hidden fees or complicated negotiations.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a href="#contact-form" className="btn-primary">
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div 
      className="card hover:shadow-xl group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const steps = [
  {
    icon: <MessageSquare size={32} />,
    title: "Submit Your Machine",
    description: "Fill out our simple form with details about your pinball machine, including make, model, and condition."
  },
  {
    icon: <DollarSign size={32} />,
    title: "Get Your Offer",
    description: "We'll promptly review your information and contact you with a competitive cash offer based on your machine's details."
  },
  {
    icon: <Truck size={32} />,
    title: "Get Paid & We Remove",
    description: "Accept our offer and we'll schedule a convenient pickup time, paying you in cash upon collection."
  }
];

export default HowItWorksSection;
