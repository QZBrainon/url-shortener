import dotenv from "dotenv";
dotenv.config();
import { FastifyRequest, FastifyReply } from "fastify";
import { redis } from "./lib/redis";
import { v4 as uuidv4 } from "uuid";
import insertShortLink from "./db/queries/insert";
import fastify from "fastify";
import selectShortLink from "./db/queries/select";

const PORT = process.env.PORT;

if (!PORT) {
  console.error("Missing PORT env var");
  process.exit(1);
}

const app = fastify();

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.get(
  "/:id",
  async (
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) => {
    const { id } = req.params;
    const result = await selectShortLink(id);

    if (!result?.original_url) {
      return res.redirect(302, "/");
    }
    return res.redirect(302, result.original_url);
  }
);

app.post(
  "/",
  async (
    req: FastifyRequest<{ Body: { original_url: string } }>,
    res: FastifyReply
  ) => {
    const { original_url } = req.body;
    const id = uuidv4().slice(0, 8);
    const short_url = `${req.hostname}/${id}`;
    await insertShortLink(original_url, id);
    res.status(201).send({ url: short_url });
  }
);

app
  .listen({
    port: +PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server Running on port ${PORT}`);
  });
