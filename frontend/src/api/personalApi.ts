import axiosClient from "./axiosClient";

export const PersonalApi = {
  getData: () => axiosClient.get("/personal/data"),
  homepage: () => axiosClient.get("/personal/homepage"),
  downloadCV: () => axiosClient.get("/personal/cv", { responseType: "blob" }),
  editData: (data: { name?: string; title?: string; about?: string }) => {
    return axiosClient.patch("/personal/edit", data);
  },
  editImage: (data: { file?: File }) => {
    return axiosClient.put("/personal/image", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  editCV: (data: { file?: File }) => {
    return axiosClient.put("/personal/cv", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
