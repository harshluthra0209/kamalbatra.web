import { motion } from 'motion/react';
import { Users, Award, Briefcase, HelpCircle, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const team = [
  {
    name: 'CA Kamal Batra',
    role: 'Founder & Managing Partner',
    qualifications: 'B.Com (Hons), FCA, DISA, Grad.CWA, CCA',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    bio: 'Qualified in Nov 2002. Holds 4 years of post-qualification experience, including 1.5 years as a partner at Prem Ravinder & Co., Chandigarh. Membership No: 501835.'
  },
  {
    name: 'CA Nitin Kumar',
    role: 'Partner',
    qualifications: 'B.Com, FCA, CCA',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    bio: 'Qualified in May 2007. Brings 5 years of experience serving as a partner at Prem Ravinder & Co., Chandigarh. Membership No: 510072.'
  },
  {
    name: 'CA Mohit Gaba',
    role: 'Partner',
    qualifications: 'B.Com, ACA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    bio: 'Qualified in Nov 2010, holding 3 years of professional experience in comprehensive financial advisory and compliance. Membership No: 517785.'
  }
];

const testimonials = [
  {
    quote: "Kamal Batra & Associates transformed our financial reporting. Their attention to detail and proactive tax planning saved us a significant amount this fiscal year.",
    author: "Sanjay Gupta",
    company: "TechFlow Solutions"
  },
  {
    quote: "As an NRI, managing my Indian investments and taxes was a nightmare until I found this firm. They handle everything flawlessly.",
    author: "Anita Desai",
    company: "NRI Client, Dubai"
  },
  {
    quote: "Their GST advisory team is top-notch. They helped us restructure our supply chain to optimize our tax outflows legally and efficiently.",
    author: "Vikram Singh",
    company: "Vanguard Logistics"
  }
];

const faqs = [
  {
    question: "What documents do I need for filing my Income Tax Return?",
    answer: "Generally, you need your PAN, Aadhaar, Form 16 (if salaried), bank statements, investment proofs (80C, 80D, etc.), and details of any other income like rent or capital gains."
  },
  {
    question: "Do you provide services for Non-Resident Indians (NRIs)?",
    answer: "Yes, we offer comprehensive NRI services including tax filing, FEMA compliance, repatriation of funds, and property transaction advisory."
  },
  {
    question: "How long does it take to register a Private Limited Company?",
    answer: "Typically, it takes about 10-15 working days to register a Private Limited Company, subject to document availability and ROC processing times."
  },
  {
    question: "What is the difference between an Audit and a Review?",
    answer: "An audit provides the highest level of assurance that financial statements are free of material misstatement, involving extensive testing. A review provides limited assurance and involves primarily analytical procedures and inquiries."
  }
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-16 bg-grain min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
            Excellence in <span className="text-accent italic">Financial</span> Advisory
          </h1>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            Founded on the principles of integrity, accuracy, and strategic foresight, Kamal Batra & Associates has been a trusted partner for businesses and individuals for over two decades.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-32 border-y border-accent/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -ml-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Our Experts</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">Meet Our Leadership</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 2, rotateY: -2 }}
                className="bg-background rounded-2xl overflow-hidden shadow-lg border border-accent/10 group transform-gpu perspective-1000"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">{member.role}</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-primary font-bold text-sm mb-4">{member.qualifications}</p>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Client Success</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 relative group hover:bg-white/10 transition-colors duration-500"
              >
                <div className="absolute -top-6 left-10 bg-accent w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
                <p className="text-lg font-light italic leading-relaxed mb-8 text-gray-300 mt-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.author}</p>
                  <p className="text-accent text-xs uppercase tracking-widest font-bold mt-1">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-32 border-t border-accent/10 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -mr-48 -mb-48" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Knowledge Base</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-accent/10 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                >
                  <span className="font-serif font-bold text-lg text-primary group-hover:text-accent transition-colors pr-8">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-500 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 font-light leading-relaxed border-t border-accent/5 pt-6">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
