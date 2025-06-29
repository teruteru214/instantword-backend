import { Hono } from "hono";
import { handleFindSameName } from "./find-same-name";

const user = new Hono();

user.post("/find-same-name", handleFindSameName);

export default user;
