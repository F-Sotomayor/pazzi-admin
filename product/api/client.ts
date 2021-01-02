import axios from "axios";

import {Product} from "../types";

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
      update: (id: Product["id"], stock: number): Promise<void> =>
        axios.patch(
          "/api/product",
          {id, stock},
          {
            headers: {
              Authorization: window.localStorage.getItem("token"),
            },
          },
        ),
    },
  },
};
