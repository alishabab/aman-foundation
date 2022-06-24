import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "lib/connectToDb";
import { generateSlug } from "utils/generateSlug";
import runMiddleware from "lib/runMiddleware";

const addStory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { session } = await runMiddleware(req, res);
    const { db } = await connectToDb();
    const { title, description, image, isImpact = false } = req.body;
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const stories = db.collection("stories");
    const slug = generateSlug(title);
    const result = await stories.insertOne({
      slug,
      title,
      description,
      image,
      isImpact,
      createdAt: new Date(),
      updatedAt: new Date(),
      addedBy: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "Story added", data: result });
  } catch (error) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const findAllStories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDb();
    const stories = db.collection("stories");
    const result = await stories.find({}).toArray();
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};
const stories = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return findAllStories(req, res);
    case "POST":
      return addStory(req, res);
    default:
      return res
        .status(400)
        .json({ success: false, message: "Method not allowed" });
  }
};

export default stories;
