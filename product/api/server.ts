import {database} from "../../firebase/admin";
import {Order} from "../types";

export default {
  list: async (status: Order["status"]): Promise<Order[]> => {
    return database
      .collection("orders")
      .where("status", "==", status)
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Order), id: doc.id})));
  },
  move: async (orders: string[], status: string): Promise<boolean> => {
    const batch = database.batch();

    for (const id of orders) {
      batch.update(database.collection("orders").doc(id), {
        status,
      });
    }
    await batch.commit();

    return true;
  },
};
