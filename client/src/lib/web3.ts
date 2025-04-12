import { ethers } from 'ethers';
import { SPACE_TOKEN_ABI, MISSION_SHARES_ABI, DAO_GOVERNANCE_ABI } from './constants';
import { SPACE_TOKEN_ADDRESS, MISSION_SHARES_ADDRESS, DAO_GOVERNANCE_ADDRESS } from './constants';

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found. Please install MetaMask.');
  }
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};

export const getSpaceTokenContract = async (signerOrProvider: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(SPACE_TOKEN_ADDRESS, SPACE_TOKEN_ABI, signerOrProvider);
};

export const getMissionSharesContract = async (signerOrProvider: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(MISSION_SHARES_ADDRESS, MISSION_SHARES_ABI, signerOrProvider);
};

export const getDAOGovernanceContract = async (signerOrProvider: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(DAO_GOVERNANCE_ADDRESS, DAO_GOVERNANCE_ABI, signerOrProvider);
};

export const formatAddress = (address: string | null) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatBalance = (balance: string | null) => {
  if (!balance) return '0';
  return parseFloat(balance).toFixed(4);
};

export const formatNumber = (number: number | string) => {
  return new Intl.NumberFormat().format(Number(number));
};

export const createProposal = async (title: string, description: string, proposer: string) => {
  try {
    const signer = await getSigner();
    const governanceContract = await getDAOGovernanceContract(signer);
    
    // This would be actual contract interaction in production
    // For now, just make an API call to our backend
    const response = await fetch('/api/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        proposer,
        status: 'voting',
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create proposal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating proposal:', error);
    throw error;
  }
};

export const voteOnProposal = async (proposalId: number, vote: 'yes' | 'no', amount: number) => {
  try {
    const signer = await getSigner();
    const governanceContract = await getDAOGovernanceContract(signer);
    
    // This would be actual contract interaction in production
    // For now, just make an API call to our backend
    const response = await fetch(`/api/proposals/${proposalId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vote,
        amount,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to vote on proposal');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error voting on proposal:', error);
    throw error;
  }
};

export const investInMission = async (missionId: number, shares: number) => {
  try {
    const signer = await getSigner();
    const missionSharesContract = await getMissionSharesContract(signer);
    
    // This would be actual contract interaction in production
    // For now, just make a mock implementation
    console.log(`Investing in mission ${missionId}, buying ${shares} shares`);
    
    return true;
  } catch (error) {
    console.error('Error investing in mission:', error);
    throw error;
  }
};
