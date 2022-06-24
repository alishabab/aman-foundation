import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "lib/connectToDb";
import runMiddleware from "lib/runMiddleware";

const findStory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDb();
    const stories = db.collection("stories");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }
    const result = await stories.findOne({ slug });
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

const deleteStory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res);
    const { db } = await connectToDb();
    const stories = db.collection("stories");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }
    const result = await stories.deleteOne({ slug });
    if (result.deletedCount === 0) {
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

const editStory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res);
    const { db } = await connectToDb();
    const stories = db.collection("stories");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }

    const result = await stories.updateOne(
      { slug },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
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

const story = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return findStory(req, res);
    case "POST":
      return deleteStory(req, res);
    case "PUT":
      return editStory(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default story;
