// import { Post, User } from "./entities";
import { __prod__ } from "./constants";
import {MikroORM } from "@mikro-orm/core";
import path from "path";
export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    // entities:[User, Post],
    entities: ['./dist/entities/**/*.js'],
    dbName: 'lyuReddit',
    type: 'postgresql',
    debug: !__prod__,
    user: 'appleman',
    password: 'AppleMan922',
    allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];


// const config: Options = {
//     entities:[Post],
//     dbName: 'lyuReddit',
//     type: 'postgresql',
//     debug: !__prod__,
//     user: 'appleman',
//     password: 'AppleMan922',
//     allowGlobalContext: true
// };
// export default config;
