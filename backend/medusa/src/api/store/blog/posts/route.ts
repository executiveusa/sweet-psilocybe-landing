import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";

/**
 * GET /store/blog/posts
 * List published blog posts
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");

  const q = req.query.q as string | undefined;
  const tag = req.query.tag as string | undefined;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const [posts, count] = await blogService.list({
      status: "published" as any,
      q,
      tag,
      limit: Math.min(limit, 50), // Cap at 50
      offset,
    });

    res.json({
      posts,
      count,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error listing blog posts:", error);
    res.status(500).json({
      error: "Failed to retrieve blog posts",
    });
  }
}
