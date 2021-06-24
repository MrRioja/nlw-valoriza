import { Router } from "express";
const routes = Router();
import { ensureAdmin } from "./middlewares/ensureAdmin";

import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

routes.post("/tags", createTagController.handle);
routes.post("/users", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/compliments", createComplimentController.handle);

export { routes };
