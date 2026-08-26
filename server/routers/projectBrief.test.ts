import { beforeEach, describe, expect, it, vi } from "vitest";

const { createProjectBrief } = vi.hoisted(() => ({
  createProjectBrief: vi.fn(),
}));

vi.mock("../db", () => ({ createProjectBrief }));

import { buildProjectBriefReceiptId, projectBriefInputSchema, projectBriefRouter } from "./projectBrief";

const validInput = {
  name: "Rhea Nair",
  business: "Nair Supermart",
  email: "rhea@example.com",
  projectType: "Basic shop website" as const,
  budget: "₹10K–₹25K" as const,
  details: "We need a bright launch site for two branches by the festive season.",
  receiptConsent: true as const,
};

describe("project brief receipt", () => {
  beforeEach(() => {
    createProjectBrief.mockReset();
    createProjectBrief.mockResolvedValue(undefined);
  });

  it("creates a stable CookeByte receipt ID format", () => {
    expect(buildProjectBriefReceiptId(new Date("2026-08-26T12:00:00.000Z"), "A1B2C3")).toBe("CB-20260826-A1B2C3");
  });

  it("requires explicit consent before a brief can be recorded", () => {
    expect(() => projectBriefInputSchema.parse({ ...validInput, receiptConsent: false })).toThrow();
  });

  it("stores a validated brief and returns an in-site receipt", async () => {
    const caller = projectBriefRouter.createCaller({} as never);

    const receipt = await caller.submit(validInput);

    expect(receipt.receiptId).toMatch(/^CB-\d{8}-[A-F0-9]{6}$/);
    expect(receipt.emailDelivery).toBe("deferred");
    expect(createProjectBrief).toHaveBeenCalledWith(expect.objectContaining({
      contactName: validInput.name,
      contactEmail: validInput.email,
      emailDeliveryStatus: "deferred",
      receiptId: receipt.receiptId,
    }));
  });
});
