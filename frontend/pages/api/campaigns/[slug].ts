import type { Request, Response } from "express";
import connectToDb from "utils/connectToDb";
import runMiddleware from "utils/runMiddleware";

const findCampaign = async (req: Request, res: Response) => {
  try {
    const { db } = await connectToDb();
    const campaigns = db.collection("campaigns");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }
    const result = await campaigns.findOne({ slug });
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "No Campaingn found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCampaign = async (req: Request, res: Response) => {
  try {
    // await runMiddleware(req, res);
    const { db } = await connectToDb();
    const campaigns = db.collection("campaigns");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }
    const result = await campaigns.deleteOne({ slug });
    if (result.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Campaingn found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const editCampaing = async (req: Request, res: Response) => {
  try {
    // await runMiddleware(req, res);
    const { db } = await connectToDb();
    const campaigns = db.collection("campaigns");
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }
    const result = await campaigns.updateOne(
      { slug },
      { $set: { ...req.body } }
    );
    if (result.matchedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Campaingn found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const campaign = (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return findCampaign(req, res);
    case "POST":
      return deleteCampaign(req, res);
    case "PUT":
      return editCampaing(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default campaign;