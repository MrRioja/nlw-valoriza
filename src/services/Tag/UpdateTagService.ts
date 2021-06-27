import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { TagsRepositories } from "../../repositories/TagsRepositories";
import { deleteAvatar } from "../../utils/deleteImages";

class UpdateTagService {
  async execute(tag_id: string, name?: string, icon?: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tag = await tagsRepositories.findOneOrFail(tag_id);

    if (icon == undefined) {
      icon = tag.icon;
    }

    if (tag.icon?.length > 0 && tag.icon !== icon) {
      deleteAvatar(tag.icon);
    }

    tagsRepositories.merge(tag, { name, icon });

    const tagUpdated = await tagsRepositories.save(tag);

    return classToPlain(tagUpdated);
  }
}

export { UpdateTagService };
