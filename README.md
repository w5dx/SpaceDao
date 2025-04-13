Prototype video link:- https://drive.google.com/drive/folders/1hy6HIhFlePw1U8dWryunUOiozXsn6yzF?usp=sharing


# SpaceDAO - Crowdfunded Space Missions

![SpaceDAO Logo](generated-icon.png)

## Overview

SpaceDAO is a decentralized autonomous organization (DAO) built on blockchain technology that enables collaborative funding and governance of space exploration missions. Users can propose missions, invest in mission shares, vote on governance proposals, and earn returns from successful missions.

## Key Features

- **Decentralized Mission Funding**: Crowdfund space exploration missions through tokenized shares (ERC-1155)
- **DAO Governance**: Vote on proposals with $SPACE tokens to guide the future of SpaceDAO
- **Mission Shares**: Acquire ownership in missions as NFTs with revenue-sharing capabilities
- **Escrow Payments**: Mission funds are secured in escrow and released based on milestone completion
- **Transparent Governance**: All proposals, votes, and treasury movements are publicly visible on-chain

## Tech Stack

### Frontend 
- React.js with TypeScript
- Vite for fast development and build optimization
- TanStack Query (React Query) for data fetching and caching
- Wouter for lightweight routing
- Ethers.js for blockchain interactions
- Tailwind CSS + shadcn/ui for styling
- React Hook Form + Zod for form validation

### Backend
- Node.js with Express for API endpoints
- In-memory storage (simulated database) for demo purposes
- Drizzle ORM with PostgreSQL schema definitions (ready for database implementation)

### Blockchain
- Ethereum/Polygon compatible (currently in mock mode for demo)
- Smart Contracts (Solidity) - ERC-20 for governance token, ERC-1155 for mission shares
- OpenZeppelin Governor contract pattern for DAO governance

## Local Development Setup

### Prerequisites
- Node.js 20.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spacedao.git
cd spacedao
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser at `http://localhost:5000`

### Production Setup

#### Unix/Linux/Mac
**Option 1: npm script**
```bash
npm run build
npm start
```

**Option 2: Shell script**
```bash
npm run build
chmod +x ./start-unix.sh  # Make executable (first time only)
./start-unix.sh
```

#### Windows
We've provided several options for Windows users:

**Option 1: Command Prompt**
```cmd
npm run build
start-windows.bat
```

**Option 2: PowerShell**
```powershell
npm run build
.\start-windows.ps1
```

**Option 3: Node.js**
```cmd
npm run build
node start-windows.js
```

## Project Structure

```
spacedao/
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
├── server/                # Backend code
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Memory storage implementation
│   └── vite.ts            # Vite server configuration
├── shared/                # Shared code between frontend and backend
│   └── schema.ts          # Data models and validation schemas
├── drizzle.config.ts      # Drizzle ORM configuration
└── vite.config.ts         # Vite configuration
```

## How It Works

### Data Flow
1. Users connect their wallet to the application
2. They can view active missions, governance proposals, and NFT shares
3. Using their $SPACE tokens, they can vote on governance proposals
4. They can invest in missions to receive tokenized shares (NFTs)
5. As missions reach milestones and generate revenue, holders receive proportional returns

### Wallet Connection
The application interfaces with Web3 wallets like MetaMask through Ethers.js. In the demo mode, a mock wallet is implemented to showcase functionality without requiring an actual blockchain connection.

### Mission Funding Process
1. A mission proposal is submitted through the DAO governance
2. DAO members vote on the proposal with their $SPACE tokens
3. If approved, the mission opens for funding with a target amount and deadline
4. Investors receive tokenized shares (ERC-1155) in proportion to their investment
5. Funds are held in escrow and released based on achieved milestones
6. Upon mission completion, any revenue is distributed to shareholders

### Governance Model
- Proposals require a minimum of 10,000 $SPACE tokens to submit
- Voting period lasts 7 days
- A quorum of 30% of total $SPACE supply is required for execution
- Voting power is proportional to $SPACE token holdings

## Future Enhancements
- Integration with real blockchain networks (Ethereum/Polygon)
- Implement milestone verification through Chainlink oracles
- Add multi-signature wallet for treasury management
- Develop mobile application
- Integrate with real space industry partners for mission execution

## Deployment

The application can be deployed on any Node.js hosting service:

1. Build the application
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=5000
NODE_ENV=development

# For production with a real database
# DATABASE_URL=postgresql://username:password@localhost:5432/spacedao

# Smart contract addresses (for production)
# SPACE_TOKEN_ADDRESS=0x...
# MISSION_SHARES_ADDRESS=0x...
# DAO_GOVERNANCE_ADDRESS=0x...
```

## License

MIT

---

Created for demonstration purposes. This prototype showcases the concepts of a blockchain-based DAO for space mission crowdfunding.
