import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
      width: 300,
    },
    {
      field: "adress1",
      headerName: "DIRECCION",
      width: 200,
    },
    {
      field: "department",
      headerName: "DEPARTAMENTO",
      width: 200,
    },
    {
      field: "city",
      headerName: "CIUDAD",
      width: 200,
    },
    {
      field: "company",
      headerName: "ENTIDAD FINANCIERA",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,

      renderCell: (cellValues) => {
        return <AgencyModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
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
