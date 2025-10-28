import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Play, Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'Luxury Residential Complex',
    category: 'Realty',
    location: 'Bangalore, India',
    year: '2023',
    clients: '150+',
    image: '/portfolio-1.jpeg',
    description: 'A premium residential complex featuring modern amenities and sustainable design principles.',
    tags: ['Residential', 'Luxury', 'Sustainable'],
    status: 'Completed',
    featured: true
  },
  {
    id: 2,
    title: 'Music Festival 2024',
    category: 'Entertainment',
    location: 'Mumbai, India',
    year: '2024',
    clients: '50,000+',
    image: '/portfolio-2.jpeg',
    description: 'A three-day music festival featuring international and local artists across multiple genres.',
    tags: ['Music', 'Festival', 'Live Events'],
    status: 'Ongoing',
    featured: true
  },
  {
    id: 3,
    title: 'Corporate Documentary',
    category: 'Production',
    location: 'Chennai, India',
    year: '2024',
    clients: '1',
    image: '/portfolio-3.jpeg',
    description: 'A compelling documentary showcasing the journey of a leading tech company.',
    tags: ['Documentary', 'Corporate', 'Storytelling'],
    status: 'In Production',
    featured: false
  },
  {
    id: 4,
    title: 'Commercial Hub',
    category: 'Realty',
    location: 'Delhi, India',
    year: '2023',
    clients: '200+',
    image: '/portfolio-4.jpeg',
    description: 'A state-of-the-art commercial complex designed for modern businesses.',
    tags: ['Commercial', 'Office Space', 'Modern'],
    status: 'Completed',
    featured: false
  },
  {
    id: 5,
    title: 'Cultural Event Series',
    category: 'Entertainment',
    location: 'Kolkata, India',
    year: '2024',
    clients: '25,000+',
    image: '/portfolio-5.jpeg',
    description: 'A series of cultural events celebrating regional arts and traditions.',
    tags: ['Cultural', 'Arts', 'Regional'],
    status: 'Planning',
    featured: false
  },
  {
    id: 6,
    title: 'Brand Commercial',
    category: 'Production',
    location: 'Hyderabad, India',
    year: '2024',
    clients: '1',
    image: '/portfolio-6.jpeg',
    description: 'A high-impact commercial for a leading consumer brand.',
    tags: ['Commercial', 'Branding', 'Advertising'],
    status: 'Completed',
    featured: false
  }
];

const categories = ['All', 'Realty', 'Entertainment', 'Production'];

const PortfolioShowcase = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]) }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity }}
      >
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
            Our{' '}
            <motion.span 
              className="text-gradient-gold"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px hsl(43 55% 51% / 0.5)"
              }}
            >
              Portfolio
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Showcasing our diverse range of successful projects across all divisions
          </motion.p>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-background shadow-gold'
                    : 'bg-card text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -80, rotateX: -15 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
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
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.05 : 1.1,
                          filter: hoveredProject === project.id ? 'brightness(1.1)' : 'brightness(0.9)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
                        animate={{
                          opacity: hoveredProject === project.id ? 0.8 : 0.3
                        }}
                      />

                    {/* Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    >
                      <motion.button
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-background"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play size={24} />
                      </motion.button>
                    </motion.div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <Badge className="bg-primary text-background">
                          Featured
                        </Badge>
                      </motion.div>
                    )}

                    {/* Status Badge */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <Badge 
                        variant={project.status === 'Completed' ? 'default' : 
                                project.status === 'Ongoing' ? 'secondary' : 'outline'}
                      >
                        {project.status}
                      </Badge>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    {/* Category */}
                    <motion.div
                      className="mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-xl font-playfair font-semibold mb-2 group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p 
                      className="text-muted-foreground text-sm leading-relaxed mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.9 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Project Details */}
                    <motion.div 
                      className="grid grid-cols-2 gap-4 mb-4 text-xs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1.0 }}
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={14} />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={14} />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users size={14} />
                        <span>{project.clients} clients</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <ExternalLink size={14} />
                        <span>View Details</span>
                      </div>
                    </motion.div>

                    {/* Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 1.1 }}
                    >
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-gold text-background font-semibold rounded-lg hover:shadow-gold transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              View All Projects
              <motion.div
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <ExternalLink size={20} />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PortfolioShowcase;
