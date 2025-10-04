import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../common/constraints/pagination.constraints";
import { TSkill } from "../common/types/skill.type";
import axiosClient from "./axiosClient";

export const SkillsApi = {
  getData: (
    page: number,
    pageSize: number,
    showOnPortfolio?: boolean,
    search?: string
  ) => {
    return `skills/many?page=${page || DEFAULT_PAGE}&pageSize=${
      pageSize || DEFAULT_PAGE_SIZE
    }${showOnPortfolio ? `&showOnPortfolio=${showOnPortfolio}` : ""}${
      search ? `&search=${search}` : ""
    }`;
  },

  //=========================================================
  //=========================================================
  editSkill: (skill: TSkill, img?: File) => {
    return axiosClient.put(
      `skills/icon/${skill.id}`,
      {
        name: skill.name,
        showOnPortfolio: skill.showOnPortfolio,
        type: "skills",
        file: img || null,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  //=========================================================
  //=========================================================
  addSkill: (skill: TSkill) => {
    return axiosClient.post(`skills`, {
      name: skill.name,
      showOnPortfolio: skill.showOnPortfolio,
    });
  },

  //=========================================================
  //=========================================================
  deleteSkill: (id: number) => {
    return axiosClient.delete(`skills/${id}`);
  },
};
