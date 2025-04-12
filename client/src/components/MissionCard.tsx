import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mission } from '@shared/schema';
import { formatCurrency, formatPercentage } from '@/lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { investInMission } from '@/lib/web3';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const fundingPercentage = 
    Number(mission.currentFunding) / Number(mission.targetFunding) * 100;
  
  const handleInvest = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to invest in missions.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsInvesting(true);
      await investInMission(mission.id, 1); // Invest in 1 share as an example
      
      toast({
        title: "Investment Successful",
        description: `You've successfully invested in ${mission.title}.`,
      });
    } catch (error) {
      console.error("Investment error:", error);
      toast({
        title: "Investment Failed",
        description: "Failed to invest in mission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0c1137] to-[#1e1e2f] rounded-xl overflow-hidden border border-[#101744] hover:border-[#6b46c1] transition-all shadow-[0_0_15px_rgba(106,70,193,0.3)] hover:shadow-[0_0_20px_rgba(255,77,140,0.4)]">
      <div className="h-48 relative">
        <img 
          src={mission.imageUrl} 
          alt={mission.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 right-3 bg-[#6b46c1] rounded-full px-3 py-1 text-xs font-medium">
          {mission.status}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-space font-bold text-xl mb-2">{mission.title}</h3>
          <div className="bg-[#2d2d44] rounded-lg px-2 py-1 text-sm font-medium text-[#ff4d8c]">
            ERC-1155
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">
          {mission.description}
        </p>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Funding Progress</span>
            <span className="font-medium">
              {formatPercentage(fundingPercentage)} <span className="text-gray-400">({formatCurrency(mission.currentFunding)}/{formatCurrency(mission.targetFunding)})</span>
            </span>
          </div>
          <div className="h-2 bg-[#2d2d44] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6b46c1] to-[#ff4d8c] rounded-full" 
              style={{ width: `${fundingPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Mission details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-xs">Mission Timeframe</p>
            <p className="font-medium">{mission.startDate}-{mission.endDate}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Share Price</p>
            <p className="font-medium">{mission.sharePrice} ETH</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Shares Available</p>
            <p className="font-medium">{mission.availableShares} / {mission.totalShares}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Revenue Share</p>
            <p className="font-medium">{mission.revenueShare}%</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-3">
          <Button 
            variant="cosmic" 
            className="flex-1" 
            onClick={handleInvest}
            disabled={isInvesting}
          >
            {isInvesting ? (
              <>
                <span className="animate-spin mr-2">⟳</span> Investing...
              </>
            ) : 'Invest'}
          </Button>
          <Button 
            variant="outline" 
            className="px-4 py-2 bg-[#2d2d44] rounded-lg font-medium hover:bg-[#3a3a55] transition-all border-none"
            onClick={() => setIsDetailOpen(true)}
          >
            Details
          </Button>
        </div>
      </div>
      
      {/* Details Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-[#1e1e2f] border-[#4b3295] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-space">{mission.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <img 
              src={mission.imageUrl} 
              alt={mission.title} 
              className="w-full h-60 object-cover rounded-lg mb-4" 
            />
            
            <h4 className="font-semibold text-lg mb-2">Mission Overview</h4>
            <p className="text-gray-300 mb-4">{mission.description}</p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Mission Details</h4>
                <div className="space-y-2 bg-[#2d2d44] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span>{mission.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeframe</span>
                    <span>{mission.startDate}-{mission.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Funding</span>
                    <span>{formatCurrency(mission.targetFunding)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Funding</span>
                    <span>{formatCurrency(mission.currentFunding)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Investment Details</h4>
                <div className="space-y-2 bg-[#2d2d44] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Share Price</span>
                    <span>{mission.sharePrice} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Shares</span>
                    <span>{mission.totalShares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Shares</span>
                    <span>{mission.availableShares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue Share</span>
                    <span>{mission.revenueShare}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="cosmic" 
                onClick={handleInvest}
                disabled={isInvesting}
              >
                {isInvesting ? 'Processing...' : 'Invest Now'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsDetailOpen(false)}
                className="bg-[#2d2d44] hover:bg-[#3a3a55] border-none"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionCard;
