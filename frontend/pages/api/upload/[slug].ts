import { Request, Response } from "express";
import fs from "fs";
import runMiddleware from "utils/runMiddleware";

const removeFile = async (req: Request, res: Response) => {
  try {
    // await runMiddleware(req, res);
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
    }
    const { slug: file } = req.query;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }

    fs.unlinkSync(`../../../public/uploads/${file}`);
    return res.status(200).json({ success: true, message: "File removed" });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default removeFile;
