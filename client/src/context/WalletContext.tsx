import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  spaceBalance: number;
  isConnecting: boolean;
  isConnected: boolean;
  provider: ethers.providers.Web3Provider | null;
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
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  
  const { toast } = useToast();

  // Initialize wallet from localStorage on mount
  useEffect(() => {
    const savedAccount = localStorage.getItem('walletAccount');
    if (savedAccount) {
      setAccount(savedAccount);
      setIsConnected(true);
      
      // Mock space token balance for demonstration
      setSpaceBalance(25340);
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);

      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const account = accounts[0];
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(account);
      
      setAccount(account);
      setChainId(network.chainId);
      setBalance(ethers.utils.formatEther(balance));
      setProvider(provider);
      setIsConnected(true);
      
      // Mock space token balance for demonstration
      setSpaceBalance(25340);

      // Save to localStorage
      localStorage.setItem('walletAccount', account);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected.",
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

  // Handle account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else if (accounts[0] !== account) {
          // Account changed
          setAccount(accounts[0]);
          localStorage.setItem('walletAccount', accounts[0]);
          
          toast({
            title: "Account changed",
            description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`,
          });
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16));
        
        toast({
          title: "Network changed",
          description: "The blockchain network has been changed.",
        });
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("disconnect", handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
          window.ethereum.removeListener("chainChanged", handleChainChanged);
          window.ethereum.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [account]);

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
