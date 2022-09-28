import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "lib/connectToDb";

const findImpactStory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDb();
    const stories = db.collection("stories");
    const result = await stories.findOne({ isImpact: true });
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "No Story found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const isImpact = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return findImpactStory(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default isImpact;
