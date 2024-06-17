import { Migration } from '@mikro-orm/migrations';

export class Migration20240615104743 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "to_do" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "is_completed" boolean not null, "updated_at" timestamptz not null, "created_at" timestamptz not null);');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "is_active" boolean not null default true);');
  }

}
