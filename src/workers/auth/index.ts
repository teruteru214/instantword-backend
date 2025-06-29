import { Hono } from "hono";
import { handleCreateUser } from "./create-user";
import { handleFindUser } from "./find-user";

const auth = new Hono();

auth.post("/find-user", handleFindUser);

auth.post("/create-user", handleCreateUser);

export default auth;
