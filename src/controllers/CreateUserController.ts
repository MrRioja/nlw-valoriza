import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { stringToBoolean } from "../utils/stringToBoolean";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const requestImages = req.files as Express.Multer.File[];

    const admin =
      req.body.admin !== undefined && req.body.admin !== ""
        ? await stringToBoolean(req.body.admin)
        : false;

    const [{ path: avatar }] =
      requestImages.length > 0
        ? requestImages.map((image) => {
            return { path: image.filename };
          })
        : [{ path: undefined }];

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      admin,
      avatar,
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };
