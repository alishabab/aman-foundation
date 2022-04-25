import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "lib/cloudinary";
import runMiddleware from "utils/runMiddleware";

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
    await cloudinary.uploader.destroy(assetId);
    return res.status(200).json({ success: true, message: "File removed" });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default removeFile;
