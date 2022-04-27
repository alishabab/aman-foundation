import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "utils/connectToDb";
import { generateSlug } from "utils/generateSlug";
import runMiddleware from "utils/runMiddleware";

const addCampaing = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { session } = await runMiddleware(req, res);
    const { db } = await connectToDb();
    const {
      title,
      description,
      image,
      isHighlighted = false,
      isCompleted = false,
      startedAt,
      completedAt,
      noOfBenificiaries,
    } = req.body;
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const campaigns = db.collection("campaigns");
    const slug = generateSlug(title);
    const isUpComing = new Date(startedAt) > new Date();
    const result = await campaigns.insertOne({
      slug,
      title,
      description,
      image,
      isHighlighted,
      createdAt: new Date(),
      updatedAt: new Date(),
      addedBy: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
      isCompleted,
      isUpComing,
      startedAt,
      completedAt,
      noOfBenificiaries,
    });

    return res
      .status(201)
      .json({ success: true, message: "Campaign added", data: result });
  } catch (error) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const findAllCampaigns = async (req: NextApiRequest, res: NextApiResponse) => {
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
const campaigns = async (req: NextApiRequest, res: NextApiResponse) => {
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
