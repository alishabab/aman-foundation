import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import runMiddleware from "utils/runMiddleware";
import { config as appConfig } from "config";

cloudinary.config({
  cloud_name: appConfig.CLOUDINARY_NAME,
  api_key: appConfig.CLOUDINARY_API_KEY,
  api_secret: appConfig.CLOUDINARY_API_SECRET,
});

const removeFile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // await runMiddleware(req, res);
    if (req.method !== "POST") {
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
    }
    const { slug: assetId } = req.query;

    if (!assetId) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }

    // @ts-ignore
    const resp = await cloudinary.uploader.destroy(assetId);
    return res.status(200).json({ success: true, message: "File removed" });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default removeFile;
