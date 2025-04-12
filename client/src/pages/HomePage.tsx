import React, { useEffect } from 'react';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import HeroSection from '@/components/HeroSection';
import MissionsDashboard from '@/components/MissionsDashboard';
import GovernanceSection from '@/components/GovernanceSection';
import NFTGallery from '@/components/NFTGallery';
import TokenSection from '@/components/TokenSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const HomePage: React.FC = () => {
  // Scroll to section when navigating by anchor
  useEffect(() => {
    const scrollToAnchor = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80; // Height of your header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Call on component mount
    scrollToAnchor();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', scrollToAnchor);
    
    return () => {
      window.removeEventListener('hashchange', scrollToAnchor);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>SpaceDAO - Crowdfunded Space Missions</title>
        <meta name="description" content="Join our DAO to fund, govern, and own shares in revolutionary space missions. Together, we'll reach for the stars." />
      </Helmet>
      
      {/* Background with stars */}
      <StarBackground />
      
      {/* Main content */}
      <div className="relative">
        <Header />
        <main>
          <HeroSection />
          <MissionsDashboard />
          <GovernanceSection />
          <NFTGallery />
          <TokenSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
