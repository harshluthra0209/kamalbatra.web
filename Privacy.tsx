import { ArrowRight, ShieldCheck, Globe, LineChart, Users, CheckCircle2, Award, Briefcase, ChevronRight, BarChart3, Settings, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getServicesByCategory } from '../data/services';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  const domesticServices = getServicesByCategory('Domestic').slice(0, 4);
  const internationalServices = getServicesByCategory('International').slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSlider />

      {/* Core Capabilities */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Expertise</span>
            <h2 className="text-primary font-serif text-5xl md:text-7xl font-bold tracking-tight">Core Capabilities</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/capabilities" className="hidden md:flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-accent transition-all duration-300 mt-6 md:mt-0 group">
              View All Capabilities <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {[
            { id: "digital-transformation", icon: Globe, title: "Digital Transformation", desc: "Transforming ambitious businesses with expert advice in strategy, digital, and operations." },
            { id: "strategy-growth", icon: TrendingUp, title: "Strategy & Growth", desc: "Developing tailored strategies to accelerate your business growth and market expansion." },
            { id: "operations-excellence", icon: Settings, title: "Operations Excellence", desc: "Optimizing your business processes for maximum efficiency and sustainable performance." },
            { id: "leadership-advisory", icon: Users, title: "Leadership Advisory", desc: "Empowering your leadership team with actionable insights and strategic guidance." }
          ].map((capability, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hover:border-accent/30 transition-all duration-500 group flex flex-col h-full transform-gpu perspective-1000"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                <capability.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-5">{capability.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-10 flex-grow font-light">
                {capability.desc}
              </p>
              <Link to={`/capabilities/${capability.id}`} className="inline-flex items-center text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-accent transition-colors mt-auto group/link">
                Learn More <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Services Section */}
      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Specialized Solutions</span>
              <h2 className="text-primary font-serif text-5xl md:text-7xl font-bold tracking-tight">Featured Services</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/services/india" className="hidden md:flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-accent transition-all duration-300 mt-6 md:mt-0 group">
                View All Services <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[...domesticServices.slice(0, 2), ...internationalServices.slice(0, 1)].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col"
              >
                <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-light">
                  {service.shortDescription}
                </p>
                <div className="space-y-3 mb-10">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/services/${service.id}`} className="inline-flex items-center text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-accent transition-colors group/link">
                  Explore Service <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { label: 'Global Clients', value: 500 },
              { label: 'Projects Delivered', value: 150 },
              { label: 'Years Experience', value: 20 }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                className="relative group"
              >
                <div className="text-7xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tighter group-hover:text-accent transition-colors duration-500">
                  {stat.value}<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.5em] font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Approach Section */}
      <section className="py-40 bg-background relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[120px] -mr-96 -mt-96" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Methodology</span>
            <h2 className="text-primary font-serif text-5xl md:text-7xl font-bold tracking-tight">The Kamal Batra Approach</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative">
            {/* Connecting Line (Desktop only) */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent z-0 origin-left" 
            />
            
            {[
              { num: '01', title: 'Discovery', desc: 'Comprehensive analysis of your current financial landscape and business objectives.' },
              { num: '02', title: 'Strategy', desc: 'Developing tailored solutions and compliance frameworks to mitigate risks.' },
              { num: '03', title: 'Execution', desc: 'Precise implementation of strategies with continuous monitoring and reporting.' },
              { num: '04', title: 'Optimization', desc: 'Ongoing refinement to maximize efficiency and drive sustainable growth.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 bg-white border border-accent/10 rounded-[2rem] flex items-center justify-center text-primary font-serif font-bold text-3xl mb-10 shadow-2xl group-hover:bg-primary group-hover:text-accent group-hover:-translate-y-3 transition-all duration-700 transform-gpu"
                >
                  {step.num}
                </motion.div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-5 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-40 bg-paper relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Proven Results</span>
              <h2 className="text-primary font-serif text-5xl md:text-7xl font-bold tracking-tight">Case Studies</h2>
              <p className="text-gray-500 mt-6 max-w-xl font-light leading-relaxed italic">
                Our success is measured by the success of our clients. Explore how we've delivered measurable value across diverse industries and complex financial challenges.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/case-studies" className="hidden md:flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-accent transition-all duration-300 mt-6 md:mt-0 group">
                Explore All Success Stories <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: 'tax-optimization-tech-startup', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1632', title: 'Tax Optimization for Tech Startup', desc: 'Achieved 22% reduction in tax liabilities through strategic restructuring and R&D credits.' },
              { id: 'cross-border-ma-advisory', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1740', title: 'Cross-Border M&A Advisory', desc: 'Facilitated a seamless acquisition process for a multinational manufacturing firm.' },
              { id: 'fema-compliance-resolution', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070', title: 'FEMA Compliance Resolution', desc: 'Resolved complex FDI compliance issues, avoiding significant penalties for the client.' }
            ].map((study, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group"
              >
                <Link to={`/case-studies/${study.id}`} className="block">
                  <div className="relative overflow-hidden rounded-[2.5rem] mb-10 shadow-2xl aspect-[4/5]">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5 }}
                      src={study.img} 
                      alt={study.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
                    <div className="absolute bottom-10 left-10 right-10">
                      <h3 className="text-2xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors duration-300">{study.title}</h3>
                      <p className="text-gray-300 text-sm mb-8 leading-relaxed font-light line-clamp-2">{study.desc}</p>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-6 py-3 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-lg group-hover:bg-white group-hover:text-primary transition-all duration-500">
                          View Case Study <ArrowRight className="ml-3 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center md:hidden">
            <Link to="/case-studies" className="inline-flex items-center text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-accent transition-all duration-300 group">
              Explore All Success Stories <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 bg-primary text-white text-center relative overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:60px_60px]" 
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Take the Next Step</span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10 tracking-tighter leading-[0.9]">
              Ready to Transform <br />
              <span className="italic text-accent">Your Business?</span>
            </h2>
            <p className="text-gray-400 mb-16 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Schedule a confidential consultation with our senior partners to discuss your business requirements and growth strategy.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="inline-flex items-center bg-accent text-primary font-bold px-12 py-6 rounded-none hover:bg-white transition-all duration-500 uppercase tracking-[0.3em] text-[10px] group relative overflow-hidden">
                <span className="relative z-10">Consult an Expert</span>
                <ArrowRight className="relative z-10 ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

