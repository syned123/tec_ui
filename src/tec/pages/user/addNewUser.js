import { useUiStore } from "../../../hooks/useUiStore";
import { useUserStore } from "../../../hooks/useUserStore";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

export const AddNewUser = () => {
  const { openTecModal } = useUiStore();
  const { setActiveRow } = useUserStore();
  const handleClickNew = () => {
    setActiveRow({
      name: "",
      lastname: "",
      email: "",
      password: "",
      rol: "",
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
