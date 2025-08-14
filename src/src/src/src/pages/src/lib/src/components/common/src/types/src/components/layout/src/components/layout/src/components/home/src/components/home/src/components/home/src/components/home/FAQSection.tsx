import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What types of machines do you buy?",
    answer: "We exclusively purchase pinball machines. While we appreciate all types of arcade games, we specialize only in pinball machines to ensure we can offer the best value for these specific items."
  },
  {
    question: "Is removal really free?",
    answer: "Free removal is included when we purchase your pinball machine. However, if you're only looking for removal/disposal without selling the machine to us, there will be a fee based on distance and the machine's location on your premises."
  },
  {
    question: "How far do you travel to buy machines?",
    answer: "We service locations within 150 miles of the Detroit area. This helps us maintain efficient service and competitive pricing for our customers."
  },
  {
    question: "Are you insured?",
    answer: "Yes, we are fully insured for both liability and property damage. This ensures both you and your property are protected during the removal process."
  },
  {
    question: "Can you remove machines from any location?",
    answer: "We can remove machines from most locations, including basements, garages, and upper floors. However, the specific location may affect removal costs if you're only seeking disposal services without selling to us."
  },
  {
    question: "How quickly can you pick up my machine?",
    answer: "Once we agree on a price, we typically schedule pickup within 1-3 business days, depending on your location and availability."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-4">Frequently Asked <span className="text-primary-500">Questions</span></h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Find answers to common questions about our pinball machine buying service.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  <div
                    className={`px-6 transition-all duration-200 ease-in-out ${
                      openIndex === index ? 'py-4' : 'py-0 h-0'
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
