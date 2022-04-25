import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    const session = await getSession({ req });

    if (!session) {
      return reject({
        success: false,
        status: 401,
        message: "Not logged in",
      });
    }
    // @ts-ignore
    if (!session.isAdmin) {
      return reject({
        success: false,
        status: 403,
        message: "Not authorized",
      });
    }
    return resolve({ success: true, status: 200, message: "Authorized" });
  });
}

export default runMiddleware;
