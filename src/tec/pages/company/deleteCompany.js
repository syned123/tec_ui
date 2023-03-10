import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useCompanyStore } from "../../../hooks/useCompanyStore";

export const DeleteCompany = () => {
  const { deleteRow } = useCompanyStore();
  const handleDelete = () => {
    deleteRow();
  };
  return (
    <>
      <IconButton onClick={handleDelete} style={{ color: "rgb(255 0 0)" }}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};
