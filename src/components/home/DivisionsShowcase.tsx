import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Building2, Music, Film, ArrowRight, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const divisions = [
  {
    icon: Building2,
    title: 'Deal Right Realty',
    subtitle: 'Building Dreams. Shaping Landscapes.',
    description: 'Premier real estate solutions that transform visions into tangible properties and thriving communities.',
    color: 'from-primary/20 to-accent/20',
    gradient: 'from-blue-500/20 to-purple-500/20',
    projects: 150,
    years: '10+',
    image: '/api/placeholder/400/300'
  },
  {
    icon: Music,
    title: 'Deal Right Entertainments',
    subtitle: 'Creating Experiences That Connect.',
    description: 'Curating unforgettable entertainment experiences that bring people together through music, events, and culture.',
    color: 'from-accent/20 to-primary/20',
    gradient: 'from-pink-500/20 to-orange-500/20',
    projects: 75,
    years: '8+',
    image: '/api/placeholder/400/300'
  },
  {
    icon: Film,
    title: 'Deal Right Productions',
    subtitle: 'Where Vision Meets Cinema.',
    description: 'Crafting compelling visual stories that inspire, engage, and leave lasting impressions.',
    color: 'from-primary/20 to-accent/20',
    gradient: 'from-red-500/20 to-yellow-500/20',
    projects: 25,
    years: '5+',
    image: '/api/placeholder/400/300'
  },
];

const DivisionsShowcase = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/30 rounded-full blur-2xl"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
            x: useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Three Disciplines. One Philosophy —{' '}
            <motion.span 
              className="text-gradient-gold"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px hsl(43 55% 51% / 0.5)"
              }}
            >
              Do It Right.
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Excellence across every venture we undertake
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 15 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 h-full group cursor-pointer relative overflow-hidden">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${division.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  />
                  
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  />

                  <CardContent className="p-8 relative z-10">
                    {/* Icon with Enhanced Animation */}
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${division.color} flex items-center justify-center mb-6 group-hover:shadow-gold transition-all duration-500 relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <division.icon 
                        className="text-primary relative z-10" 
                        size={36}
                      />
                    </motion.div>

                    {/* Title with Staggered Animation */}
                    <motion.h3 
                      className="text-2xl font-playfair font-semibold mb-2 group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    >
                      {division.title}
                    </motion.h3>

                    <motion.p 
                      className="text-accent text-sm font-inter font-medium mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    >
                      {division.subtitle}
                    </motion.p>

                    <motion.p 
                      className="text-muted-foreground text-sm leading-relaxed mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {division.description}
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div 
                      className="flex justify-between items-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{division.projects}</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{division.years}</div>
                        <div className="text-xs text-muted-foreground">Years</div>
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                    >
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Explore Division</span>
                        <motion.div
                          className="group-hover/btn:translate-x-1 transition-transform duration-300"
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DivisionsShowcase;
