import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

/**
 * GET /store/blog/tags
 * List all blog tags
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");

  try {
    const tags = await blogService.listTags();
    res.json({ tags });
  } catch (error) {
    console.error("Error listing blog tags:", error);
    res.status(500).json({
      error: "Failed to retrieve blog tags",
    });
  }
}
