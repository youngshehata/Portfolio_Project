import axiosClient from "./axiosClient";

export const ProjectsAPI = {
  getProjectsData: (page?: number, pageSize?: number) =>
    axiosClient.get(
      `/projects/many?page=${page || 1}&pageSize=${pageSize || 10}`
    ),
};
