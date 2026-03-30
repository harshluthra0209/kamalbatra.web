import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Chatbot from './Chatbot';
import ConsultationPopup from './ConsultationPopup';
import ScrollToTop from './ScrollToTop';
import DisclaimerModal from './DisclaimerModal';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services (India)', path: '/services/india' },
    { name: 'Services (International)', path: '/services/international' },
    { name: 'Capabilities', path: '/capabilities' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'About Us', path: '/about' },
    { name: 'Client Portal', path: '/portal' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-accent selection:text-primary">
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-primary text-white text-[10px] md:text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-white/10 relative z-[60]"
      >
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <a href="mailto:kamalbatra244@gmail.com" className="flex items-center hover:text-accent transition-colors group">
              <Mail className="w-3 h-3 mr-2 text-accent group-hover:text-white transition-colors" /> kamalbatra244@gmail.com
            </a>
            <span className="text-white/20">|</span>
            <a href="mailto:cakamalbatra@gmail.com" className="flex items-center hover:text-accent transition-colors group">
              <Mail className="w-3 h-3 mr-2 text-accent group-hover:text-white transition-colors" /> cakamalbatra@gmail.com
            </a>
          </div>
          <a href="tel:+919915216636" className="flex items-center hover:text-accent transition-colors group">
            <Phone className="w-3 h-3 mr-2 text-accent group-hover:text-white transition-colors" /> +91 99152 16636
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-white/60 uppercase tracking-widest text-[9px]">Follow Us</span>
          <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
        </div>
      </motion.div>

      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500 border-b",
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl py-2 border-primary/10 shadow-2xl" 
          : "bg-white py-4 border-primary/5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col group">
                <motion.span 
                  layout
                  className="font-serif text-3xl font-bold text-primary leading-none tracking-tight group-hover:text-accent transition-all duration-500"
                >
                  Kamal Batra
                </motion.span>
                <motion.span 
                  layout
                  className="text-[10px] tracking-[0.4em] text-accent uppercase font-bold mt-1.5"
                >
                  & Associates
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative py-2 group",
                    location.pathname === link.path 
                      ? "text-accent" 
                      : "text-primary/60 hover:text-primary"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span 
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500",
                      location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="ml-4 bg-primary text-white px-8 py-3.5 rounded-none text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-primary transition-all duration-500 shadow-xl hover:shadow-accent/20">
                  Get in Touch
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary hover:text-accent focus:outline-none transition-colors p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full overflow-hidden"
            >
              <div className="px-6 pt-6 pb-10 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      location.pathname === link.path
                        ? "bg-primary text-accent shadow-lg"
                        : "text-primary/70 hover:bg-gray-50 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Page Transitions */}
      <main className="flex-grow bg-grain">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden mt-auto">
        {/* Subtle background texture for footer */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <Link to="/" className="flex flex-col mb-10">
                <span className="font-serif text-3xl font-bold text-white leading-none tracking-tight">Kamal Batra</span>
                <span className="text-xs tracking-[0.5em] text-accent uppercase font-bold mt-2">& Associates</span>
              </Link>
              <p className="text-gray-400 text-sm max-w-md mb-10 leading-relaxed font-light">
                Global Standards. Local Expertise. Complete Financial Clarity. We provide premium accounting, tax, and corporate advisory services with uncompromising integrity and a commitment to your long-term success.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-500">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="font-serif text-xl font-bold mb-10 text-accent italic">Quick Links</h3>
              <ul className="space-y-5 text-[11px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                <li><Link to="/services/india" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> Indian Services</Link></li>
                <li><Link to="/services/international" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> International Services</Link></li>
                <li><Link to="/capabilities" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> Core Capabilities</Link></li>
                <li><Link to="/case-studies" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> Case Studies</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> About Us</Link></li>
                <li><Link to="/portal" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> Client Portal</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-all flex items-center group"><span className="w-2 h-px bg-accent/30 mr-4 group-hover:w-4 transition-all"></span> Contact Us</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-serif text-xl font-bold mb-10 text-accent italic">Contact Office</h3>
              <ul className="space-y-8 text-sm text-gray-400 font-light">
                <li className="flex items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-accent/10 transition-all duration-500">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <span className="mt-1 leading-relaxed">
                    <strong>Office:</strong> 3355, Top Floor, Sector 37-D, Chandigarh 160036
                  </span>
                </li>
                <li className="flex items-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-accent/10 transition-all duration-500">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium">+91 99152 16636<br />+91 98156 26653</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-accent/10 transition-all duration-500">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium">kamalbatra244@gmail.com<br />cakamalbatra@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
            <p>&copy; {new Date().getFullYear()} Kamal Batra & Associates. All rights reserved.</p>
            <div className="flex space-x-10 mt-8 md:mt-0">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[9px] text-gray-600 font-light italic leading-relaxed max-w-4xl mx-auto">
              Disclaimer: The information provided on this website is for general informational purposes only and should not be construed as professional advice. As per ICAI guidelines, this website is not intended for solicitation or advertisement.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp / Chatbot */}
      <Chatbot />
      <ConsultationPopup />
      <ScrollToTop />
      <DisclaimerModal />
    </div>
  );
}

