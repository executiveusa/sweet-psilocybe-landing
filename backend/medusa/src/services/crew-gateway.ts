import { TransactionBaseService } from "@medusajs/medusa";
import axios, { AxiosInstance } from "axios";

type InjectedDependencies = {
  productService: any;
  cartService: any;
  customerService: any;
  orderService: any;
  blogService: any;
};

type StorefrontChatInput = {
  conversation_id: string | null;
  message: string;
  customer?: {
    id?: string | null;
    email?: string | null;
    locale?: string | null;
    region_id?: string | null;
  };
  cart_id?: string | null;
  avatar_id: string;
  client_view?: {
    page: string;
    url: string;
    device: "desktop" | "mobile" | "tablet";
  };
};

type AvatarReply = {
  reply_text: string;
  emotion: "neutral" | "happy" | "excited" | "curious" | "thinking" | "reassuring" | "apologetic";
  animation_key?: string | null;
  speech_hint: "short" | "normal" | "detailed";
};

type CartDelta = {
  action: "none" | "created" | "updated";
  cart_id?: string | null;
  summary?: {
    line_items: Array<{
      title: string;
      variant_title: string | null;
      quantity: number;
      unit_price: number;
      subtotal: number;
    }>;
    total: number;
  };
};

type SuggestedAction = {
  type: "go_to_checkout" | "show_product" | "show_blog_post" | "none";
  payload: any;
};

type StorefrontChatResponse = {
  conversation_id: string;
  avatar_reply: AvatarReply;
  cart_delta: CartDelta;
  suggested_actions: SuggestedAction[];
};

/**
 * Service to interface with the avatar/CrewAI engine
 */
class CrewGatewayService extends TransactionBaseService {
  protected productService_: any;
  protected cartService_: any;
  protected customerService_: any;
  protected orderService_: any;
  protected blogService_: any;
  protected client_: AxiosInstance;

  constructor({
    productService,
    cartService,
    customerService,
    orderService,
    blogService,
  }: InjectedDependencies) {
    super(arguments[0]);
    
    this.productService_ = productService;
    this.cartService_ = cartService;
    this.customerService_ = customerService;
    this.orderService_ = orderService;
    this.blogService_ = blogService;

    // Initialize HTTP client for avatar engine
    const crewGatewayUrl = process.env.CREW_GATEWAY_URL || "http://localhost:8080";
    this.client_ = axios.create({
      baseURL: crewGatewayUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AVATAR_ENGINE_API_KEY || ""}`,
      },
      timeout: 30000, // 30 second timeout for AI responses
    });
  }

  /**
   * Handle a storefront chat message
   */
  async storefrontChat(input: StorefrontChatInput): Promise<StorefrontChatResponse> {
    try {
      // Build context object with available tools and data
      const context = await this.buildContext(input);

      // Call the avatar engine/CrewAI
      const response = await this.client_.post("/crews/medusa-store-avatar/storefront_chat", {
        ...input,
        context,
      });

      return response.data;
    } catch (error) {
      console.error("Error communicating with avatar engine:", error);
      
      // Fallback response if avatar engine is unavailable
      return {
        conversation_id: input.conversation_id || this.generateConversationId(),
        avatar_reply: {
          reply_text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to browse our products directly.",
          emotion: "apologetic",
          animation_key: null,
          speech_hint: "normal",
        },
        cart_delta: {
          action: "none",
        },
        suggested_actions: [],
      };
    }
  }

  /**
   * Trigger the daily outbound workflow
   */
  async dailyOutbound(): Promise<{ sent: number; segments: string[] }> {
    try {
      const response = await this.client_.post("/crews/medusa-store-avatar/daily_outbound", {
        timestamp: new Date().toISOString(),
      });

      return response.data;
    } catch (error) {
      console.error("Error triggering daily outbound:", error);
      return { sent: 0, segments: [] };
    }
  }

  /**
   * Build context for the avatar engine with available tools and data
   */
  private async buildContext(input: StorefrontChatInput) {
    const context: any = {
      tools_available: [
        "tool_get_products",
        "tool_manage_cart",
        "tool_get_customer_and_orders",
        "tool_blog_read",
        "tool_avatar_channel",
      ],
      store_info: {
        name: "Sweet Psilocybe",
        brand_colors: {
          primary: "#F6AFCF", // petal
          secondary: "#A9C0B0", // fern
          dark: "#0B0B0B", // ink
          light: "#F7F3EF", // cream
        },
        voice: "friendly, educational, slightly playful but professional",
        audience: "adults 18+ interested in psilocybin research, plant medicine education, and artistic merchandise",
        value_props: [
          "Research-backed educational content",
          "High-quality artistic merchandise",
          "Supporting plant medicine science",
        ],
      },
    };

    // Add customer context if available
    if (input.customer?.id) {
      try {
        const customer = await this.customerService_.retrieve(input.customer.id, {
          relations: ["orders"],
        });
        context.customer = {
          id: customer.id,
          email: customer.email,
          first_name: customer.first_name,
          last_name: customer.last_name,
          order_count: customer.orders?.length || 0,
        };
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    }

    // Add cart context if available
    if (input.cart_id) {
      try {
        const cart = await this.cartService_.retrieve(input.cart_id, {
          relations: ["items", "items.variant", "items.variant.product"],
        });
        context.cart = {
          id: cart.id,
          item_count: cart.items?.length || 0,
          subtotal: cart.subtotal,
        };
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    return context;
  }

  /**
   * Generate a unique conversation ID
   */
  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default CrewGatewayService;
