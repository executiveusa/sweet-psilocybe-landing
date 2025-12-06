import { BaseEntity } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class BlogTag extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "varchar" })
  name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "btag");
  }
}
