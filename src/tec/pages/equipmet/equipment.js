import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useEquipStore } from "../../../hooks/useEquimentStore";

import { AddNewEquipment } from "./addNewEquipment";
import { DeleteEquipment } from "./deleteEquipment";
import { EquipmentModal } from "./equipmentModal";

export const Equipment = () => {
  const { rowsEquipment, setActiveRow, startLoadingEquipment } = useEquipStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "TIPO DE EQUIPO",
      width: 300,
    },
    {
      field: "make",
      headerName: "MARCA",
      width: 200,
    },
    {
      field: "model",
      headerName: "MODELO",
      width: 200,
    },
    {
      field: "serie",
      headerName: "SERIE",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,

      renderCell: (cellValues) => {
        return <EquipmentModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
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
          <span>Entidades Financieras</span>
        </div>
        <div>
          <AddNewEquipment />
        </div>
      </div>

      <div className="contgri">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
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
