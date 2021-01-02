import {NextApiRequest, NextApiResponse} from "next";

import serverApi from "../../product/api/server";
import {auth} from "../../firebase/admin";
import {Product} from "../../product/types";

interface PatchRequest extends NextApiRequest {
  body: {id: Product["id"]; stock: number};
  headers: {
    authorization: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === "PATCH") {
    const {
      body: {id, stock},
      headers,
    } = req as PatchRequest;

    return auth
      .verifyIdToken(headers.authorization)
      .then(async () => {
        await serverApi.product.stock.update(id, stock);

        return res.status(200).end();
      })
      .catch((error) => {
        return res.status(401).end();
      });
  }
};
