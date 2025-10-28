import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  return (
    <section id="about-overview" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Built on <span className="text-gradient-gold">Vision.</span>
              <br />
              Grounded in <span className="text-gradient-gold">Values.</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Established in 2015, Deal Right is a multi-venture business group committed to doing
              things the right way — across Realty, Entertainments, and Productions.
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Built on trust. Driven by excellence. Guided by integrity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-background transition-smooth"
                >
                  Know More About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element - Concert Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-gold group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/concert-image.jpeg"
              alt="Deal Right Entertainment Event"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              whileHover={{ 
                scale: 1.1,
                filter: 'brightness(1.2)'
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
            {/* Overlay for better text readability */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Brand overlay with animations */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-primary/20"
                whileHover={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderColor: 'hsl(43 70% 61%)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      boxShadow: '0 0 20px hsl(43 55% 51% / 0.8)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-lg font-playfair font-bold text-background">DR</span>
                  </motion.div>
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.p 
                      className="text-white font-semibold text-sm"
                      whileHover={{ color: 'hsl(43 70% 61%)' }}
                      transition={{ duration: 0.3 }}
                    >
                      Deal Right Entertainments
                    </motion.p>
                    <motion.p 
                      className="text-primary text-xs"
                      animate={{ 
                        color: ['hsl(43 70% 61%)', 'hsl(43 55% 51%)', 'hsl(43 70% 61%)']
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Since 2015
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Hover shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
