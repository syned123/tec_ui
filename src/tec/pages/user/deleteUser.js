import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserStore } from "../../../hooks/useUserStore";
export const DeleteUser = () => {
  const { deleteRow } = useUserStore();
  const handleDelete = () => {
    deleteRow();
  };
  return (
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};
