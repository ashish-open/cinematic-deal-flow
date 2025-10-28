import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Building2, Music, Film, Target, Eye, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { margin: '-100px' });

  const divisionsRef = useRef(null);
  const divisionsInView = useInView(divisionsRef, { margin: '-100px' });

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { margin: '-100px' });

  const divisions = [
    {
      icon: Building2,
      title: 'Realty',
      description: 'Comprehensive real estate services including property development, sales, and consultation.',
    },
    {
      icon: Music,
      title: 'Entertainments',
      description: 'Event management, artist coordination, and entertainment production services.',
    },
    {
      icon: Film,
      title: 'Productions',
      description: 'Film production, content creation, and multimedia storytelling solutions.',
    },
  ];

  const coreValues = [
    { title: 'Integrity', description: 'Honesty and ethical conduct in every action.' },
    { title: 'Innovation', description: 'Creative thinking to deliver cutting-edge solutions.' },
    { title: 'Quality', description: 'Excellence in everything we create and deliver.' },
    { title: 'Commitment', description: 'Dedication to fulfilling our promises.' },
    { title: 'Collaboration', description: 'Teamwork and partnership for mutual success.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-dark" />
        
        <div className="absolute inset-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6"
          >
            Built on <span className="text-gradient-gold">Vision.</span>
            <br />
            Grounded in <span className="text-gradient-gold">Values.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the story behind Deal Right's journey since 2015
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-8 text-center">
              Our <span className="text-gradient-gold">Story</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <p>
                Deal Right was founded in 2015 with a simple yet powerful principle: to do business
                the right way. What began as a vision to create meaningful impact across multiple
                industries has evolved into a multi-venture enterprise that operates with unwavering
                integrity and excellence.
              </p>
              <p>
                Our journey spans three distinct yet interconnected verticals — Realty,
                Entertainments, and Productions. Each division represents our commitment to quality,
                innovation, and creating value for our clients and communities.
              </p>
              <p>
                Through Deal Right Realty, we transform landscapes and build dreams. Our
                Entertainment division creates experiences that connect people and cultures. And
                through Productions, we craft visual stories that inspire and engage audiences
                worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divisions Snapshot */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={divisionsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={divisionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-12 text-center">
              Our <span className="text-gradient-gold">Divisions</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {divisions.map((division, index) => (
                <motion.div
                  key={division.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={divisionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-card border-border h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                        <division.icon className="text-primary" size={32} />
                      </div>
                      <h3 className="text-2xl font-playfair font-semibold mb-4">{division.title}</h3>
                      <p className="text-muted-foreground">{division.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ margin: '-100px' }}
              className="bg-card p-8 rounded-lg border border-border"
            >
              <div className="flex items-center mb-6">
                <Target className="text-primary mr-4" size={32} />
                <h3 className="text-2xl font-playfair font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional value across Realty, Entertainments, and Productions by
                upholding the highest standards of quality, integrity, and innovation in every
                project we undertake.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ margin: '-100px' }}
              className="bg-card p-8 rounded-lg border border-border"
            >
              <div className="flex items-center mb-6">
                <Eye className="text-primary mr-4" size={32} />
                <h3 className="text-2xl font-playfair font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be a trusted, forward-thinking enterprise recognized for integrity, creativity,
                and impact — setting benchmarks across industries and creating lasting value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <Award className="text-primary mx-auto mb-4" size={48} />
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">
                Our Core <span className="text-gradient-gold">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision and action at Deal Right
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={valuesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg border border-border text-center hover:border-primary transition-smooth"
                >
                  <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
