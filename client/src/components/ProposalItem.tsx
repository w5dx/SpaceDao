import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Proposal } from '@shared/schema';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { voteOnProposal } from '@/lib/web3';
import { queryClient } from '@/lib/queryClient';
import { formatNumber } from '@/lib/web3';

interface ProposalItemProps {
  proposal: Proposal;
}

const ProposalItem: React.FC<ProposalItemProps> = ({ proposal }) => {
  const [isVoting, setIsVoting] = useState<string | null>(null);
  const { account, isConnected, spaceBalance } = useWallet();
  const { toast } = useToast();

  const totalVotes = Number(proposal.yesVotes) + Number(proposal.noVotes);
  const yesPercentage = totalVotes > 0 
    ? (Number(proposal.yesVotes) / totalVotes) * 100 
    : 0;
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const proposalDate = new Date(date);
    const diffTime = proposalDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    
    if (diffDays <= 0) return 'Ended';
    if (diffDays === 1) return 'Ends tomorrow';
    return `Ends in ${diffDays} days`;
  };

  const getStatusBadge = () => {
    switch(proposal.status) {
      case 'voting':
        return (
          <span className="ml-3 bg-green-600 bg-opacity-20 text-green-400 text-xs rounded-full px-3 py-1">
            Voting Active
          </span>
        );
      case 'pending':
        return (
          <span className="ml-3 bg-yellow-600 bg-opacity-20 text-yellow-400 text-xs rounded-full px-3 py-1">
            Quorum Needed
          </span>
        );
      case 'approved':
        return (
          <span className="ml-3 bg-blue-600 bg-opacity-20 text-blue-400 text-xs rounded-full px-3 py-1">
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="ml-3 bg-red-600 bg-opacity-20 text-red-400 text-xs rounded-full px-3 py-1">
            Rejected
          </span>
        );
      case 'executed':
        return (
          <span className="ml-3 bg-purple-600 bg-opacity-20 text-purple-400 text-xs rounded-full px-3 py-1">
            Executed
          </span>
        );
      default:
        return null;
    }
  };

  const handleVote = async (vote: 'yes' | 'no') => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to vote on proposals.",
        variant: "destructive",
      });
      return;
    }
    
    if (spaceBalance <= 0) {
      toast({
        title: "No $SPACE Tokens",
        description: "You need $SPACE tokens to vote on proposals.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsVoting(vote);
      await voteOnProposal(proposal.id, vote, spaceBalance);
      
      toast({
        title: "Vote Submitted",
        description: `Your vote of ${vote.toUpperCase()} has been recorded.`,
      });
      
      // Invalidate the proposals query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['/api/proposals'] });
    } catch (error) {
      console.error("Voting error:", error);
      toast({
        title: "Vote Failed",
        description: "Failed to submit your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(null);
    }
  };

  return (
    <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744] hover:border-[#6b46c1] transition-all">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <span className="font-space font-bold text-xl">
              PROP-{String(proposal.id).padStart(3, '0')}: {proposal.title}
            </span>
            {getStatusBadge()}
          </div>
          <p className="text-gray-300 text-sm mb-3">
            {proposal.description}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <img 
                src={`https://i.pravatar.cc/40?img=${proposal.id}`} 
                alt="Proposal creator" 
                className="w-6 h-6 rounded-full mr-2" 
              />
              <span className="text-gray-400">{proposal.proposer}</span>
            </div>
            <div className="text-gray-400">
              <i className="far fa-clock mr-1"></i> {formatDate(proposal.endTime)}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end">
          <div className="bg-[#2d2d44] rounded-lg p-4 mb-4 md:w-64">
            <div className="flex justify-between mb-2">
              <span>Current Votes</span>
              <span className="font-medium text-[#ff4d8c]">
                {yesPercentage.toFixed(1)}% Yes
              </span>
            </div>
            <div className="h-2 bg-[#1e1e2f] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${yesPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatNumber(proposal.yesVotes)} $SPACE (Yes)</span>
              <span>{formatNumber(proposal.noVotes)} $SPACE (No)</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              className="px-5 py-2 bg-green-600 rounded-lg font-medium hover:bg-green-700 transition-all"
              onClick={() => handleVote('yes')}
              disabled={isVoting !== null || proposal.status !== 'voting'}
            >
              {isVoting === 'yes' ? (
                <span className="animate-spin mr-1">⟳</span>
              ) : null}
              Vote Yes
            </Button>
            <Button 
              className="px-5 py-2 bg-red-600 rounded-lg font-medium hover:bg-red-700 transition-all"
              onClick={() => handleVote('no')}
              disabled={isVoting !== null || proposal.status !== 'voting'}
            >
              {isVoting === 'no' ? (
                <span className="animate-spin mr-1">⟳</span>
              ) : null}
              Vote No
            </Button>
            <Button 
              variant="outline"
              className="px-3 py-2 bg-[#2d2d44] rounded-lg font-medium hover:bg-[#3a3a55] transition-all border-none"
            >
              <i className="fas fa-info-circle"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalItem;
