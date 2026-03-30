import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

interface Slide {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link: string;
  linkText: string;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Global Standards.",
    subtitle: "Local Expertise.",
    description: "Premium accounting, tax, and corporate advisory services with uncompromising integrity.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    link: "/services/india",
    linkText: "Our Services"
  },
  {
    id: 2,
    title: "Strategic Growth.",
    subtitle: "Financial Clarity.",
    description: "Empowering your business decisions with data-driven insights and expert guidance.",
    imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop",
    link: "/about",
    linkText: "Discover Our Approach"
  },
  {
    id: 3,
    title: "Cross-Border.",
    subtitle: "Seamless Management.",
    description: "High-quality outsourced accounting and tax support for international firms.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    link: "/services/international",
    linkText: "Global Solutions"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const q = query(collection(db, 'heroSlides'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedSlides = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Slide[];
          setSlides(fetchedSlides);
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length, current]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, ease: "easeOut" as const }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 }
      }
    })
  };

  return (
    <div ref={containerRef} className="relative h-[95vh] min-h-[700px] w-full overflow-hidden bg-primary perspective-1000">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 bg-cover bg-center scale-110"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[current].imageUrl})` }}
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-4xl">
              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="flex items-center space-x-4"
                >
                  <div className="h-px w-12 bg-accent"></div>
                  <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Kamal Batra & Associates</span>
                </motion.div>
              </div>
              
              <div className="overflow-hidden mb-4">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tighter"
                >
                  {slides[current].title}
                </motion.h1>
              </div>

              <div className="overflow-hidden mb-8">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.8, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light italic leading-tight"
                >
                  {slides[current].subtitle}
                </motion.h2>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 font-light max-w-xl mb-12 leading-relaxed"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Link 
                  to={slides[current].link}
                  className="inline-flex items-center px-10 py-5 bg-accent text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-500 group relative overflow-hidden"
                >
                  <span className="relative z-10">{slides[current].linkText}</span>
                  <ArrowRight className="relative z-10 ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        <button 
          onClick={() => paginate(-1)}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => paginate(1)}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators with Progress */}
      <div className="absolute bottom-12 left-12 z-30">
        <div className="flex items-end space-x-6">
          <div className="text-white font-serif text-5xl font-bold opacity-20">
            0{current + 1}
          </div>
          <div className="flex items-center space-x-3 mb-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className="group relative h-8 flex items-center"
              >
                <div className={`h-[2px] transition-all duration-700 ${
                  current === idx ? 'w-12 bg-accent' : 'w-6 bg-white/20 group-hover:bg-white/50'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary to-transparent z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary to-transparent z-10 opacity-50" />
    </div>
  );
}
