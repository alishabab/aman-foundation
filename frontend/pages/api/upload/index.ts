import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { config as appConfig } from "config";
import { nanoid } from "nanoid";
import runMiddleware from "utils/runMiddleware";

cloudinary.config({
  cloud_name: appConfig.CLOUDINARY_NAME,
  api_key: appConfig.CLOUDINARY_API_KEY,
  api_secret: appConfig.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: true,
  },
};

const uploadFormFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // await runMiddleware(req, res);
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
    }
    const fileStr = req.body.data;
    const result = await cloudinary.uploader.upload(fileStr);
    return res.status(200).json({
      success: true,
      message: "Uploaded",
      image: { url: result.secure_url, id: result.public_id },
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default uploadFormFiles;
