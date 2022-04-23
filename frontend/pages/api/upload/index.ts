import { Request, Response } from "express";
import { File } from "formidable";
// @ts-ignore
import Formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req: Request, res: Response) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (name: string, file: File) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/uploads/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(
          res.status(500).json({ success: false, message: "Upload aborted" })
        );
      })
      .on("end", () => {
        resolve(
          res.status(200).send({ success: true, message: "Upload successful" })
        );
      });

    await form.parse(req);
  });
}
