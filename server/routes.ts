import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMissionSchema, insertProposalSchema, insertNftSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = app.route('/api');

  // Get stats
  app.get('/api/stats', async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stats' });
    }
  });

  // Missions endpoints
  app.get('/api/missions', async (req: Request, res: Response) => {
    try {
      const missions = await storage.getMissions();
      res.json(missions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching missions' });
    }
  });

  app.get('/api/missions/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const mission = await storage.getMission(id);
      
      if (!mission) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mission' });
    }
  });

  app.post('/api/missions', async (req: Request, res: Response) => {
    try {
      const missionData = insertMissionSchema.parse(req.body);
      const newMission = await storage.createMission(missionData);
      res.status(201).json(newMission);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: 'Error creating mission' });
    }
  });

  app.patch('/api/missions/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const missionData = req.body;
      const updatedMission = await storage.updateMission(id, missionData);
      
      if (!updatedMission) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.json(updatedMission);
    } catch (error) {
      res.status(500).json({ message: 'Error updating mission' });
    }
  });

  app.delete('/api/missions/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMission(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting mission' });
    }
  });

  // Proposals endpoints
  app.get('/api/proposals', async (req: Request, res: Response) => {
    try {
      const proposals = await storage.getProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching proposals' });
    }
  });

  app.get('/api/proposals/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const proposal = await storage.getProposal(id);
      
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching proposal' });
    }
  });

  app.post('/api/proposals', async (req: Request, res: Response) => {
    try {
      const proposalData = insertProposalSchema.parse(req.body);
      const newProposal = await storage.createProposal(proposalData);
      res.status(201).json(newProposal);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: 'Error creating proposal' });
    }
  });

  app.post('/api/proposals/:id/vote', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { vote, amount } = req.body;
      
      if (!vote || !['yes', 'no'].includes(vote) || !amount || isNaN(amount)) {
        return res.status(400).json({ message: 'Invalid vote or amount' });
      }
      
      const updatedProposal = await storage.voteOnProposal(id, vote, Number(amount));
      
      if (!updatedProposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      
      res.json(updatedProposal);
    } catch (error) {
      res.status(500).json({ message: 'Error voting on proposal' });
    }
  });

  // NFTs endpoints
  app.get('/api/nfts', async (req: Request, res: Response) => {
    try {
      const { owner } = req.query;
      const nfts = await storage.getNFTs(owner as string);
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching NFTs' });
    }
  });

  app.get('/api/nfts/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const nft = await storage.getNFT(id);
      
      if (!nft) {
        return res.status(404).json({ message: 'NFT not found' });
      }
      
      res.json(nft);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching NFT' });
    }
  });

  app.post('/api/nfts', async (req: Request, res: Response) => {
    try {
      const nftData = insertNftSchema.parse(req.body);
      const newNFT = await storage.createNFT(nftData);
      res.status(201).json(newNFT);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: 'Error creating NFT' });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
