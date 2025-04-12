import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatAddress, formatBalance } from '@/lib/web3';
import { Loader2, Wallet } from 'lucide-react';

export const WalletConnector: React.FC = () => {
  const { 
    account, 
    balance, 
    isConnecting, 
    isConnected, 
    connectWallet, 
    disconnectWallet
  } = useWallet();

  const handleConnect = async () => {
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (isConnecting) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="cosmic" className="flex items-center">
            <span>{formatAddress(account)}</span>
            <Wallet className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#1e1e2f] border-[#4b3295] text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#3a3a55]" />
          <DropdownMenuItem className="flex justify-between cursor-default">
            <span>Balance</span>
            <span>{balance ? `${formatBalance(balance)} ETH` : '0 ETH'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between cursor-default">
            <span>$SPACE</span>
            <span>25,340</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#3a3a55]" />
          <DropdownMenuItem 
            className="text-red-400 focus:text-red-400 cursor-pointer"
            onClick={handleDisconnect}
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      variant="cosmic" 
      className="flex items-center glow-hover"
      onClick={handleConnect}
    >
      <span>Connect Wallet</span>
      <Wallet className="ml-2 h-4 w-4" />
    </Button>
  );
};
