import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

const TokenSection: React.FC = () => {
  const { account, isConnected, spaceBalance, connectWallet } = useWallet();
  const { toast } = useToast();

  const handleBuyTokens = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    toast({
      title: "Feature Coming Soon",
      description: "Token purchase functionality will be available in the next release.",
    });
  };

  const handleStakeTokens = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to stake tokens.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feature Coming Soon",
      description: "Token staking functionality will be available in the next release.",
    });
  };

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-6">$SPACE Token Utility</h2>
            <p className="text-gray-300 mb-8">
              The $SPACE token is the governance and utility token for our Space Missions DAO. Holders can vote on proposals, receive revenue from successful missions, and gain access to special features.
            </p>
            
            <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744] mb-8">
              <h3 className="font-space font-bold text-xl mb-4">Token Economics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="font-medium">10,000,000 $SPACE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="font-medium">4,250,000 $SPACE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Treasury</span>
                  <span className="font-medium">3,500,000 $SPACE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Team & Advisors</span>
                  <span className="font-medium">1,500,000 $SPACE (locked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Community Rewards</span>
                  <span className="font-medium">750,000 $SPACE</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e1e2f] rounded-xl p-6 border border-[#101744]">
              <h3 className="font-space font-bold text-xl mb-4">Your $SPACE Balance</h3>
              <div className="bg-[#2d2d44] rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-sm">Balance</p>
                <p className="font-space font-bold text-2xl">
                  {isConnected ? `${spaceBalance.toLocaleString()} $SPACE` : '0 $SPACE'}
                </p>
                {!isConnected && <p className="text-gray-400 text-xs">Connect wallet to view</p>}
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="cosmic" 
                  className="flex-1 glow-hover"
                  onClick={handleBuyTokens}
                >
                  {isConnected ? 'Buy $SPACE' : 'Connect Wallet'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-[#2d2d44] hover:bg-[#3a3a55] transition-all border-none"
                  onClick={handleStakeTokens}
                  disabled={!isConnected}
                >
                  Stake Tokens
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-[#1e1e2f] rounded-xl p-8 border border-[#101744]">
              <h3 className="font-space font-bold text-2xl mb-6">Token Utility</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="text-3xl text-[#ff4d8c] mr-4">
                    <i className="fas fa-vote-yea"></i>
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-xl mb-2">Governance Voting</h4>
                    <p className="text-gray-300">
                      Use your $SPACE tokens to vote on mission proposals, treasury allocations, and protocol upgrades.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="text-3xl text-[#ff4d8c] mr-4">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-xl mb-2">Revenue Sharing</h4>
                    <p className="text-gray-300">
                      Earn a portion of mission revenues proportional to your $SPACE holdings from successful space missions.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="text-3xl text-[#ff4d8c] mr-4">
                    <i className="fas fa-ticket-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-xl mb-2">Mission Access</h4>
                    <p className="text-gray-300">
                      Token holders get priority access to mission share NFTs before they open to the public.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="text-3xl text-[#ff4d8c] mr-4">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-xl mb-2">Staking Rewards</h4>
                    <p className="text-gray-300">
                      Stake your tokens to earn additional $SPACE and boost your governance power over time.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="text-3xl text-[#ff4d8c] mr-4">
                    <i className="fas fa-satellite"></i>
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-xl mb-2">Mission Creation</h4>
                    <p className="text-gray-300">
                      Holding 100,000+ $SPACE allows you to submit formal mission proposals to the DAO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
