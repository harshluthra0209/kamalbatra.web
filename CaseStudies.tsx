import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getServicesByCategory } from '../data/services';

export default function ServicesIndia() {
  const services = getServicesByCategory('Domestic');

  return (
    <div className="bg-background min-h-screen bg-grain">
      {/* Header */}
      <div className="bg-primary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-8 border border-accent/30">
              Domestic Expertise
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight">Services in India</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed italic">
              Comprehensive financial, tax, and regulatory solutions tailored for businesses operating within India. We ensure compliance while you focus on growth.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-sm border border-accent/10 flex flex-col group hover:shadow-2xl transition-all duration-700"
            >
              <div className="w-16 h-16 bg-paper rounded-2xl flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-6">{service.title}</h3>
              <p className="text-gray-600 mb-10 flex-grow text-lg font-light leading-relaxed">
                {service.shortDescription}
              </p>
              <div className="mb-12">
                <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6">Key Benefits</h4>
                <ul className="space-y-4">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-accent mr-4 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={`/services/${service.id}`} className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] font-bold text-primary hover:text-accent transition-all mt-auto group/link">
                View Details <ArrowRight className="ml-3 w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ / Process Section */}
      <div className="bg-paper py-32 border-t border-accent/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Our Methodology</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">Compliance Calendar <br />& <span className="italic text-accent">Process</span></h2>
          </div>
          
          <div className="space-y-8">
            <div className="p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-accent/10 hover:shadow-xl transition-all duration-500">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6 italic">How do we handle GST compliance?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">We collect your sales and purchase data monthly, reconcile GSTR-2A/2B to maximize your Input Tax Credit, and file GSTR-1 and GSTR-3B before the deadlines to avoid any late fees or penalties.</p>
            </div>
            <div className="p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-accent/10 hover:shadow-xl transition-all duration-500">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6 italic">What is the process for Statutory Audits?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Our audit process begins with understanding your business environment and internal controls. We then perform risk assessments, substantive testing, and finally issue the audit report in compliance with ICAI standards.</p>
            </div>
            <div className="p-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-accent/10 hover:shadow-xl transition-all duration-500">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6 italic">Do you assist with startup registrations?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Yes, we provide end-to-end services for startups, including Private Limited Company incorporation, obtaining PAN/TAN, GST registration, MSME (Udyam) registration, and Startup India recognition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
