import { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "lib/connectToDb";
import runMiddleware from "lib/runMiddleware";

const slug = "aman-foundation";

const getOrganization = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDb();
    const organization = db.collection("organization");
    const result = await organization.findOne({ slug });
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "No Organization found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const addOrganization = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res);
    const { db } = await connectToDb();
    const {
      name = "Aman Foundation",
      logo = {},
      cover = {},
      acheivements = [],
      about = [],
      socialLinks = [],
    } = req.body;

    const organization = db.collection("organization");

    const result = await organization.insertOne({
      name,
      slug,
      logo,
      cover,
      acheivements,
      about,
      socialLinks,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res
      .status(201)
      .json({ success: true, data: result, message: "Organization Added" });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const editOrganization = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res);
    const { db } = await connectToDb();
    const organization = db.collection("organization");
    const result = await organization.updateOne(
      { slug },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Organization found" });
    }
    return res
      .status(200)
      .json({ success: true, data: result, message: "Organization Updated" });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ success: false, message: err.message });
  }
};

const organization = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getOrganization(req, res);
    case "POST":
      return addOrganization(req, res);
    case "PUT":
      return editOrganization(req, res);
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
};

export default organization;
