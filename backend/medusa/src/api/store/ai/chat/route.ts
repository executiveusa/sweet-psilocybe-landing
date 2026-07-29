import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import CrewGatewayService from "../../../../services/crew-gateway";

/**
 * POST /store/ai/chat
 * Storefront chat endpoint for the autonomous sales avatar
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const crewGatewayService: CrewGatewayService = req.scope.resolve("crewGatewayService");

  const {
    conversation_id,
    message,
    customer,
    cart_id,
    avatar_id,
    client_view,
  } = req.body;

  // Validation
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  if (!avatar_id) {
    return res.status(400).json({
      error: "Avatar ID is required",
    });
  }

  try {
    const response = await crewGatewayService.storefrontChat({
      conversation_id,
      message: message.trim(),
      customer,
      cart_id,
      avatar_id,
      client_view,
    });

    res.json(response);
  } catch (error) {
    console.error("Error in avatar chat:", error);
    res.status(500).json({
      error: "Failed to process chat message",
    });
  }
}
