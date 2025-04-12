import React, { useState } from 'react';
import { Button } from './ui/button';
import { WalletConnector } from './WalletConnector';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetClose 
} from '@/components/ui/sheet';
import { Link } from 'wouter';
import { Rocket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-10">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-[#ff4d8c] text-3xl">
            <Rocket />
          </div>
          <h1 className="font-space font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#6b46c1] to-[#ff4d8c]">
            SpaceDAO
          </h1>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#missions" className="font-medium hover:text-[#ff4d8c] transition-colors">
            Missions
          </a>
          <a href="#governance" className="font-medium hover:text-[#ff4d8c] transition-colors">
            Governance
          </a>
          <a href="#tokens" className="font-medium hover:text-[#ff4d8c] transition-colors">
            $SPACE Tokens
          </a>
          <a href="#about" className="font-medium hover:text-[#ff4d8c] transition-colors">
            About
          </a>
        </div>
        
        {/* Wallet Connection Button */}
        <div className="flex items-center space-x-2">
          <WalletConnector />
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <i className="fas fa-bars text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px] bg-[#1e1e2f] border-[#4b3295]">
              <div className="flex flex-col h-full py-6">
                <div className="flex items-center mb-8">
                  <Rocket className="h-6 w-6 text-[#ff4d8c] mr-2" />
                  <h2 className="font-space font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#6b46c1] to-[#ff4d8c]">
                    SpaceDAO
                  </h2>
                </div>
                
                <nav className="space-y-6 flex flex-col">
                  <SheetClose asChild>
                    <a href="#missions" className="flex items-center px-2 py-2 hover:bg-[#2d2d44] rounded-md transition-colors">
                      <i className="fas fa-rocket mr-3 text-[#ff4d8c]"></i>
                      <span>Missions</span>
                    </a>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <a href="#governance" className="flex items-center px-2 py-2 hover:bg-[#2d2d44] rounded-md transition-colors">
                      <i className="fas fa-vote-yea mr-3 text-[#ff4d8c]"></i>
                      <span>Governance</span>
                    </a>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <a href="#tokens" className="flex items-center px-2 py-2 hover:bg-[#2d2d44] rounded-md transition-colors">
                      <i className="fas fa-coins mr-3 text-[#ff4d8c]"></i>
                      <span>$SPACE Tokens</span>
                    </a>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <a href="#about" className="flex items-center px-2 py-2 hover:bg-[#2d2d44] rounded-md transition-colors">
                      <i className="fas fa-info-circle mr-3 text-[#ff4d8c]"></i>
                      <span>About</span>
                    </a>
                  </SheetClose>
                </nav>
                
                <div className="mt-auto">
                  <div className="bg-[#0c1137] rounded-lg p-4">
                    <p className="text-sm mb-2">Join our community</p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-discord text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-twitter text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-github text-xl"></i>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <i className="fab fa-telegram text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
