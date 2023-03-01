import { Fab } from "@mui/material";
import { useEquipStore } from "../../../hooks/useEquimentStore";
import { useUiStore } from "../../../hooks/useUiStore";
import AddIcon from "@mui/icons-material/Add";

export const AddNewEquipment = () => {
  const { openTecModal } = useUiStore();
  const { setActiveRow } = useEquipStore();
  const handleClickNew = () => {
    setActiveRow({
      type: "",
      make: "",
      model: "",
      serie: "",
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
