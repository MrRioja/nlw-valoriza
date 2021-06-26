import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const requestImages = req.files as Express.Multer.File[];

    const [{ path: icon }] =
      requestImages.length > 0
        ? requestImages.map((image) => {
            return { path: image.filename };
          })
        : [{ path: undefined }];

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name, icon);

    return res.status(201).json(tag);
  }
}

export { CreateTagController };
