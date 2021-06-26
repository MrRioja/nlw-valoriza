import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
  avatar?: string;
}

class CreateUserService {
  async execute({ name, email, password, admin, avatar }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new AppError("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
      avatar,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
