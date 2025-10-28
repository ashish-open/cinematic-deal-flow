import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Music, Film } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const divisions = [
  {
    icon: Building2,
    title: 'Deal Right Realty',
    subtitle: 'Building Dreams. Shaping Landscapes.',
    description: 'Premier real estate solutions that transform visions into tangible properties and thriving communities.',
    color: 'from-primary/20 to-accent/20',
  },
  {
    icon: Music,
    title: 'Deal Right Entertainments',
    subtitle: 'Creating Experiences That Connect.',
    description: 'Curating unforgettable entertainment experiences that bring people together through music, events, and culture.',
    color: 'from-accent/20 to-primary/20',
  },
  {
    icon: Film,
    title: 'Deal Right Productions',
    subtitle: 'Where Vision Meets Cinema.',
    description: 'Crafting compelling visual stories that inspire, engage, and leave lasting impressions.',
    color: 'from-primary/20 to-accent/20',
  },
];

const DivisionsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Three Disciplines. One Philosophy —{' '}
            <span className="text-gradient-gold">Do It Right.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Excellence across every venture we undertake
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <motion.div
              key={division.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-card border-border hover:border-primary transition-smooth h-full group cursor-pointer">
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${division.color} flex items-center justify-center mb-6 group-hover:shadow-gold transition-smooth`}
                  >
                    <division.icon className="text-primary" size={32} />
                  </motion.div>

                  <h3 className="text-2xl font-playfair font-semibold mb-2 group-hover:text-primary transition-smooth">
                    {division.title}
                  </h3>

                  <p className="text-accent text-sm font-inter font-medium mb-4">
                    {division.subtitle}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {division.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsShowcase;
