import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../../services/blog";

/**
 * GET /store/blog/posts/:slug
 * Get a single published blog post by slug
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");
  const { slug } = req.params;

  try {
    const post = await blogService.retrieveBySlug(slug);

    // Only return published posts to storefront
    if (post.status !== "published") {
      return res.status(404).json({
        error: "Blog post not found",
      });
    }

    res.json({ post });
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(404).json({
      error: "Blog post not found",
    });
  }
}
