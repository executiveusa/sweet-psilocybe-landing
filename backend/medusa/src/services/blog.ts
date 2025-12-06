import { TransactionBaseService } from "@medusajs/medusa";
import { BlogPost, BlogPostStatus } from "../models/blog-post";
import { BlogTag } from "../models/blog-tag";
import BlogPostRepository from "../repositories/blog-post";
import BlogTagRepository from "../repositories/blog-tag";
import { FindManyOptions, FindOptionsWhere, ILike, In } from "typeorm";

type InjectedDependencies = {
  blogPostRepository: typeof BlogPostRepository;
  blogTagRepository: typeof BlogTagRepository;
};

type CreateBlogPostInput = {
  slug: string;
  title: string;
  excerpt?: string;
  body_markdown: string;
  status?: BlogPostStatus;
  author_id?: string;
  hero_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  tag_slugs?: string[];
};

type UpdateBlogPostInput = Partial<CreateBlogPostInput> & {
  id: string;
};

type ListBlogPostsParams = {
  status?: BlogPostStatus;
  q?: string;
  tag?: string;
  limit?: number;
  offset?: number;
};

class BlogService extends TransactionBaseService {
  protected blogPostRepository_: typeof BlogPostRepository;
  protected blogTagRepository_: typeof BlogTagRepository;

  constructor({ blogPostRepository, blogTagRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.blogPostRepository_ = blogPostRepository;
    this.blogTagRepository_ = blogTagRepository;
  }

  /**
   * List blog posts with filtering
   */
  async list(params: ListBlogPostsParams = {}): Promise<[BlogPost[], number]> {
    const {
      status = BlogPostStatus.PUBLISHED,
      q,
      tag,
      limit = 10,
      offset = 0,
    } = params;

    const where: FindOptionsWhere<BlogPost> = { status };

    if (q) {
      where.title = ILike(`%${q}%`);
    }

    const options: FindManyOptions<BlogPost> = {
      where,
      relations: ["tags"],
      order: { published_at: "DESC", created_at: "DESC" },
      take: limit,
      skip: offset,
    };

    // If filtering by tag, we need to use query builder
    if (tag) {
      const queryBuilder = this.blogPostRepository_
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.tags", "tag")
        .where("post.status = :status", { status })
        .andWhere("tag.slug = :tag", { tag })
        .orderBy("post.published_at", "DESC")
        .addOrderBy("post.created_at", "DESC")
        .take(limit)
        .skip(offset);

      if (q) {
        queryBuilder.andWhere("post.title ILIKE :q", { q: `%${q}%` });
      }

      const [posts, count] = await queryBuilder.getManyAndCount();
      return [posts, count];
    }

    return await this.blogPostRepository_.findAndCount(options);
  }

  /**
   * Retrieve a blog post by slug
   */
  async retrieveBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository_.findOne({
      where: { slug },
      relations: ["tags"],
    });

    if (!post) {
      throw new Error(`Blog post with slug "${slug}" not found`);
    }

    return post;
  }

  /**
   * Retrieve a blog post by ID
   */
  async retrieve(id: string): Promise<BlogPost> {
    const post = await this.blogPostRepository_.findOne({
      where: { id },
      relations: ["tags"],
    });

    if (!post) {
      throw new Error(`Blog post with id "${id}" not found`);
    }

    return post;
  }

  /**
   * Create a new blog post
   */
  async create(data: CreateBlogPostInput): Promise<BlogPost> {
    return await this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      const tagRepo = manager.withRepository(this.blogTagRepository_);

      // Check if slug already exists
      const existing = await postRepo.findOne({
        where: { slug: data.slug },
      });

      if (existing) {
        throw new Error(`Blog post with slug "${data.slug}" already exists`);
      }

      // Handle tags
      let tags: BlogTag[] = [];
      if (data.tag_slugs && data.tag_slugs.length > 0) {
        tags = await tagRepo.find({
          where: { slug: In(data.tag_slugs) },
        });

        // Create any missing tags
        const foundSlugs = tags.map((t) => t.slug);
        const missingSlugs = data.tag_slugs.filter(
          (s) => !foundSlugs.includes(s)
        );

        for (const slug of missingSlugs) {
          const newTag = tagRepo.create({
            slug,
            name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          });
          const savedTag = await tagRepo.save(newTag);
          tags.push(savedTag);
        }
      }

      const post = postRepo.create({
        ...data,
        tags,
        status: data.status || BlogPostStatus.DRAFT,
      });

      return await postRepo.save(post);
    });
  }

  /**
   * Update a blog post
   */
  async update(data: UpdateBlogPostInput): Promise<BlogPost> {
    return await this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      const tagRepo = manager.withRepository(this.blogTagRepository_);

      const post = await postRepo.findOne({
        where: { id: data.id },
        relations: ["tags"],
      });

      if (!post) {
        throw new Error(`Blog post with id "${data.id}" not found`);
      }

      // Handle tags if provided
      if (data.tag_slugs) {
        const tags = await tagRepo.find({
          where: { slug: In(data.tag_slugs) },
        });

        // Create any missing tags
        const foundSlugs = tags.map((t) => t.slug);
        const missingSlugs = data.tag_slugs.filter(
          (s) => !foundSlugs.includes(s)
        );

        for (const slug of missingSlugs) {
          const newTag = tagRepo.create({
            slug,
            name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          });
          const savedTag = await tagRepo.save(newTag);
          tags.push(savedTag);
        }

        post.tags = tags;
      }

      // Update other fields
      const { id, tag_slugs, ...updateData } = data;
      Object.assign(post, updateData);

      // If status changed to published and published_at is not set, set it now
      if (
        data.status === BlogPostStatus.PUBLISHED &&
        !post.published_at
      ) {
        post.published_at = new Date();
      }

      return await postRepo.save(post);
    });
  }

  /**
   * Delete a blog post
   */
  async delete(id: string): Promise<void> {
    await this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      const post = await postRepo.findOne({ where: { id } });

      if (!post) {
        throw new Error(`Blog post with id "${id}" not found`);
      }

      await postRepo.remove(post);
    });
  }

  /**
   * List all tags
   */
  async listTags(): Promise<BlogTag[]> {
    return await this.blogTagRepository_.find({
      order: { name: "ASC" },
    });
  }
}

export default BlogService;
