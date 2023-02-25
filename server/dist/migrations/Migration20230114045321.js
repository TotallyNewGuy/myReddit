"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230114045321 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230114045321 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "updated_at" drop default;');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    }
    async down() {
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" set default now();');
    }
}
exports.Migration20230114045321 = Migration20230114045321;
//# sourceMappingURL=Migration20230114045321.js.map