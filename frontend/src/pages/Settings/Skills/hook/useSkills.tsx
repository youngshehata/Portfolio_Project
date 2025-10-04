import toast from "react-hot-toast";
import { usePagination } from "../../../../hooks/usePagination";
import { TSkill } from "../../../../common/types/skill.type";
import { fetcher } from "../../../../api/fetcher";
import { SkillsApi } from "../../../../api/skillsApi";
import { DEFAULT_PAGE_SIZE } from "../../../../common/constraints/pagination.constraints";
import { useLoading } from "../../../../contexts/LoadingContext";

export function useSkills() {
  const { activeLoading, stopLoading } = useLoading();

  const {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setData,
  } = usePagination<TSkill>(async (page: number, pageSize: number) => {
    const response = await fetcher(
      SkillsApi.getData(page, pageSize),
      "GET",
      true
    );
    return {
      data: response.data.data.data,
      total: response.data.data.totalCount,
    };
  }, DEFAULT_PAGE_SIZE);

  const update = async (skill: TSkill, file?: File) => {
    activeLoading();
    try {
      const res = await SkillsApi.editSkill(skill, file);
      const updated = res.data.data;
      setData((prev) =>
        prev.map((item: TSkill) => (item.id === updated.id ? updated : item))
      );
      toast.success("Updated successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      stopLoading();
    }
  };

  const add = async (skill: TSkill, file?: File) => {
    activeLoading();
    try {
      let response = await SkillsApi.addSkill(skill);
      let added = response.data.data;

      if (file) {
        const updated = await SkillsApi.editSkill(added, file);
        added = updated.data.data;
      }

      setData((prev) => [...prev, added]);
      toast.success("Added successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      stopLoading();
    }
  };

  const remove = async (id: number) => {
    try {
      await SkillsApi.deleteSkill(id);
      setData((prev) => prev.filter((item: TSkill) => item.id !== id));
      toast.success("Deleted successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      throw err;
    }
  };

  const search = async (value: string) => {
    activeLoading();
    try {
      const response = await fetcher(
        SkillsApi.getData(1, DEFAULT_PAGE_SIZE, undefined, value),
        "GET",
        true
      );
      setData(response.data.data.data);
    } finally {
      stopLoading();
    }
  };

  return {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setData,
    update,
    add,
    remove,
    search,
  };
}
