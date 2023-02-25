import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ defaultRaw: 'now()' })
  createdAt : Date;

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date()})
  updatedAt : Date;

  @Field()
  @Property()
  title!: string;

  constructor(title: string) {
    this.title = title;
  }

}