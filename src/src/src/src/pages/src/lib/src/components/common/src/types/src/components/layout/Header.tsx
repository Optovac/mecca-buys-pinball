import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-12 w-auto" />
          <span className={`ml-2 font-bold text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Mecca Buys
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#how-it-works" isScrolled={isScrolled}>
            How It Works
          </NavLink>
          <NavLink href="#why-choose-us" isScrolled={isScrolled}>
            Why Choose Us
          </NavLink>
          <NavLink href="#faq" isScrolled={isScrolled}>
            FAQ
          </NavLink>
          <Link 
            to="#contact-form" 
            className="btn-primary"
          >
            Get Cash Offer
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <MobileNavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </MobileNavLink>
            <MobileNavLink href="#why-choose-us" onClick={() => setIsMenuOpen(false)}>
              Why Choose Us
            </MobileNavLink>
            <MobileNavLink href="#faq" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </MobileNavLink>
            <Link 
              to="#contact-form" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Cash Offer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  isScrolled: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isScrolled, children }) => (
  <a 
    href={href} 
    className={`font-semibold hover:text-primary-500 transition-colors ${
      isScrolled ? 'text-gray-900' : 'text-white'
    }`}
  >
    {children}
  </a>
);

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children }) => (
  <a 
    href={href} 
    className="block text-gray-900 font-semibold py-2 hover:text-primary-500 transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Header;
