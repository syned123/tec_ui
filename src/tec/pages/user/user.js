import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useUserStore } from "../../../hooks/useUserStore";
import { AddNewUser } from "./addNewUser";
import { DeleteUser } from "./deleteUser";
import { UserModal } from "./userModal";

export const User = () => {
  const { rows, setActiveRow, startLoadingUser } = useUserStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "NOMBRES",
      width: 300,
    },
    {
      field: "lastname",
      headerName: "APELLIDOS",
      width: 200,
    },
    {
      field: "email",
      headerName: "CORREO",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,

      renderCell: (cellValues) => {
        return <UserModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 100,

      renderCell: (cellValues) => {
        return <DeleteUser />;
      },
    },
  ];
  const onClick = (row) => {
    console.log(row);
    // openTecModal();
    setActiveRow(row.row);
  };
  useEffect(() => {
    startLoadingUser();
  }, []);
  return (
    <div className="contegrip">
      <div className="conthead">
        <div>
          <span>Entidades Financieras</span>
        </div>
        <div>
          <AddNewUser />
        </div>
      </div>

      <div className="contgri">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            style={{ backgroundColor: "#222e3c" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            onRowClick={onClick}
          />
        </Box>
      </div>
    </div>
  );
};
