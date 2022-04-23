import type { NextApiRequest, NextApiResponse } from "next";

const campaigns = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([{ name: "campaign 1" }, { name: "campaign 2" }]);
};

export default campaigns;
