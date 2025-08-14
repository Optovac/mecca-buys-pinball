import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Mike Anderson",
    location: "Grand Rapids, MI",
    text: "I had two pinball machines in my basement that hadn't been played in years. Mecca Buys gave me a great offer for both and handled the removal professionally. Couldn't be happier!",
    stars: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Sarah Miller",
    location: "Ann Arbor, MI",
    text: "When I needed to clear out my game room, Mecca Buys made it so easy. They took all three of my machines and offered more than I expected. Very professional service!",
    stars: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "David Wilson",
    location: "Detroit, MI",
    text: "I inherited several pinball machines that weren't working properly. Other buyers weren't interested, but Mecca Buys still made a fair offer and picked them up the next day.",
    stars: 4,
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Jennifer Martinez",
    location: "Lansing, MI",
    text: "I was downsizing my arcade collection and needed someone reliable. The team at Mecca Buys was honest and straightforward. They bought my entire collection at a great price.",
    stars: 5,
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="section bg-primary-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-4 text-white">What Our <span className="text-secondary-500">Customers</span> Say</h2>
            <p className="max-w-2xl mx-auto text-white/80 text-lg">
              Don't just take our word for it. Here's what people who have sold their pinball machines to us have to say.
            </p>
          </motion.div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-colors ${
                  currentIndex === index ? 'bg-secondary-500' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialProps {
  testimonial: {
    name: string;
    location: string;
    text: string;
    stars: number;
    image: string;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <div className="min-w-full p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-3xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-20 h-20 object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  fill={i < testimonial.stars ? "#FFDD00" : "none"}
                  stroke={i < testimonial.stars ? "#FFDD00" : "#CBD5E0"}
                  size={20}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <div>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
