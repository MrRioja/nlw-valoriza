import { resolve } from "path";
import fs from "fs";

export function deleteAvatar(avatar: string) {
  const path = resolve(__dirname, "..", "..", "uploads", `${avatar}`);
  fs.rm(path, (err) => {
    if (err) throw err;
  });
}
