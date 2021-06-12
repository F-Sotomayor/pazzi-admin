import axios from "axios";

import {Presentation, Product} from "../types";

export default {
  order: {
    move: (orders: string[], status: string): Promise<void> =>
      axios.patch(
        "/api/order",
        {orders, status},
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        },
      ),
  },
  product: {
    stock: {
      update: (id: Product["id"], presentations: Presentation[]): Promise<void> =>
        axios.patch(
          "/api/product",
          {id, presentations},
          {
            headers: {
              Authorization: window.localStorage.getItem("token"),
            },
          },
        ),
    },
  },
};
