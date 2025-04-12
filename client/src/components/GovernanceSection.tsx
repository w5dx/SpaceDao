import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProposalItem from './ProposalItem';
import { useQuery } from '@tanstack/react-query';
import { Proposal } from '@shared/schema';
import { useWallet } from '@/hooks/useWallet';
import CreateProposalModal from './CreateProposalModal';
import { useToast } from '@/hooks/use-toast';

const GovernanceSection: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { account, isConnected, spaceBalance } = useWallet();
  const { toast } = useToast();
  
  const { data: proposals, isLoading, error } = useQuery<Proposal[]>({
    queryKey: ['/api/proposals'],
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
    
    // Check if user has enough tokens
    if (spaceBalance < 10000) {
      toast({
        title: "Insufficient $SPACE Tokens",
        description: "You need at least 10,000 $SPACE tokens to create a proposal.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreateModalOpen(true);
  };

  return (
    <section id="governance" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">DAO Governance</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Shape the future of space exploration through our decentralized governance system. Submit proposals, vote on missions, and make key decisions together.
          </p>
        </div>
        
        {/* Active Proposals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-space font-bold text-2xl">Active Proposals</h3>
            <Button 
              variant="cosmic" 
              className="glow-hover"
              onClick={handleCreateProposal}
            >
              <i className="fas fa-plus mr-1"></i> New Proposal
            </Button>
          </div>
          
          {/* Proposals List */}
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b46c1]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-400">
              <p>Error loading proposals. Please try again later.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {proposals && proposals.map((proposal) => (
                <ProposalItem key={proposal.id} proposal={proposal} />
              ))}
              
              {(!proposals || proposals.length === 0) && (
                <div className="text-center py-10 bg-[#1e1e2f] rounded-xl p-6">
                  <p>No active proposals at the moment. Create one to get started!</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Voting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744]">
            <div className="text-4xl text-[#ff4d8c] mb-2">
              <i className="fas fa-vote-yea"></i>
            </div>
            <h3 className="font-space font-bold text-xl mb-2">Voting Power</h3>
            <p className="text-gray-300 mb-4">
              Your voting power is determined by how many $SPACE tokens you hold.
            </p>
            <div className="bg-[#2d2d44] rounded-lg p-4">
              <p className="text-gray-400 text-sm">Your Voting Power</p>
              <p className="font-space font-bold text-2xl">
                {isConnected ? `${spaceBalance.toLocaleString()} $SPACE` : '0 $SPACE'}
              </p>
              {!isConnected && <p className="text-gray-400 text-xs">Connect wallet to view</p>}
            </div>
          </div>
          
          <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744]">
            <div className="text-4xl text-[#ff4d8c] mb-2">
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3 className="font-space font-bold text-xl mb-2">Governance Stats</h3>
            <p className="text-gray-300 mb-4">
              Overview of DAO governance activity and participation metrics.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Active Proposals</span>
                <span className="font-medium">{proposals?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Executed This Month</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Participation</span>
                <span className="font-medium">48%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quorum Requirement</span>
                <span className="font-medium">30%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744]">
            <div className="text-4xl text-[#ff4d8c] mb-2">
              <i className="fas fa-scroll"></i>
            </div>
            <h3 className="font-space font-bold text-xl mb-2">Create a Proposal</h3>
            <p className="text-gray-300 mb-4">
              Any member with at least 10,000 $SPACE tokens can submit a new proposal.
            </p>
            <div className="space-y-4">
              <div className="bg-[#2d2d44] rounded-lg p-4">
                <p className="text-gray-400 text-sm">Required $SPACE</p>
                <p className="font-space font-bold text-xl">10,000</p>
              </div>
              <Button 
                variant="cosmic" 
                className="w-full glow-hover"
                onClick={handleCreateProposal}
              >
                Create New Proposal
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <CreateProposalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </section>
  );
};

export default GovernanceSection;
