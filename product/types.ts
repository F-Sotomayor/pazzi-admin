export interface Product {
  id: string;
  title: string;
  title2: string;
  description: string;
  stock: number;
  test: string;
  type: string;
  presentations: Presentation[];
}

export interface Presentation {
  id: string;
  units: number;
  price: number;
}

export interface CartItem {
  id: Product["id"];
  title: Product["title"];
  title2: Product["title2"];
  presentations: CartItemPresentation[];
}

export interface Order {
  id: string;
  date: number;
  order: CartItem[];
  email: string;
  ordernumber: number;
  status: "pending" | "completed" | "cancelled" | "daily";
}

export interface ClientTenant {
  id: string;
}

export interface CartItemPresentation extends Presentation {
  count: number;
}
