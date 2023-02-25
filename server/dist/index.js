"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    let RedisStore = require("connect-redis")(express_session_1.default);
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const redisClient = (0, redis_1.createClient)({ legacyMode: true });
    redisClient.connect().catch(console.error);
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 24,
            httpOnly: true,
            secure: false,
        },
        saveUninitialized: false,
        secret: "adsfadsfljawehrl",
        resave: false,
    }));
    app.set("trust proxy", 1);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [__dirname + "/resolvers/*.{ts,js}"],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    apolloServer.start().then(() => {
        apolloServer.applyMiddleware({
            app,
            cors: false,
        });
    });
    app.get("/", (req, res) => {
        res.send("hello world from backend");
    });
    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });
};
main();
//# sourceMappingURL=index.js.map