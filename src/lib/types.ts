export interface iMenu {
  idMenu: number;
  uuid: string;
  name: string;
  description: string;
  price: number;
  category: "FOOD" | "DRINK" | "SNACK";
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface iUser{
  idUser: number;
  uuid: string;
  email: string;
  password: string;
  name?: string;
  role: "CASHIER" | "MANAGER";
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
}