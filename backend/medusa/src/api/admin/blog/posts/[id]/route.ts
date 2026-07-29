import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BlogService from "../../../../../services/blog";

/**
 * GET /admin/blog/posts/:id
 * Get a single blog post by ID
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");
  const { id } = req.params;

  try {
    const post = await blogService.retrieve(id);
    res.json({ post });
  } catch (error) {
    console.error("Error retrieving blog post:", error);
    res.status(404).json({
      error: "Blog post not found",
    });
  }
}

/**
 * PATCH /admin/blog/posts/:id
 * Update a blog post
 */
export async function PATCH(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");
  const { id } = req.params;

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

  try {
    const post = await blogService.update({
      id,
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
    });

    res.json({ post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Failed to update blog post",
    });
  }
}

/**
 * DELETE /admin/blog/posts/:id
 * Delete a blog post (admin only, not for avatar)
 */
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogService = req.scope.resolve("blogService");
  const { id } = req.params;

  try {
    await blogService.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog post:", error);
    
    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Failed to delete blog post",
    });
  }
}
