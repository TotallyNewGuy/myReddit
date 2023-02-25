import { Migration } from '@mikro-orm/migrations';

export class Migration20230112073526 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "post" alter column "created_at" set default now();');
    this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "post" alter column "updated_at" set default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "created_at" drop default;');
    this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "post" alter column "updated_at" drop default;');
    this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
