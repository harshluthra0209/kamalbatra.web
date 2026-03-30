import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getServicesByCategory } from '../data/services';

export default function ServicesInternational() {
  const services = getServicesByCategory('International');

  return (
    <div className="bg-background min-h-screen bg-grain">
      {/* Header */}
      <div className="bg-primary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-8 border border-accent/30">
              Global Reach
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight">International Services</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed italic">
              Seamless cross-border financial management. We provide high-quality outsourced accounting and tax support for CPA and accounting firms in the UK, Canada, and beyond.
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

      {/* Testimonial */}
      <div className="bg-paper py-32 border-t border-accent/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Global Partnerships</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-20 leading-tight">Trusted by <br /><span className="italic text-accent">Global Firms</span></h2>
          <div className="p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-accent/10 relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-primary p-5 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8" />
            </div>
            <p className="text-2xl font-serif italic text-gray-700 mb-12 mt-8 leading-relaxed">
              "Partnering with Kamal Batra & Associates for our UK bookkeeping and payroll has been a game-changer. Their team is highly proficient in Xero and fully understands HMRC compliance. It feels like having an extended team in our own office."
            </p>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-serif font-bold text-primary mb-2">Sarah Jenkins</p>
              <p className="text-[10px] text-accent uppercase tracking-[0.3em] font-bold">Managing Partner, London Accounting Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
