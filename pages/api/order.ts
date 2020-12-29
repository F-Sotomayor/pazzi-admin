import {NextApiRequest, NextApiResponse} from "next";

import serverApi from "../../product/api/server";
import {auth} from "../../firebase/admin";

interface PatchRequest extends NextApiRequest {
  body: {orders: string[]; status: string};
  headers: {
    authorization: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === "PATCH") {
    const {
      body: {orders, status},
      headers,
    } = req as PatchRequest;

    return auth
      .verifyIdToken(headers.authorization)
      .then(async () => {
        await serverApi.move(orders, status);

        return res.status(200).end();
      })
      .catch((error) => {
        return res.status(401).end();
      });
  }
};
