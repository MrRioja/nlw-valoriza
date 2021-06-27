import { Request, Response } from "express";
import { UpdateTagService } from "../../services/Tag/UpdateTagService";

class UpdateTagController {
  async handle(req: Request, res: Response) {
    var icon = undefined;
    const { name } = req.body;
    const { tag_id } = req.params;

    const requestImages = req.files as Express.Multer.File[];

    if (requestImages.length > 0) {
      [{ path: icon }] = requestImages.map((image) => {
        return { path: image.filename };
      });
    } else if (req.body.icon === "") {
      icon = "";
    }

    const updateTagService = new UpdateTagService();

    const tag = await updateTagService.execute(tag_id, name, icon);

    return res.status(201).json(tag);
  }
}

export { UpdateTagController };
