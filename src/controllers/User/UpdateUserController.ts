import { Request, Response } from "express";
import { UpdateUserService } from "../../services/User/UpdateUserService";
import { stringToBoolean } from "../../utils/stringToBoolean";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    var avatar = undefined;
    const { name, email, password } = req.body;
    const user_id = req.user_id;

    const requestImages = req.files as Express.Multer.File[];

    if (requestImages.length > 0) {
      [{ path: avatar }] = requestImages.map((image) => {
        return { path: image.filename };
      });
    } else if (req.body.avatar === "") {
      avatar = "";
    }

    const admin =
      req.body.admin !== undefined && req.body.admin !== ""
        ? await stringToBoolean(req.body.admin)
        : undefined;

    const updateUserService = new UpdateUserService();

    const tag = await updateUserService.execute(
      user_id,
      name,
      email,
      password,
      admin,
      avatar
    );

    return res.status(201).json(tag);
  }
}

export { UpdateUserController };
