import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutOverview from '@/components/home/AboutOverview';
import DivisionsShowcase from '@/components/home/DivisionsShowcase';
import VisionSection from '@/components/home/VisionSection';
import ContactTeaser from '@/components/home/ContactTeaser';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutOverview />
      <DivisionsShowcase />
      <VisionSection />
      <ContactTeaser />
      <Footer />
    </div>
  );
};

export default Index;
