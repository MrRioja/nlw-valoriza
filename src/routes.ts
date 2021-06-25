import { Router } from "express";
const routes = Router();

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { ListTagsController } from "./controllers/ListTagsController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";

const createTagController = new CreateTagController();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

routes.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
routes.post("/users", createUserController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

routes.get("/tags", ensureAuthenticated, listTagsController.handle);
routes.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
routes.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

routes.get("/users", ensureAuthenticated, listUsersController.handle);

export { routes };
