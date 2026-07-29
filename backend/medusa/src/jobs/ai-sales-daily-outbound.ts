import cron from "node-cron";
import CrewGatewayService from "../services/crew-gateway";

/**
 * Scheduled job for daily AI sales outbound campaigns
 * Runs daily at 10:00 AM server time
 * 
 * This job triggers the autonomous avatar to:
 * 1. Query opt-in lead segments (abandoned carts, repeat buyers, etc.)
 * 2. Draft personalized messages based on lead context
 * 3. Send respectful outreach with frequency caps
 * 4. Log campaign results for analysis
 */
export default function registerAiSalesDailyOutbound(container) {
  const schedule = process.env.AI_OUTBOUND_SCHEDULE || "0 10 * * *"; // Daily at 10 AM

  // Register the cron job
  cron.schedule(schedule, async () => {
    const crewGatewayService: CrewGatewayService = container.resolve("crewGatewayService");

    console.log("[AI Sales Daily Outbound] Starting daily outbound campaign...");

    try {
      const result = await crewGatewayService.dailyOutbound();

      console.log(
        `[AI Sales Daily Outbound] Completed. Messages sent: ${result.sent}, Segments: ${result.segments.join(", ")}`
      );
    } catch (error) {
      console.error("[AI Sales Daily Outbound] Error running daily outbound:", error);
    }
  });

  console.log(`[AI Sales Daily Outbound] Scheduled with cron expression: ${schedule}`);
}
