import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../services/blog";
import { BlogPostStatus } from "../../../../models/blog-post";

/**
 * GET /admin/blog/posts
 * List blog posts (all statuses for admin)
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");

  const status = req.query.status as BlogPostStatus | undefined;
  const q = req.query.q as string | undefined;
  const tag = req.query.tag as string | undefined;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const [posts, count] = await blogService.list({
      status,
      q,
      tag,
      limit: Math.min(limit, 100),
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

/**
 * POST /admin/blog/posts
 * Create a new blog post (draft by default)
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");

  const {
    slug,
    title,
    excerpt,
    body_markdown,
    status,
    author_id,
    hero_image_url,
    seo_title,
    seo_description,
    tag_slugs,
  } = req.body;

  // Validation
  if (!slug || !title || !body_markdown) {
    return res.status(400).json({
      error: "Slug, title, and body_markdown are required",
    });
  }

  try {
    const post = await blogService.create({
      slug,
      title,
      excerpt,
      body_markdown,
      status: status || BlogPostStatus.DRAFT,
      author_id,
      hero_image_url,
      seo_title,
      seo_description,
      tag_slugs,
    });

    res.status(201).json({ post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    
    if (error.message.includes("already exists")) {
      return res.status(409).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Failed to create blog post",
    });
  }
}
