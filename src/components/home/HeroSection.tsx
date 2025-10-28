import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about-overview');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle logo phase transition
  useEffect(() => {
    // Show logo for 3 seconds, then transition to hero content
    const logoTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{ y }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
          
          {/* Dynamic mesh gradient */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                hsl(43 55% 51% / 0.3) 0%, 
                transparent 50%),
                linear-gradient(45deg, 
                  hsl(43 55% 51% / 0.1) 0%, 
                  transparent 50%, 
                  hsl(43 70% 61% / 0.1) 100%)`
            }}
          />
        </motion.div>
      </div>

      {/* Logo Phase - Large and Centered */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.1,
              y: -100,
              transition: { duration: 1, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.img
                src="/logo-01.png"
                alt="Deal Right Logo"
                className="h-44 sm:h-52 md:h-68 lg:h-76 w-auto mx-auto"
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    "drop-shadow(0 0 20px hsl(43 55% 51% / 0.3))",
                    "drop-shadow(0 0 40px hsl(43 55% 51% / 0.5))",
                    "drop-shadow(0 0 20px hsl(43 55% 51% / 0.3))"
                  ]
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced particle system */}
      <div className="absolute inset-0 opacity-40 z-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-primary/20"
            style={{
              width: 20 + Math.random() * 40,
              height: 20 + Math.random() * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content - Only show after logo phase */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8"
            style={{ opacity }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
          {/* Main Logo */}
          <motion.div
            className="mt-16 mb-3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <motion.img
              src="/logo-01.png"
              alt="Deal Right Logo"
              className="h-40 sm:h-48 md:h-64 lg:h-72 w-auto"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 30px hsl(43 55% 51% / 0.5))"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Animated Subtitle */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-foreground mb-2 font-inter font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Doing Business the{' '}
              <motion.span 
                className="text-gradient-gold font-semibold"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{
                  background: "linear-gradient(90deg, hsl(43 55% 51%), hsl(43 70% 61%), hsl(43 55% 51%))",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Right Way
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.span
                className="inline-block mr-4"
                whileHover={{ scale: 1.1, color: "hsl(43 55% 51%)" }}
                transition={{ duration: 0.2 }}
              >
                Realty.
              </motion.span>
              <motion.span
                className="inline-block mr-4"
                whileHover={{ scale: 1.1, color: "hsl(43 55% 51%)" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                Entertainments.
              </motion.span>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.1, color: "hsl(43 55% 51%)" }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                Productions.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToNext}
                size="lg"
                className="bg-gradient-gold hover:shadow-gold hover:scale-105 transition-all duration-300 text-background font-inter font-semibold px-8 py-6 text-lg group relative"
              >
                <span className="relative z-10">
                  Explore Our World
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 font-inter font-semibold px-8 py-6 text-lg group"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Watch Our Story
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ▶
                  </motion.div>
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToNext}
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
            animate={{ 
              boxShadow: [
                "0 0 0 0 hsl(43 55% 51% / 0.7)",
                "0 0 0 10px hsl(43 55% 51% / 0)",
                "0 0 0 0 hsl(43 55% 51% / 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-xs text-muted-foreground font-inter"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
