import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAgencyStore } from "../../../hooks/useAgencyStore";
import { AddNewAgency } from "./addNewAgency";
import { AgencyModal } from "./agencyModal";
import { DeleteAgency } from "./deleteAgency";

export const Agency = () => {
  const { rowsAgency, setActiveRow, startLoadingAgency } = useAgencyStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "nameAgency",
      headerName: "NOMBRE AGENCIA",
      headerClassName: "super-app-theme--header",
      width: 300,
    },
    {
      field: "adress1",
      headerName: "DIRECCION",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "department",
      headerName: "DEPARTAMENTO",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "city",
      headerName: "CIUDAD",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "company",
      headerName: "ENTIDAD FINANCIERA",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <AgencyModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <DeleteAgency />;
      },
    },
  ];
  const onClick = (row) => {
    setActiveRow(row.row);
  };
  useEffect(() => {
    startLoadingAgency();
  }, []);

  return (
    <div className="contegrip">
      <div className="conthead">
        <div>
          <span>Agencias</span>
        </div>
        <div>
          <AddNewAgency />
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
            rows={rowsAgency}
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
