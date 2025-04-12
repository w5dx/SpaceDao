import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e1e2f] py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-[#ff4d8c] text-2xl">
                <Rocket />
              </div>
              <h2 className="font-space font-bold text-xl">SpaceDAO</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Decentralized funding for the next generation of space exploration missions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-discord text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-medium text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#missions" className="text-gray-400 hover:text-white transition-colors">Missions</a></li>
              <li><a href="#governance" className="text-gray-400 hover:text-white transition-colors">Governance</a></li>
              <li><a href="#tokens" className="text-gray-400 hover:text-white transition-colors">NFT Shares</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">$SPACE Token</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub Repo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Join The Mission</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on missions, governance, and space innovations.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-[#2d2d44] rounded-l-lg focus:outline-none border-0"
              />
              <Button className="px-4 py-2 bg-[#6b46c1] rounded-r-lg font-medium hover:bg-[#4b3295] transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#2d2d44] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SpaceDAO. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
