import type { Request, Response } from "express";
import connectToDb from "utils/connectToDb";
import { generateSlug } from "utils/generateSlug";
import runMiddleware from "utils/runMiddleware";

const addCampaing = async (req: Request, res: Response) => {
  try {
    // await runMiddleware(req, res);
    const { db } = await connectToDb();
    const { title, description, imageUrl, isHighlighted = false } = req.body;
    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const campaigns = db.collection("campaigns");
    const slug = generateSlug(title);
    const result = await campaigns.insertOne({
      slug,
      title,
      description,
      imageUrl,
      isHighlighted,
    });

    return res
      .status(201)
      .json({ success: true, message: "Campaign added", data: result });
  } catch (error) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const findAllCampaigns = async (req: Request, res: Response) => {
  try {
    const { db } = await connectToDb();
    const campaigns = db.collection("campaigns");
    const result = await campaigns.find({}).toArray();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};
const campaigns = async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return findAllCampaigns(req, res);
    case "POST":
      return addCampaing(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default campaigns;
