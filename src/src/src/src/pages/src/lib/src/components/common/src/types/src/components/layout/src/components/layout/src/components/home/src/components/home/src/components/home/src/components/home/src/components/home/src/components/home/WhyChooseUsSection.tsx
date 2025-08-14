import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Clock, DollarSign, Truck, Smile, Shield } from 'lucide-react';

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-choose-us" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-4">Why <span className="text-primary-500">Choose Us</span>?</h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              We pride ourselves on offering the best service for pinball machine sellers. Here's how we compare to other options.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <ReasonCard 
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-500 text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Mecca Buys</th>
                  <th className="p-4 text-center">Classified Ads</th>
                  <th className="p-4 text-center">Auction Sites</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="p-4 font-semibold">{row.feature}</td>
                    <td className="p-4 text-center">{renderComparisonCell(row.meccaBuys)}</td>
                    <td className="p-4 text-center">{renderComparisonCell(row.classifiedAds)}</td>
                    <td className="p-4 text-center">{renderComparisonCell(row.auctionSites)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div 
      className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mr-4 text-primary-500">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const reasons = [
  {
    icon: <DollarSign size={24} />,
    title: "Competitive Cash Offers",
    description: "We offer fair, market-based prices for your pinball machine, regardless of condition or age."
  },
  {
    icon: <Truck size={24} />,
    title: "Free Removal Service",
    description: "We handle all the heavy lifting with our free professional removal service."
  },
  {
    icon: <Clock size={24} />,
    title: "Quick & Hassle-Free",
    description: "Our streamlined process means you can sell your machine and get paid in days, not weeks or months."
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "Experts in Pinball",
    description: "With extensive knowledge of machines, we can accurately value your pinball machine."
  },
  {
    icon: <Smile size={24} />,
    title: "No Obligation",
    description: "Get a free quote without any pressure or commitment to sell."
  },
  {
    icon: <Shield size={24} />,
    title: "Safe & Secure",
    description: "Professional service with secure transactions and proper documentation."
  }
];

const comparisonData = [
  {
    feature: "Instant Payment",
    meccaBuys: true,
    classifiedAds: false,
    auctionSites: false
  },
  {
    feature: "Free Removal",
    meccaBuys: true,
    classifiedAds: false,
    auctionSites: false
  },
  {
    feature: "No Fees",
    meccaBuys: true,
    classifiedAds: "Sometimes",
    auctionSites: false
  },
  {
    feature: "No Strangers in Home",
    meccaBuys: true,
    classifiedAds: false,
    auctionSites: "Sometimes"
  },
  {
    feature: "Guaranteed Sale",
    meccaBuys: true,
    classifiedAds: false,
    auctionSites: false
  }
];

const renderComparisonCell = (value: boolean | string) => {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="text-success-500">✓</span>
    ) : (
      <span className="text-error-500">✗</span>
    );
  }
  return value;
};

export default WhyChooseUsSection;
