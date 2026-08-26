import { randomBytes } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProjectBrief } from "../db";
import { publicProcedure, router } from "../_core/trpc";

const projectTypes = [
  "Basic shop website",
  "E-commerce setup",
  "3D website",
  "Video ad campaign",
  "Dealership or partnership",
  "Not sure yet",
] as const;

const budgets = ["Up to ₹10K", "₹10K–₹25K", "₹25K–₹50K", "₹50K+", "Let's discuss"] as const;

export const projectBriefInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  business: z.string().trim().min(2, "Please enter your shop or business name.").max(160),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgets),
  details: z.string().trim().min(15, "Please share a little more detail about the project.").max(4_000),
  receiptConsent: z.literal(true, { error: "Please confirm that CookeByte can record this brief." }),
});

export type ProjectBriefInput = z.infer<typeof projectBriefInputSchema>;

export function buildProjectBriefReceiptId(date = new Date(), entropy = randomBytes(3).toString("hex").toUpperCase()) {
  const dateStamp = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("");

  return `CB-${dateStamp}-${entropy}`;
}

export const projectBriefRouter = router({
  submit: publicProcedure.input(projectBriefInputSchema).mutation(async ({ input }) => {
    const createdAt = new Date();
    const receiptId = buildProjectBriefReceiptId(createdAt);

    try {
      await createProjectBrief({
        receiptId,
        contactName: input.name,
        businessName: input.business,
        contactEmail: input.email,
        projectType: input.projectType,
        budget: input.budget,
        details: input.details,
        receiptConsentAt: createdAt,
        emailDeliveryStatus: "deferred",
        createdAt,
      });
    } catch (error) {
      console.error("[ProjectBrief] Unable to store receipt", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Your brief could not be recorded right now. Please try again in a moment.",
      });
    }

    return {
      receiptId,
      createdAt,
      emailDelivery: "deferred" as const,
    };
  }),
});
