import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { deleteAvatar } from "../../utils/deleteImages";
import { hash } from "bcryptjs";

class UpdateUserService {
  async execute(
    user_id: string,
    name?: string,
    email?: string,
    password?: string,
    admin?: boolean,
    avatar?: string
  ) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOneOrFail(user_id);

    if (avatar == undefined) {
      avatar = user.avatar;
    }

    if (user.avatar?.length > 0 && user.avatar !== avatar) {
      deleteAvatar(user.avatar);
    }

    usersRepositories.merge(user, {
      name,
      email,
      password: password !== undefined ? await hash(password, 8) : undefined,
      admin,
      avatar,
    });

    const userUpdated = await usersRepositories.save(user);

    return classToPlain(userUpdated);
  }
}

export { UpdateUserService };
