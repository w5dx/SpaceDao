import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NFT } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Mission } from '@shared/schema';
import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';

interface NFTCardProps {
  nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Fetch mission data for this NFT
  const { data: mission } = useQuery<Mission>({
    queryKey: [`/api/missions/${nft.missionId}`],
    staleTime: 60 * 1000, // 1 minute
  });

  const getStatusColor = () => {
    switch(nft.status) {
      case 'active':
        return 'bg-green-600 bg-opacity-20 text-green-400';
      case 'pending':
        return 'bg-yellow-600 bg-opacity-20 text-yellow-400';
      case 'completed':
        return 'bg-blue-600 bg-opacity-20 text-blue-400';
      default:
        return 'bg-gray-600 bg-opacity-20 text-gray-400';
    }
  };

  // Format acquisition date
  const formattedDate = nft.acquisitionDate 
    ? new Date(nft.acquisitionDate).toISOString().split('T')[0]
    : 'Unknown';

  return (
    <div className="bg-[#1e1e2f] rounded-xl overflow-hidden border border-[#101744] hover:border-[#6b46c1] transition-all shadow-[0_0_15px_rgba(106,70,193,0.3)] hover:shadow-[0_0_20px_rgba(255,77,140,0.4)]">
      <div className="relative">
        <img 
          src={mission?.imageUrl || 'https://images.unsplash.com/photo-1614726365952-510103b1bbb4'} 
          alt={`Share #${nft.shareId}`} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#1e1e2f] to-transparent"></div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#6b46c1] bg-opacity-80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
            {mission?.title || `Mission ${nft.missionId}`}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-space font-medium text-lg">Share #{nft.shareId}</h4>
          <div className={`${getStatusColor()} text-xs rounded-full px-2 py-0.5`}>
            {nft.status}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ownership</span>
            <span>{nft.ownershipPercentage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Acquired</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Revenue Share</span>
            <span>{nft.revenueShare}%</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="cosmic" 
            className="flex-1 text-sm"
            onClick={() => setIsDetailOpen(true)}
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-[#2d2d44] hover:bg-[#3a3a55] transition-all border-none"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* NFT Details Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-[#1e1e2f] border-[#4b3295] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-space">
              {mission?.title || `Mission ${nft.missionId}`} - Share #{nft.shareId}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <img 
              src={mission?.imageUrl || 'https://images.unsplash.com/photo-1614726365952-510103b1bbb4'} 
              alt={`Share #${nft.shareId}`} 
              className="w-full h-60 object-cover rounded-lg mb-4" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Share Details</h4>
                <div className="space-y-2 bg-[#2d2d44] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="capitalize">{nft.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span>{nft.ownerAddress.substring(0, 6)}...{nft.ownerAddress.substring(nft.ownerAddress.length - 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Share ID</span>
                    <span>#{nft.shareId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Acquisition Date</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Ownership Details</h4>
                <div className="space-y-2 bg-[#2d2d44] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ownership Percentage</span>
                    <span>{nft.ownershipPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue Share</span>
                    <span>{nft.revenueShare}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mission ID</span>
                    <span>#{nft.missionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Standard</span>
                    <span>ERC-1155</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#2d2d44] p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-lg mb-2">Mission Description</h4>
              <p className="text-gray-300 text-sm">
                {mission?.description || 'Loading mission details...'}
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                className="bg-[#2d2d44] hover:bg-[#3a3a55] border-none"
                onClick={() => window.open(`https://etherscan.io/token/${nft.missionId}`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Etherscan
              </Button>
              <Button 
                variant="cosmic" 
                onClick={() => setIsDetailOpen(false)}
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

export default NFTCard;
