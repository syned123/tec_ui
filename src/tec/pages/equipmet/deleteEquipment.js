import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEquipStore } from "../../../hooks/useEquimentStore";
export const DeleteEquipment = () => {
  const { deleteRow } = useEquipStore();
  const handleDelete = () => {
    deleteRow();
  };
  return (
    <IconButton onClick={handleDelete} style={{ color: "rgb(255 0 0)" }}>
      <DeleteIcon />
    </IconButton>
  );
};
