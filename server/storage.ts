import { 
  users, type User, type InsertUser, 
  missions, type Mission, type InsertMission,
  proposals, type Proposal, type InsertProposal,
  nfts, type NFT, type InsertNFT,
  stats, type Stats, type InsertStats
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Mission operations
  getMissions(): Promise<Mission[]>;
  getMission(id: number): Promise<Mission | undefined>;
  createMission(mission: InsertMission): Promise<Mission>;
  updateMission(id: number, mission: Partial<InsertMission>): Promise<Mission | undefined>;
  deleteMission(id: number): Promise<boolean>;

  // Proposal operations
  getProposals(): Promise<Proposal[]>;
  getProposal(id: number): Promise<Proposal | undefined>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  updateProposal(id: number, proposal: Partial<InsertProposal>): Promise<Proposal | undefined>;
  voteOnProposal(id: number, vote: 'yes' | 'no', amount: number): Promise<Proposal | undefined>;
  deleteProposal(id: number): Promise<boolean>;

  // NFT operations
  getNFTs(ownerAddress?: string): Promise<NFT[]>;
  getNFT(id: number): Promise<NFT | undefined>;
  createNFT(nft: InsertNFT): Promise<NFT>;
  updateNFT(id: number, nft: Partial<InsertNFT>): Promise<NFT | undefined>;
  deleteNFT(id: number): Promise<boolean>;

  // Stats operations
  getStats(): Promise<Stats | undefined>;
  updateStats(stats: Partial<InsertStats>): Promise<Stats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private missions: Map<number, Mission>;
  private proposals: Map<number, Proposal>;
  private nfts: Map<number, NFT>;
  private statsData: Stats | undefined;
  
  private currentUserId: number;
  private currentMissionId: number;
  private currentProposalId: number;
  private currentNftId: number;

  constructor() {
    this.users = new Map();
    this.missions = new Map();
    this.proposals = new Map();
    this.nfts = new Map();
    
    this.currentUserId = 1;
    this.currentMissionId = 1;
    this.currentProposalId = 1;
    this.currentNftId = 1;

    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize stats
    this.statsData = {
      id: 1,
      totalValueLocked: 2400000,
      activeMissions: 8,
      daoMembers: 3420,
      nextLaunch: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days from now
    };

    // Sample missions
    [
      {
        title: "Mars Sample Return",
        description: "A mission to collect and return samples from the Martian surface for scientific study.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        status: "active",
        targetFunding: 5000000,
        currentFunding: 3600000,
        startDate: "2024",
        endDate: "2026",
        sharePrice: 0.05,
        totalShares: 10000,
        availableShares: 2800,
        revenueShare: 4.2
      },
      {
        title: "Lunar Gateway Station",
        description: "Construction of modular station orbiting the Moon as a staging point for deep space exploration.",
        imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
        status: "active",
        targetFunding: 25000000,
        currentFunding: 12000000,
        startDate: "2023",
        endDate: "2028",
        sharePrice: 0.25,
        totalShares: 100000,
        availableShares: 52000,
        revenueShare: 6.5
      },
      {
        title: "Asteroid Mining Initiative",
        description: "Pioneering mission to extract valuable resources from near-Earth asteroids using robotic technology.",
        imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45",
        status: "active",
        targetFunding: 10000000,
        currentFunding: 8900000,
        startDate: "2024",
        endDate: "2027",
        sharePrice: 0.1,
        totalShares: 10000,
        availableShares: 1100,
        revenueShare: 12.5
      }
    ].forEach(mission => {
      this.createMission(mission as InsertMission);
    });

    // Sample proposals
    [
      {
        title: "Jupiter Flyby Mission Funding",
        description: "Allocate 2,000 ETH from treasury for development of Jupiter flyby spacecraft with advanced sensors.",
        proposer: "0x71C...8Fe3",
        status: "voting",
        yesVotes: 129500,
        noVotes: 26200,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
        executed: false
      },
      {
        title: "Increase Treasury Allocation for R&D",
        description: "Increase research & development budget from 12% to 20% of treasury funds for next fiscal year.",
        proposer: "0x4B2...9Aa1",
        status: "voting",
        yesVotes: 84200,
        noVotes: 100100,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        executed: false
      }
    ].forEach(proposal => {
      const insertProposal: InsertProposal = {
        title: proposal.title,
        description: proposal.description,
        proposer: proposal.proposer,
        status: proposal.status,
        endTime: proposal.endTime
      };
      const createdProposal = this.createProposal(insertProposal);
      
      // Update with vote counts
      this.proposals.set(createdProposal.id, {
        ...createdProposal,
        yesVotes: proposal.yesVotes,
        noVotes: proposal.noVotes
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Mission methods
  async getMissions(): Promise<Mission[]> {
    return Array.from(this.missions.values());
  }

  async getMission(id: number): Promise<Mission | undefined> {
    return this.missions.get(id);
  }

  async createMission(insertMission: InsertMission): Promise<Mission> {
    const id = this.currentMissionId++;
    const createdAt = new Date();
    const mission: Mission = { ...insertMission, id, createdAt };
    this.missions.set(id, mission);
    return mission;
  }

  async updateMission(id: number, missionUpdate: Partial<InsertMission>): Promise<Mission | undefined> {
    const mission = this.missions.get(id);
    if (!mission) return undefined;

    const updatedMission = { ...mission, ...missionUpdate };
    this.missions.set(id, updatedMission);
    return updatedMission;
  }

  async deleteMission(id: number): Promise<boolean> {
    return this.missions.delete(id);
  }

  // Proposal methods
  async getProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values());
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = this.currentProposalId++;
    const createdAt = new Date();
    const proposal: Proposal = { 
      ...insertProposal, 
      id, 
      createdAt, 
      yesVotes: 0, 
      noVotes: 0, 
      executed: false 
    };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async updateProposal(id: number, proposalUpdate: Partial<InsertProposal>): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;

    const updatedProposal = { ...proposal, ...proposalUpdate };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  async voteOnProposal(id: number, vote: 'yes' | 'no', amount: number): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;

    const updatedProposal = { 
      ...proposal, 
      yesVotes: vote === 'yes' ? Number(proposal.yesVotes) + amount : Number(proposal.yesVotes),
      noVotes: vote === 'no' ? Number(proposal.noVotes) + amount : Number(proposal.noVotes)
    };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  async deleteProposal(id: number): Promise<boolean> {
    return this.proposals.delete(id);
  }

  // NFT methods
  async getNFTs(ownerAddress?: string): Promise<NFT[]> {
    const nfts = Array.from(this.nfts.values());
    if (ownerAddress) {
      return nfts.filter(nft => nft.ownerAddress === ownerAddress);
    }
    return nfts;
  }

  async getNFT(id: number): Promise<NFT | undefined> {
    return this.nfts.get(id);
  }

  async createNFT(insertNFT: InsertNFT): Promise<NFT> {
    const id = this.currentNftId++;
    const acquisitionDate = new Date();
    const nft: NFT = { ...insertNFT, id, acquisitionDate };
    this.nfts.set(id, nft);
    return nft;
  }

  async updateNFT(id: number, nftUpdate: Partial<InsertNFT>): Promise<NFT | undefined> {
    const nft = this.nfts.get(id);
    if (!nft) return undefined;

    const updatedNFT = { ...nft, ...nftUpdate };
    this.nfts.set(id, updatedNFT);
    return updatedNFT;
  }

  async deleteNFT(id: number): Promise<boolean> {
    return this.nfts.delete(id);
  }

  // Stats methods
  async getStats(): Promise<Stats | undefined> {
    return this.statsData;
  }

  async updateStats(statsUpdate: Partial<InsertStats>): Promise<Stats | undefined> {
    if (!this.statsData) return undefined;

    this.statsData = { ...this.statsData, ...statsUpdate };
    return this.statsData;
  }
}

export const storage = new MemStorage();
