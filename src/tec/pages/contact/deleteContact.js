import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useContactStore } from "../../../hooks/useContactStore";


export const DeleteContact = () => {
  const { deleteRow } = useContactStore();
  const handleDelete = () => {
    deleteRow();
  };
  return (
    <>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};
