import { IFormLogin, IFormRegister } from "../interface/intarface";
import { apiClient } from "./client.ts";

export const authApi = {
  register: async (formData: IFormRegister) => {
    const { data } = await apiClient.post("/register", formData);
    return data;
  },

  login: async (dataUser: IFormLogin) => {
    const { data } = await apiClient.post("/login", dataUser);
    console.log(data);

    return data;
  },

  logout: async () => {
    await apiClient.post("/logout");
  },

  checkAuth: async () => {
    const { data } = await apiClient.get("/session");
    return data;
  },
};
