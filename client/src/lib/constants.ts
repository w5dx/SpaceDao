// Contract addresses (these would be real contract addresses in production)
export const SPACE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
export const MISSION_SHARES_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DAO_GOVERNANCE_ADDRESS = '0x0000000000000000000000000000000000000000';

// Simplified ABIs for the contracts
export const SPACE_TOKEN_ABI = [
  // ERC20 functions
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

export const MISSION_SHARES_ABI = [
  // ERC1155 functions
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
  "function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)",
  
  // Custom functions
  "function createMission(string memory uri, uint256 totalShares, uint256 pricePerShare) returns (uint256)",
  "function buyShares(uint256 missionId, uint256 shares) payable",
  
  // Events
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
  "event ApprovalForAll(address indexed account, address indexed operator, bool approved)",
  "event URI(string value, uint256 indexed id)"
];

export const DAO_GOVERNANCE_ABI = [
  // Governance functions
  "function propose(bytes[] calldata calldatas, address[] calldata targets, uint256[] calldata values, string memory description) returns (uint256)",
  "function castVote(uint256 proposalId, uint8 support) returns (uint256)",
  "function castVoteWithReason(uint256 proposalId, uint8 support, string calldata reason) returns (uint256)",
  "function execute(uint256 proposalId) payable returns (bytes[] memory)",
  "function state(uint256 proposalId) view returns (uint8)",
  "function proposalVotes(uint256 proposalId) view returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes)",
  
  // Events
  "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)",
  "event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason)"
];

// Hardcoded mission categories
export const MISSION_CATEGORIES = [
  'All Missions',
  'Mars Exploration',
  'Lunar Missions',
  'Asteroid Mining',
  'Satellite Deployment',
  'Deep Space',
  'Research'
];

// Placeholder stats
export const DEFAULT_STATS = {
  totalValueLocked: '$2.4M',
  activeMissions: 8,
  daoMembers: 3420,
  nextLaunch: '14:06:32'
};

// Function to format currency
export const formatCurrency = (value: number | string, decimals = 2) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

// Function to format percentage
export const formatPercentage = (value: number | string, decimals = 1) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return `${num.toFixed(decimals)}%`;
};

// Space theme colors
export const SPACE_COLORS = {
  background: '#0c0c1d',
  spaceGray: {
    DEFAULT: '#1e1e2f',
    light: '#2d2d44',
    lighter: '#3a3a55'
  },
  cosmicPurple: {
    DEFAULT: '#6b46c1',
    dark: '#4b3295'
  },
  nebulaPink: {
    DEFAULT: '#ff4d8c',
    dark: '#d13970'
  },
  spaceBlue: {
    DEFAULT: '#1a2151',
    light: '#2d3a85',
    dark: '#0c1137'
  }
};
