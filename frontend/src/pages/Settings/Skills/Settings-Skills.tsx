import { useState } from "react";
import styles from "./Settings-Skills.module.css";
import { TSkill } from "../../../common/types/skill.type";
import SearchableList from "../../../layouts/SearchableList/SearchableList";
import SkillRow from "./SkillRow/SkillRow";
import SkillDialog from "./SkillDialog/SkillDialog";
import GenericDialog from "../../../components/custom/GenericDialog/GenericDialog";
import Modal from "../../../components/layout/Modal/Modal";
import { DEFAULT_PAGE_SIZE } from "../../../common/constraints/pagination.constraints";
import { useSkills } from "./hook/useSkills";

export default function SettingsSkills() {
  const {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    update,
    add,
    remove,
    search,
  } = useSkills();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState<TSkill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<TSkill | null>(null);

  const headers = [{ label: "Total skills:", value: totalResults.toString() }];

  const tableColumns = [
    { name: "#", widthPercentage: 10 },
    { name: "Name", widthPercentage: 30 },
    { name: "Icon", widthPercentage: 15 },
    { name: "Show on portfolio", widthPercentage: 20 },
    { name: "Actions", widthPercentage: 25 },
  ];

  const emptyNewSkill: TSkill = {
    id: 0,
    name: "",
    icon: "/icons/default_skill.svg",
    showOnPortfolio: true,
  };

  // wrappers to keep same behavior (close dialogs after action)
  const handleEdit = async (skill: TSkill, file?: File) => {
    await update(skill, file);
    setOpenEditDialog(false);
    setEditingSkill(null);
  };

  const handleAdd = async (skill: TSkill, file?: File) => {
    await add(skill, file);
    setOpenAddDialog(false);
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingSkill) return;
    await remove(deletingSkill.id);
    setDeletingSkill(null);
  };

  return (
    <div className={styles.container}>
      {/* delete modal */}
      {deletingSkill && (
        <Modal
          message="Are you sure you want to delete this skill?"
          title="Delete skill"
          noFunction={() => setDeletingSkill(null)}
          yesFunction={handleDeleteConfirmed}
        />
      )}

      {/* edit dialog (GenericDialog) */}
      <GenericDialog
        child={
          <SkillDialog
            skillObject={editingSkill || undefined}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        }
        isOpen={openEditDialog}
        handleClose={() => {
          setOpenEditDialog(false);
          setEditingSkill(null);
        }}
        title={"Edit skill"}
      />

      <SearchableList<TSkill>
        categoryName="skill"
        headersList={headers}
        tableColumns={tableColumns}
        data={data}
        renderRow={(item, i) => (
          <SkillRow
            key={item.id}
            skill={item}
            index={i + 1 + (currentPage - 1) * DEFAULT_PAGE_SIZE}
            onEdit={() => {
              setEditingSkill(item);
              setOpenEditDialog(true);
            }}
            onDelete={() => setDeletingSkill(item)}
          />
        )}
        searchFunction={search}
        dialogComponent={
          <SkillDialog
            skillObject={emptyNewSkill}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        }
        dialogOpen={openAddDialog}
        onDialogOpenChange={() => setOpenAddDialog((v) => !v)}
        handleClickFirstPage={firstPage}
        handleClickLastPage={lastPage}
        handleClickNext={nextPage}
        handleClickPrevious={prevPage}
        currentPage={currentPage}
        listLength={totalResults}
      />
    </div>
  );
}
