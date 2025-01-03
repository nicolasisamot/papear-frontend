import api from "./api.tsx";
import { RegisterUserInterface, LoginUserInterface } from "../interfaces/auth";
import { AxiosResponse } from "axios";
//import { RegisterResponse } from "../interfaces/auth";

export default class UserServices {
  static async register(user: RegisterUserInterface): Promise<AxiosResponse> {
    const response = await api.post("/register", user);
    return response;
  }
  static async login(user: LoginUserInterface): Promise<AxiosResponse> {
    const response = await api.post("/login", user);
    return response;
  }
  static async getUserData(token: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await api.get("/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
