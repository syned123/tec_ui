import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
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
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "lastname",
      headerName: "APELLIDOS",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "email",
      headerName: "CORREO",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "rol",
      headerName: "ROL",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <UserModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      headerClassName: "super-app-theme--header",
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
          <span>Usuarios</span>
        </div>
        <div>
          <AddNewUser />
        </div>
      </div>

      <div className="contgri">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "#007c15",
              boxShadow: "0 0 5px #999999",
              fontFamily: "GoticN",
              "& .super-app-theme--header": {
                color: "#fff",
                backgroundColor: "#222e3c",
                fontWeight: "bold",
                fontFamily: "Gotic",
              },
            }}
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
