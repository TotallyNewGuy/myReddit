"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230112073526 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230112073526 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "created_at" set default now();');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" set default now();');
    }
    async down() {
        this.addSql('alter table "post" alter column "created_at" drop default;');
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" drop default;');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    }
}
exports.Migration20230112073526 = Migration20230112073526;
//# sourceMappingURL=Migration20230112073526.js.map