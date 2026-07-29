import { BaseEntity } from "@medusajs/medusa";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { BlogTag } from "./blog-tag";

export enum BlogPostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

@Entity()
export class BlogPost extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  excerpt: string | null;

  @Column({ type: "text" })
  body_markdown: string;

  @Column({
    type: "enum",
    enum: BlogPostStatus,
    default: BlogPostStatus.DRAFT,
  })
  status: BlogPostStatus;

  @Column({ type: "timestamptz", nullable: true })
  published_at: Date | null;

  @Column({ type: "varchar", nullable: true })
  author_id: string | null;

  @Column({ type: "varchar", nullable: true })
  hero_image_url: string | null;

  @Column({ type: "varchar", nullable: true })
  seo_title: string | null;

  @Column({ type: "text", nullable: true })
  seo_description: string | null;

  @ManyToMany(() => BlogTag, { cascade: true })
  @JoinTable({
    name: "blog_post_tags",
    joinColumn: {
      name: "post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: BlogTag[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "bpost");
  }
}
