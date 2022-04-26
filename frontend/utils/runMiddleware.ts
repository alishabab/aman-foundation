import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type ReturnType = {
  session: Session | null;
  success: boolean;
  status: 401 | 403 | 200;
  message: string;
};
async function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<ReturnType> {
  return new Promise(async (resolve, reject) => {
    const session = await getSession({ req });

    if (!session) {
      return reject({
        success: false,
        status: 401,
        message: "Not logged in",
        session: null,
      });
    }
    // @ts-ignore
    if (!session.isAdmin) {
      return reject({
        success: false,
        status: 403,
        message: "Not authorized",
        session: null,
      });
    }
    return resolve({
      success: true,
      status: 200,
      session,
      message: "Authorized",
    });
  });
}

export default runMiddleware;
