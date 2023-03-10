import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useEquipStore } from "../../../hooks/useEquimentStore";

import { AddNewEquipment } from "./addNewEquipment";
import { DeleteEquipment } from "./deleteEquipment";
import { EquipmentModal } from "./equipmentModal";

export const Equipment = () => {
  const { rowsEquipment, setActiveRow, startLoadingEquipment } =
    useEquipStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "TIPO DE EQUIPO",
      headerClassName: "super-app-theme--header",
      width: 300,
    },
    {
      field: "make",
      headerName: "MARCA",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "model",
      headerName: "MODELO",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "serie",
      headerName: "SERIE",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <EquipmentModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <DeleteEquipment />;
      },
    },
  ];
  const onClick = (row) => {
    setActiveRow(row.row);
  };
  useEffect(() => {
    startLoadingEquipment();
  }, []);

  return (
    <div className="contegrip">
      <div className="conthead">
        <div>
          <span>Equipos</span>
        </div>
        <div>
          <AddNewEquipment />
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
            rows={rowsEquipment}
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
