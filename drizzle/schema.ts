import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Public project briefs submitted from the CookeByte marketing site.
 * These records create a durable in-site receipt now and preserve a safe
 * email-delivery handoff point for a future configured provider.
 */
export const projectBriefs = mysqlTable("projectBriefs", {
  id: int("id").autoincrement().primaryKey(),
  receiptId: varchar("receiptId", { length: 48 }).notNull().unique(),
  contactName: varchar("contactName", { length: 120 }).notNull(),
  businessName: varchar("businessName", { length: 160 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  projectType: varchar("projectType", { length: 96 }).notNull(),
  budget: varchar("budget", { length: 64 }).notNull(),
  details: text("details").notNull(),
  receiptConsentAt: timestamp("receiptConsentAt").notNull(),
  emailDeliveryStatus: mysqlEnum("emailDeliveryStatus", ["deferred"]).default("deferred").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProjectBrief = typeof projectBriefs.$inferSelect;
export type InsertProjectBrief = typeof projectBriefs.$inferInsert;
