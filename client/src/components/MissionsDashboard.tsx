import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MissionCard from './MissionCard';
import { useQuery } from '@tanstack/react-query';
import { Mission } from '@shared/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createProposal } from '@/lib/web3';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import CreateProposalModal from './CreateProposalModal';

const MissionsDashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const { account, isConnected } = useWallet();
  const { toast } = useToast();

  const { data: missions, isLoading, error } = useQuery<Mission[]>({
    queryKey: ['/api/missions'],
    staleTime: 60 * 1000, // 1 minute
  });

  const handleCreateProposal = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to create a proposal.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreateModalOpen(true);
  };

  const filteredMissions = missions
    ? filter === 'my' && account
      ? missions.filter(mission => true) // In a real app, filter by user's investments
      : missions
    : [];

  return (
    <section id="missions" className="bg-[#1e1e2f] py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-2">Active Missions</h2>
            <p className="text-gray-300">Support and invest in ongoing space exploration proposals</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'cosmic' : 'outline'} 
              onClick={() => setFilter('all')}
              className="bg-[#2d2d44] hover:bg-[#3a3a55] transition-all border-none"
            >
              All Missions
            </Button>
            <Button 
              variant={filter === 'my' ? 'cosmic' : 'outline'} 
              onClick={() => setFilter('my')}
              className="bg-[#2d2d44] hover:bg-[#3a3a55] transition-all border-none"
            >
              My Investments
            </Button>
            <Button 
              variant="cosmic" 
              className="glow-hover"
              onClick={handleCreateProposal}
            >
              <i className="fas fa-plus mr-1"></i> Create Proposal
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b46c1]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">
            <p>Error loading missions. Please try again later.</p>
          </div>
        ) : (
          <>
            {/* Mission Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
            
            {filteredMissions.length === 0 && (
              <div className="text-center py-10">
                <p>No missions available at the moment.</p>
              </div>
            )}
            
            {filteredMissions.length > 0 && (
              <div className="mt-10 text-center">
                <Button variant="space">
                  View All Missions <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <CreateProposalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </section>
  );
};

export default MissionsDashboard;
