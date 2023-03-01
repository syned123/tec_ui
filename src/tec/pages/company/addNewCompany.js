import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUiStore } from "../../../hooks/useUiStore";
import { useCompanyStore } from "../../../hooks/useCompanyStore";
export const AddNewCompany = () => {
  const { openTecModal } = useUiStore();
  const { setActiveRow } = useCompanyStore();
  const handleClickNew = () => {
    setActiveRow({ name: "", code: "", entityType: "" });
    openTecModal();
  };
  return (
    <Fab
      size="small"
      style={{ color: "#e0e0e0", backgroundColor: "rgb(6 96 21)" }}
      aria-label="add"
      onClick={handleClickNew}
    >
      <AddIcon />
    </Fab>
  );
};
