import { MedusaContainer } from "@medusajs/medusa/dist/types/global";
import registerAiSalesDailyOutbound from "../jobs/ai-sales-daily-outbound";

/**
 * Loader to register all scheduled jobs
 */
export default async (container: MedusaContainer): Promise<void> => {
  // Only run scheduled jobs in production or when explicitly enabled
  const enableScheduledJobs =
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_SCHEDULED_JOBS === "true";

  if (!enableScheduledJobs) {
    console.log("[Jobs Loader] Scheduled jobs disabled (not in production)");
    return;
  }

  console.log("[Jobs Loader] Registering scheduled jobs...");

  // Register AI sales daily outbound job
  registerAiSalesDailyOutbound(container);

  console.log("[Jobs Loader] All scheduled jobs registered successfully");
};
