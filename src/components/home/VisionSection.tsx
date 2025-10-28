import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Award, Users, TrendingUp, Handshake } from 'lucide-react';

const values = [
  { icon: Lightbulb, label: 'Innovation' },
  { icon: Award, label: 'Quality' },
  { icon: Users, label: 'Collaboration' },
  { icon: TrendingUp, label: 'Commitment' },
  { icon: Handshake, label: 'Integrity' },
];

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated gold dust effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-8">
            Our <span className="text-gradient-gold">Story</span> in Motion
          </h2>

          {/* Values */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {values.map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-gold transition-smooth">
                  <value.icon className="text-primary" size={28} />
                </div>
                <span className="text-sm font-inter font-medium text-foreground group-hover:text-primary transition-smooth">
                  {value.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-secondary to-card p-8 sm:p-12 rounded-lg border border-border shadow-gold"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-inter font-light text-foreground leading-relaxed">
              "To be a{' '}
              <span className="text-primary font-medium">trusted, forward-thinking enterprise</span>{' '}
              recognized for{' '}
              <span className="text-accent font-medium">integrity, creativity, and impact</span>
              ."
            </p>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm sm:text-base italic">
                Every venture reflects one belief: Do it with purpose. Do it right.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
