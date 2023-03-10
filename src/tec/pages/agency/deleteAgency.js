import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAgencyStore } from "../../../hooks/useAgencyStore";
export const DeleteAgency = () => {
  const { deleteRow } = useAgencyStore();
  const handleDelete = () => {
    deleteRow();
  };
  return (
    <IconButton onClick={handleDelete} style={{ color: "rgb(255 0 0)" }}>
      <DeleteIcon />
    </IconButton>
  );
};
