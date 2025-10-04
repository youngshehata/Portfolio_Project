import { usePagination } from "../../hooks/usePagination";
import PaginatedList from "../../layouts/PaginatedList/PaginatedList";
import { DEFAULT_PAGE_SIZE } from "../../common/constraints/pagination.constraints";
import { ExperienceAPI } from "../../api/experienceApi";
import ExperienceCard from "../../components/ui/ExperienceCard/ExperienceCard";

export default function Experience() {
  const {
    data: experiences,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
  } = usePagination(
    (page, pageSize) =>
      ExperienceAPI.getExpereienceData(page, pageSize).then((res) => ({
        data: res.data.data.data,
        total: res.data.data.totalCount,
      })),
    DEFAULT_PAGE_SIZE
  );

  return (
    <PaginatedList
      listLength={totalResults}
      handleClickFirstPage={firstPage}
      handleClickLastPage={lastPage}
      handleClickNext={nextPage}
      handleClickPrevious={prevPage}
      currentPage={currentPage}
      title="Experiences"
      totalResults={totalResults}
      childrenList={
        experiences.length > 0
          ? experiences.map((project: any) => (
              <ExperienceCard
                id={project.id}
                key={project.id}
                challenge={project.challenge}
                solution={project.solution}
              />
            ))
          : []
      }
    />
  );
}
