import { Request, Response } from "express";
import { File } from "formidable";
import { nanoid } from "nanoid";
// @ts-ignore
import Formidable from "formidable-serverless";
import fs from "fs";
import runMiddleware from "utils/runMiddleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFormFiles = async (req: Request, res: Response) => {
  try {
    // await runMiddleware(req, res);
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
    }

    return new Promise(async (resolve, reject) => {
      let filename = "";
      const form = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
      });

      form
        .on("file", (name: string, file: File) => {
          // @ts-ignore
          const data = fs.readFileSync(file.path);
          // @ts-ignore
          filename = `${nanoid()}-${file.name}`;
          fs.writeFileSync(`../../../public/uploads/${filename}`, data);
          // @ts-ignore
          fs.unlinkSync(file.path);
        })
        .on("aborted", () => {
          reject(
            res.status(500).json({ success: false, message: "Upload aborted" })
          );
        })
        .on("end", () => {
          resolve(
            res.status(201).send({
              success: true,
              message: "Upload successful",
              filename,
            })
          );
        });

      await form.parse(req);
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default uploadFormFiles;
