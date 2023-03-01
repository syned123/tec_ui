import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUiStore } from "../../../hooks/useUiStore";
import { useContactStore } from "../../../hooks/useContactStore";

export const AddNewContact = () => {
  const { openTecModal } = useUiStore();
  const { setActiveRow } = useContactStore();
  const handleClickNew = () => {
    setActiveRow({
      name: "",
      lastname: "",
      phone: "",
      charge: "",
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
