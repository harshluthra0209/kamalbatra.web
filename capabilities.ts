import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import { getServiceById } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceById(slug) : null;

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background bg-grain">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Service Not Found</h1>
        <Link to="/" className="text-accent hover:underline font-medium">Return Home</Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="bg-background min-h-screen bg-grain">
      {/* Header */}
      <div className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2A900_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to={`/services/${service.category.toLowerCase()}`} className="inline-flex items-center text-accent hover:text-white transition-colors mb-8 text-sm font-medium uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to {service.category} Services
            </Link>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mr-6 border border-accent/30">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl font-light leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-24">
          {/* Scope of Work */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-3xl flex flex-col"
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">Scope of Work</h2>
            <ul className="space-y-6 flex-grow">
              {service.scopeOfWork.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Key Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary text-white p-12 rounded-3xl relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <h2 className="text-3xl font-serif font-bold text-white mb-8 relative z-10">Key Benefits</h2>
            <ul className="space-y-6 relative z-10 flex-grow">
              {service.benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-4 mt-2.5 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Case Studies / Real-Life Examples Section */}
        {service.caseStudies && service.caseStudies.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Proven Results</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Real-Life Examples</h2>
              </div>
              <div className="hidden md:block">
                <Briefcase className="w-12 h-12 text-accent/20" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {service.caseStudies.map((caseStudy, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16" />
                      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Case Study</span>
                      <h3 className="text-2xl font-serif font-bold mb-6 leading-tight">{caseStudy.title}</h3>
                      <div className="w-12 h-1 bg-accent/50" />
                    </div>
                    <div className="lg:col-span-8 p-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">The Challenge</h4>
                          <p className="text-gray-600 font-light leading-relaxed">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">Our Solution</h4>
                          <p className="text-gray-600 font-light leading-relaxed">{caseStudy.solution}</p>
                        </div>
                      </div>
                      <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">The Result</h4>
                          <p className="text-xl font-serif font-bold text-accent">{caseStudy.result}</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-200 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Compliance Checklist Section (Special for FEMA/Regulatory) */}
        {service.complianceChecklist && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32 bg-paper p-12 md:p-20 rounded-[40px] border border-accent/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <ShieldCheck className="w-64 h-64" />
            </div>
            <div className="max-w-3xl relative z-10">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Professional Standards</span>
              <h2 className="text-4xl font-serif font-bold text-primary mb-8">Compliance Checklist</h2>
              <p className="text-gray-600 font-light mb-12 text-lg">
                We ensure every critical aspect of {service.title} is meticulously addressed. Here's a glimpse of our internal compliance framework.
              </p>
              <div className="space-y-6">
                {service.complianceChecklist.map((item, index) => (
                  <div key={index} className="flex items-center space-x-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:translate-x-2 transition-transform">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Trust Factors Section */}
        {service.trustFactors && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="bg-primary text-white p-12 md:p-20 rounded-[40px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2A900_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Why Trust Us</span>
                  <h2 className="text-4xl font-serif font-bold mb-8">Professionalism & Awareness</h2>
                  <p className="text-gray-300 font-light mb-10 text-lg leading-relaxed">
                    We build trust through transparency, expertise, and a proactive approach to regulatory changes. Our commitment to excellence is reflected in every engagement.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.trustFactors.map((factor, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-accent flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span className="text-gray-200 text-sm font-light">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:block relative">
                  <div className="w-full aspect-square bg-accent/5 rounded-full flex items-center justify-center border border-accent/10">
                    <div className="w-3/4 aspect-square bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
                      <ShieldCheck className="w-32 h-32 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Value Delivery Section */}
        {service.valueDelivery && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Value Delivery</h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light">How we create tangible impact for your business through this service.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.valueDelivery.map((item, index) => (
                <div key={index} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-accent font-serif italic text-sm mb-4">Value Proposition {index + 1}</div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Features Section */}
        {service.features && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32 bg-gray-50 rounded-[40px] p-12 md:p-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">Service Features</h2>
                <p className="text-gray-600 font-light mb-8">Technical capabilities and specialized tools we bring to the table.</p>
                <div className="w-20 h-1 bg-accent" />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border-b border-gray-200">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-primary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Process Section */}
        {service.process && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Our Process</h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-light">A systematic approach to ensuring excellence in every engagement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {service.process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-[120px] font-serif font-black text-gray-100 leading-none absolute -top-12 -left-4 -z-10">
                    {step.step}
                  </div>
                  <div className="pt-8">
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">{step.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">{step.description}</p>
                  </div>
                  {index < service.process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[1px] bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-white p-16 rounded-[40px] text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <h2 className="text-4xl font-serif font-bold text-white mb-6 relative z-10">Ready to get started?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Contact our experts to discuss how we can assist you with {service.title.toLowerCase()} and deliver measurable value to your business.
          </p>
          <Link to="/contact" className="inline-block bg-accent text-primary font-bold px-12 py-5 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-sm relative z-10">
            Book a Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
