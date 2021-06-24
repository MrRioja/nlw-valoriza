import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const { tag_id, user_sender, user_receiver, message } = req.body;

    const complimentsService = new CreateComplimentService();

    const compliment = await complimentsService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return res.json(compliment);
  }
}

export { CreateComplimentController };
