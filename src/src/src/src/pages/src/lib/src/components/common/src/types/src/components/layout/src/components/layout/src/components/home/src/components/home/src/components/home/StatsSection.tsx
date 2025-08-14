import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, ThumbsUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-500 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, index }) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold mb-2">
        <CountUp value={value} />
      </h3>
      <p className="text-xl text-white/80">{label}</p>
    </motion.div>
  );
};

interface CountUpProps {
  value: string;
}

// Simple counter component
const CountUp: React.FC<CountUpProps> = ({ value }) => {
  return <>{value}</>;
};

const stats = [
  {
    icon: <DollarSign size={32} />,
    value: "$500K+",
    label: "Paid to Sellers"
  },
  {
    icon: <ThumbsUp size={32} />,
    value: "500+",
    label: "Machines Purchased"
  },
  {
    icon: <Clock size={32} />,
    value: "24hrs",
    label: "Average Payment Time"
  }
];

export default StatsSection;
