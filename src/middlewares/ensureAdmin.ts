import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.user_id;

  const usersRepository = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepository.findOne(user_id);

  if (admin) {
    return next();
  }

  return res.status(401).json({ error: "User unauthorized" });
}
