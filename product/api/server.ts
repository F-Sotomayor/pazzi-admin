import {database, firestore} from "../../firebase/admin";
import {CartItem, Order, Presentation, Product} from "../types";

export default {
  order: {
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
  },
  product: {
    list: async (): Promise<Product[]> => {
      return database
        .collection("products")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})));
    },
    stock: {
      update: async (id: Product["id"], presentations: Presentation[]): Promise<void> => {
        database.collection("products").doc(id).update({
          presentations,
        });
      },
    },
  },
};
