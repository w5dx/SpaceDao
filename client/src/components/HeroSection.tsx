import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { formatNumber } from '@/lib/web3';
import { DEFAULT_STATS } from '@/lib/constants';

const HeroSection: React.FC = () => {
  const [countdown, setCountdown] = useState<string>('00:00:00');
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['/api/stats'],
    staleTime: 60 * 1000, // 1 minute
  });

  // Use default stats if data is loading or there's an error
  const displayStats = stats || DEFAULT_STATS;

  // Calculate countdown to next launch
  useEffect(() => {
    // Set a future target date (24 hours from now for demo purposes)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);
    
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();
      
      if (timeDifference <= 0) {
        // If launch time has passed, reset the countdown
        setCountdown('00:00:00');
        return;
      }
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
      // Format the countdown
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
      
      setCountdown(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    };
    
    // Initialize the countdown
    updateCountdown();
    
    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="container mx-auto px-4 pt-8 pb-16 relative z-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h2 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Crowdfund The <span className="text-[#ff4d8c]">Future</span> of Space Exploration
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Join our DAO to fund, govern, and own shares in revolutionary space missions. Together, we'll reach for the stars.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="gradient" size="lg" className="shadow-lg">
              Explore Missions
            </Button>
            <Button variant="space" size="lg">
              Learn About DAO
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap mt-10 gap-6">
            <div className="bg-[#1e1e2f] rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-gray-400 text-sm">Total Value Locked</p>
              <p className="font-space font-bold text-2xl text-white">
                {displayStats.totalValueLocked || '$0'}
              </p>
            </div>
            <div className="bg-[#1e1e2f] rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-gray-400 text-sm">Active Missions</p>
              <p className="font-space font-bold text-2xl text-white">
                {displayStats.activeMissions || 0}
              </p>
            </div>
            <div className="bg-[#1e1e2f] rounded-lg p-4 flex-1 min-w-[140px]">
              <p className="text-gray-400 text-sm">DAO Members</p>
              <p className="font-space font-bold text-2xl text-white">
                {typeof displayStats.daoMembers === 'number' 
                  ? formatNumber(displayStats.daoMembers) 
                  : displayStats.daoMembers || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-pulse-slow">
            <img 
              src="https://images.unsplash.com/photo-1614728263952-84ea256f9679" 
              alt="Space mission concept art" 
              className="rounded-full object-cover w-full h-full shadow-[0_0_15px_rgba(106,70,193,0.3)]" 
            />
            <div className="absolute -bottom-4 -right-4 bg-[#1e1e2f] rounded-lg p-3 border border-[#6b46c1]">
              <p className="text-sm text-gray-300">Next launch in</p>
              <p className="font-space font-bold text-xl">
                {countdown}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
