import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../common/constraints/pagination.constraints";
import axiosClient from "./axiosClient";

export const ExperienceAPI = {
  getExpereienceData: async (page: number, pageSize: number) =>
    axiosClient.get(
      `experiences/many?page=${page || DEFAULT_PAGE}&pageSize=${
        pageSize || DEFAULT_PAGE_SIZE
      }`
    ),
};
