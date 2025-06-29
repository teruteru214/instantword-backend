import { Hono } from "hono";
import auth from "./auth";
import user from "./user";

const workers = new Hono();

workers.route("/auth", auth);
workers.route("/user", user);

export default workers;
