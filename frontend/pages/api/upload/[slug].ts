import { Request, Response } from "express";
import fs from "fs";

const removeFile = async (req: Request, res: Response) => {
  const { slug: file } = req.query;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided" });
  }

  try {
    fs.unlinkSync(`public/uploads/${file}`);
    return res.status(200).json({ success: true, message: "File removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to remove" });
  }
};

export default removeFile;
