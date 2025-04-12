import { pgTable, text, serial, integer, boolean, jsonb, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address").unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
});

// Mission model
export const missions = pgTable("missions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  status: text("status").notNull().default("active"),
  targetFunding: numeric("target_funding").notNull(),
  currentFunding: numeric("current_funding").notNull().default("0"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  sharePrice: numeric("share_price").notNull(),
  totalShares: integer("total_shares").notNull(),
  availableShares: integer("available_shares").notNull(),
  revenueShare: numeric("revenue_share").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMissionSchema = createInsertSchema(missions).omit({
  id: true,
  createdAt: true,
});

// Proposal model
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  proposer: text("proposer").notNull(),
  status: text("status").notNull().default("voting"),
  yesVotes: numeric("yes_votes").notNull().default("0"),
  noVotes: numeric("no_votes").notNull().default("0"),
  endTime: timestamp("end_time").notNull(),
  executed: boolean("executed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
  id: true,
  createdAt: true,
  yesVotes: true,
  noVotes: true,
  executed: true,
});

// NFT model (Mission Shares)
export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  missionId: integer("mission_id").notNull(),
  shareId: integer("share_id").notNull(),
  ownerAddress: text("owner_address").notNull(),
  status: text("status").notNull().default("active"),
  acquisitionDate: timestamp("acquisition_date").defaultNow(),
  ownershipPercentage: numeric("ownership_percentage").notNull(),
  revenueShare: numeric("revenue_share").notNull(),
});

export const insertNftSchema = createInsertSchema(nfts).omit({
  id: true,
  acquisitionDate: true,
});

// Stats for the homepage
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  totalValueLocked: numeric("total_value_locked").notNull().default("0"),
  activeMissions: integer("active_missions").notNull().default(0),
  daoMembers: integer("dao_members").notNull().default(0),
  nextLaunch: timestamp("next_launch"),
});

export const insertStatsSchema = createInsertSchema(stats).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Mission = typeof missions.$inferSelect;
export type InsertMission = z.infer<typeof insertMissionSchema>;

export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;

export type NFT = typeof nfts.$inferSelect;
export type InsertNFT = z.infer<typeof insertNftSchema>;

export type Stats = typeof stats.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;
