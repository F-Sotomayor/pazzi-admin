import {NextApiRequest, NextApiResponse} from "next";

import serverApi from "../../product/api/server";
import {auth} from "../../firebase/admin";
import {Presentation, Product} from "../../product/types";

interface PatchRequest extends NextApiRequest {
  body: {id: Product["id"]; presentations: Presentation[]};
  headers: {
    authorization: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === "PATCH") {
    const {
      body: {id, presentations},
      headers,
    } = req as PatchRequest;

    return auth
      .verifyIdToken(headers.authorization)
      .then(async () => {
        await serverApi.product.stock.update(id, presentations);

        return res.status(200).end();
      })
      .catch((error) => {
        return res.status(error).end();
      });
  }
};
