import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'CEO, TechCorp India',
    company: 'Realty Division',
    rating: 5,
    text: 'Deal Right transformed our vision into reality. Their attention to detail and commitment to excellence is unmatched. The residential complex they delivered exceeded all our expectations.',
    image: '/api/placeholder/80/80',
    project: 'Luxury Residential Complex'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'Event Director, MusicFest Pro',
    company: 'Entertainment Division',
    rating: 5,
    text: 'Working with Deal Right Entertainment was a game-changer. They brought our music festival to life with incredible production value and seamless execution. The audience response was phenomenal.',
    image: '/api/placeholder/80/80',
    project: 'Music Festival 2024'
  },
  {
    id: 3,
    name: 'Amit Patel',
    position: 'Marketing Director, BrandX',
    company: 'Production Division',
    rating: 5,
    text: 'The documentary they created for our company was absolutely stunning. Their storytelling approach and technical expertise helped us communicate our brand story in a compelling way.',
    image: '/api/placeholder/80/80',
    project: 'Corporate Documentary'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    position: 'Property Manager, UrbanSpace',
    company: 'Realty Division',
    rating: 5,
    text: 'Deal Right Realty delivered a commercial hub that has become the crown jewel of our portfolio. Their innovative design and sustainable approach set new standards in the industry.',
    image: '/api/placeholder/80/80',
    project: 'Commercial Hub'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    position: 'Cultural Director, Arts Council',
    company: 'Entertainment Division',
    rating: 5,
    text: 'The cultural event series they curated was a beautiful celebration of our regional heritage. Their understanding of local culture and ability to create engaging experiences is remarkable.',
    image: '/api/placeholder/80/80',
    project: 'Cultural Event Series'
  },
  {
    id: 6,
    name: 'Deepika Mehta',
    position: 'Brand Manager, ConsumerCo',
    company: 'Production Division',
    rating: 5,
    text: 'Our brand commercial created by Deal Right Productions was a huge success. The creative concept and execution helped us reach new audiences and significantly increased brand awareness.',
    image: '/api/placeholder/80/80',
    project: 'Brand Commercial'
  }
];

const TestimonialsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What Our{' '}
            <motion.span 
              className="text-gradient-gold"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px hsl(43 55% 51% / 0.5)"
              }}
            >
              Clients Say
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hear from the clients who have experienced our commitment to excellence
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction > 0 ? 300 : -300,
                  scale: 0.8
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction > 0 ? -300 : 300,
                  scale: 0.8
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border h-full">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    {/* Quote Icon */}
                    <motion.div
                      className="text-primary mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Quote size={48} />
                    </motion.div>

                    {/* Testimonial Text */}
                    <motion.blockquote
                      className="text-lg md:text-xl text-foreground mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      "{currentTestimonial.text}"
                    </motion.blockquote>

                    {/* Rating */}
                    <motion.div
                      className="flex gap-1 mb-6"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                        >
                          <Star className="w-5 h-5 text-primary fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Client Info */}
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      {/* Avatar */}
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-background font-bold text-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </motion.div>

                      {/* Client Details */}
                      <div>
                        <motion.h4
                          className="font-semibold text-foreground text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          {currentTestimonial.name}
                        </motion.h4>
                        <motion.p
                          className="text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        >
                          {currentTestimonial.position}
                        </motion.p>
                        <motion.p
                          className="text-primary text-sm font-medium"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          {currentTestimonial.company} • {currentTestimonial.project}
                        </motion.p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft 
                size={20} 
                className="text-foreground group-hover:text-primary transition-colors duration-300" 
              />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted hover:bg-primary/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight 
                size={20} 
                className="text-foreground group-hover:text-primary transition-colors duration-300" 
              />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '150+', label: 'Projects Completed' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '10+', label: 'Years Experience' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
