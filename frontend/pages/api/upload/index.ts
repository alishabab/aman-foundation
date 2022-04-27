import { NextApiRequest, NextApiResponse } from "next";
import { cloudinary } from "lib/cloudinary";
import runMiddleware from "utils/runMiddleware";

export const config = {
  api: {
    bodyParser: true,
  },
};

const uploadFormFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res);
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

const uploads = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return uploadFormFiles(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default uploads;
