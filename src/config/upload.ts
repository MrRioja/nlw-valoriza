import AppError from "../errors/AppError";
import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );

    if (isAccepted) {
      return cb(null, true);
    }

    cb(new AppError("Problem with uploading files"));
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
