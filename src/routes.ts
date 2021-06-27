import { Router } from "express";
import multer from "multer";
const routes = Router();

import uploadConfig from "./config/upload";
const upload = multer(uploadConfig);

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { ListTagsController } from "./controllers/Tag/ListTagsController";
import { CreateTagController } from "./controllers/Tag/CreateTagController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { UpdateUserController } from "./controllers/User/UpdateUserController";
import { AuthenticateUserController } from "./controllers/User/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/Compliments/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/Compliments/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/Compliments/ListUserSendComplimentsController";
import { ListUsersController } from "./controllers/User/ListUsersController";
import { UpdateTagController } from "./controllers/Tag/UpdateTagController";

const createTagController = new CreateTagController();
const updateTagController = new UpdateTagController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
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
  upload.array("icon"),
  createTagController.handle
);
routes.put(
  "/tags/:tag_id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("icon"),
  updateTagController.handle
);
routes.put(
  "/users",
  ensureAuthenticated,
  upload.array("avatar"),
  updateUserController.handle
);
routes.post("/users", upload.array("avatar"), createUserController.handle);
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
