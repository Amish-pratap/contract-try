import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ToDo {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  isCompleted: boolean = false;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  createdAt = new Date();
  constructor({ title, description }: { title: string; description: string }) {
    this.title = title;
    this.description = description;
  }
}
