import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ContactTeaser = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#CBA135_1px,transparent_1px),linear-gradient(to_bottom,#CBA135_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-8 leading-tight">
            From shaping skylines to producing stories that inspire
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
            Every venture we undertake reflects one belief:{' '}
            <span className="text-primary font-medium">Do it with purpose. Do it right.</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gradient-gold hover:shadow-gold transition-smooth text-background font-inter font-semibold px-8 py-6 text-lg group"
              >
                Let's Connect
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactTeaser;
