import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NFTCard from './NFTCard';
import { useWallet } from '@/hooks/useWallet';
import { useQuery } from '@tanstack/react-query';
import { NFT } from '@shared/schema';
import { Search } from 'lucide-react';

const NFTGallery: React.FC = () => {
  const { account, isConnected, connectWallet } = useWallet();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: nfts, isLoading, error } = useQuery<NFT[]>({
    queryKey: ['/api/nfts', account],
    enabled: !!account,
    staleTime: 60 * 1000, // 1 minute
  });

  const filteredNFTs = nfts
    ? nfts.filter(nft => {
        if (filter === 'active' && nft.status !== 'active') return false;
        if (filter === 'completed' && nft.status !== 'completed') return false;
        
        // Search filtering would be more complex in a real app
        if (searchQuery && !nft.missionId.toString().includes(searchQuery)) {
          return false;
        }
        
        return true;
      })
    : [];

  return (
    <section id="tokens" className="bg-[#1e1e2f] py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">Mission Shares (NFTs)</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse and manage your mission share NFTs. Each token represents ownership in a specific space mission.
          </p>
        </div>
        
        {!isConnected ? (
          // Wallet Connect Prompt
          <div className="bg-[#0c1137] rounded-xl p-8 text-center mb-12 border border-[#6b46c1] shadow-[0_0_15px_rgba(106,70,193,0.3)]">
            <div className="text-5xl text-[#ff4d8c] mb-4">
              <i className="fas fa-wallet"></i>
            </div>
            <h3 className="font-space font-bold text-2xl mb-3">Connect Your Wallet</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Connect your wallet to view your mission share NFTs and $SPACE token balance.
            </p>
            <Button variant="cosmic" className="glow-hover" onClick={connectWallet}>
              Connect Wallet
            </Button>
          </div>
        ) : (
          // NFT Gallery
          <div>
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="mb-4 md:mb-0">
                <div className="flex space-x-2">
                  <Button 
                    variant={filter === 'all' ? 'cosmic' : 'outline'}
                    onClick={() => setFilter('all')}
                    className={filter !== 'all' ? 'bg-[#2d2d44] hover:bg-[#3a3a55] border-none' : ''}
                  >
                    All NFTs
                  </Button>
                  <Button 
                    variant={filter === 'active' ? 'cosmic' : 'outline'}
                    onClick={() => setFilter('active')}
                    className={filter !== 'active' ? 'bg-[#2d2d44] hover:bg-[#3a3a55] border-none' : ''}
                  >
                    Active Missions
                  </Button>
                  <Button 
                    variant={filter === 'completed' ? 'cosmic' : 'outline'}
                    onClick={() => setFilter('completed')}
                    className={filter !== 'completed' ? 'bg-[#2d2d44] hover:bg-[#3a3a55] border-none' : ''}
                  >
                    Completed
                  </Button>
                </div>
              </div>
              
              <div className="relative w-full md:w-64">
                <Input
                  type="text"
                  placeholder="Search your NFTs..."
                  className="w-full px-4 py-2 bg-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b46c1] transition-all border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6b46c1]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-400">
                <p>Error loading NFTs. Please try again later.</p>
              </div>
            ) : (
              <>
                {filteredNFTs.length > 0 ? (
                  // NFT Grid 
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredNFTs.map((nft) => (
                      <NFTCard key={nft.id} nft={nft} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-[#0c1137] rounded-xl border border-[#101744]">
                    <div className="text-5xl text-[#ff4d8c] mb-4">
                      <i className="fas fa-image"></i>
                    </div>
                    <h3 className="font-space font-bold text-2xl mb-3">No NFTs Found</h3>
                    <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                      You don't own any mission share NFTs yet. Invest in a mission to get started!
                    </p>
                    <Button variant="cosmic" className="glow-hover">
                      <a href="#missions">Explore Missions</a>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NFTGallery;
