import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenConsultationPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenConsultationPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-[60] max-w-sm w-full"
        >
          <div className="bg-primary text-white p-8 rounded-3xl shadow-2xl border border-accent/20 relative overflow-hidden bg-grain">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/40 hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-6 relative z-10">
              <div className="bg-accent p-4 rounded-2xl text-primary shadow-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Limited Offer</span>
                <h3 className="font-serif text-2xl font-bold mb-3 text-white leading-tight">Free <span className="italic text-accent">Consultation</span></h3>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed font-light italic">
                  Discuss your business goals with our expert Chartered Accountants today.
                </p>
                <Link 
                  to="/contact" 
                  onClick={closePopup}
                  className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] font-bold text-accent hover:text-white transition-all group"
                >
                  Book Your Slot <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
