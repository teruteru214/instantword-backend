import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { databaseMiddleware } from "./middleware/database";
import workers from "./workers";

const app = new Hono();

app.use("*", corsMiddleware);
app.use("*", databaseMiddleware);

app.route("/workers", workers);

export default app;
