import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let downloadPath = path.join(process.cwd(), "uploads");

    if(file.fieldname === "avatar") {
      downloadPath += "/avatar/";
    } else if (file.fieldname === "audio") {
      downloadPath += "/audio/";
    }

    fs.mkdirSync(downloadPath, { recursive: true })
    console.log(downloadPath)
    cb(null,downloadPath);
  },
  filename: (req, file, cb) => {
    const originalName = Buffer.from(file.originalname,"latin1").toString("utf8");
    cb(null,originalName);
  }
});

export const uploadMulter = multer({
  storage: storage,
})