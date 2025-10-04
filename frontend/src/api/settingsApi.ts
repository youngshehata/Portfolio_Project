import axiosClient from "./axiosClient";

export const SettingsAPI = {
  isLogged: async () => {
    return axiosClient.get("auth/logged");
  },
  login: async (password: string) => {
    return axiosClient.post("auth/login", { password });
  },

  logout: async () => {
    return axiosClient.post("auth/logout");
  },
};
