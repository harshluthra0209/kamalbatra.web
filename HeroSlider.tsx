import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimer_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimer_accepted', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-accent/20 max-w-2xl w-full overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
            
            <div className="p-12">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <ShieldAlert className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">ICAI Disclaimer & Terms</h2>
              
              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-sm overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
                <p>
                  As per the rules of the <strong>Institute of Chartered Accountants of India (ICAI)</strong>, Chartered Accountants are not permitted to solicit work or advertise. By clicking on the "I Agree" button below, the user acknowledges the following:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from us or any of our members to solicit any work through this website.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>The user wishes to gain more information about us for his/her own information and use.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>The information about us is provided to the user only on his/her specific request and any information obtained or materials downloaded from this website is completely at the user's volition and any transmission, receipt or use of this site would not create any lawyer-client relationship.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>The information provided under this website is solely available at your request for informational purposes only, should not be interpreted as soliciting or advertisement.</span>
                  </li>
                </ul>
                
                <p className="italic text-xs text-gray-400 mt-4">
                  We are not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal/financial issues, he/she in all cases must seek independent professional advice.
                </p>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-primary text-white font-bold text-[11px] uppercase tracking-[0.3em] px-8 py-5 rounded-xl hover:bg-accent hover:text-primary transition-all shadow-xl shadow-primary/10"
                >
                  I Agree & Enter
                </button>
                <button
                  onClick={() => window.location.href = 'https://www.google.com'}
                  className="flex-1 bg-paper text-primary border border-accent/10 font-bold text-[11px] uppercase tracking-[0.3em] px-8 py-5 rounded-xl hover:bg-gray-100 transition-all"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
