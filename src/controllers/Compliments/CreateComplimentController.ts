import { Request, Response } from "express";
import { CreateComplimentService } from "../../services/Compliment/CreateComplimentService";

class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { tag_id, user_receiver, message } = req.body;

    const complimentsService = new CreateComplimentService();

    const compliment = await complimentsService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    return res.status(201).json(compliment);
  }
}

export { CreateComplimentController };
