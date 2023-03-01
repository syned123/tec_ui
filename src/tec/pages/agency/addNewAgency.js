import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUiStore } from "../../../hooks/useUiStore";
import { useAgencyStore } from "../../../hooks/useAgencyStore";

export const AddNewAgency = () => {
  const { openTecModal } = useUiStore();
  const { setActiveRow } = useAgencyStore();
  const handleClickNew = () => {
    setActiveRow({
      nameAgency: "",
      adress1: "",
      department: "",
      city: "",
      company: "",
    });
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
