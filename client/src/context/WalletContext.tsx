import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

// Type for provider - adjusting for ethers v6
type Provider = any; // Simplified for demo purposes

interface WalletContextType {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  spaceBalance: number;
  isConnecting: boolean;
  isConnected: boolean;
  provider: Provider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create context with default values
export const WalletContext = createContext<WalletContextType>({
  account: null,
  chainId: null,
  balance: null,
  spaceBalance: 0,
  isConnecting: false,
  isConnected: false,
  provider: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [spaceBalance, setSpaceBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  
  const { toast } = useToast();

  // Initialize wallet from localStorage on mount
  useEffect(() => {
    const savedAccount = localStorage.getItem('walletAccount');
    if (savedAccount) {
      setAccount(savedAccount);
      setIsConnected(true);
      setChainId(1); // Ethereum Mainnet
      setBalance('10.0'); // Mock ETH balance
      setSpaceBalance(25340); // Mock space token balance
    }
  }, []);

  // Connect wallet - with mock implementation for demo
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      // Mock wallet connection for demo
      // In a real app, this would connect to MetaMask or another wallet
      const mockAccount = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const mockChainId = 1; // Ethereum Mainnet
      const mockBalance = '10.0'; // 10 ETH
      
      // Simulate a slight delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccount(mockAccount);
      setChainId(mockChainId);
      setBalance(mockBalance);
      setIsConnected(true);
      
      // Mock space token balance
      setSpaceBalance(25340);

      // Save to localStorage
      localStorage.setItem('walletAccount', mockAccount);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected (Demo mode).",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setBalance(null);
    setProvider(null);
    setIsConnected(false);
    setSpaceBalance(0);
    
    // Clear from localStorage
    localStorage.removeItem('walletAccount');
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        balance,
        spaceBalance,
        isConnecting,
        isConnected,
        provider,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
