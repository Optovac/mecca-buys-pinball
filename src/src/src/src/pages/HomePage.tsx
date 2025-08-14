import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactForm from '../components/home/ContactForm';
import StatsSection from '../components/home/StatsSection';
import FAQSection from '../components/home/FAQSection';
import BackgroundSound from '../components/home/BackgroundSound';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactForm />
      </main>
      <Footer />
      <BackgroundSound />
    </div>
  );
};

export default HomePage;
