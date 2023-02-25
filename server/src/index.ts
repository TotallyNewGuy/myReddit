import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { COOKIE_NAME, __prod__ } from "./constants";
import config from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { createClient } from "redis";
import session from "express-session";
import { MyContext } from "./types";
import cors from "cors";

const main = async () => {
  let RedisStore = require("connect-redis")(session);
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  const redisClient = createClient({ legacyMode: true });

  redisClient.connect().catch(console.error);

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 24,
        httpOnly: true,
        // sameSite: "none",
        secure: false, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "adsfadsfljawehrl",
      resave: false,
    })
  );

  app.set("trust proxy", 1);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      // resolvers: [HelloResolover, PostResolover, UserResolover],
      resolvers: [__dirname + "/resolvers/*.{ts,js}"],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({
      app,
      cors: false,
    });
  });
  // apolloServer.start().then(() => {
  //   apolloServer.applyMiddleware({
  //     app,
  //     cors: {
  //       credentials: true,
  //       origin: ["https://studio.apollographql.com", "http://localhost:3000"],
  //     },
  //   });
  // });

  app.get("/", (req, res) => {
    res.send("hello world from backend");
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main();
