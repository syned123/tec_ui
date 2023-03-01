import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useContactStore } from "../../../hooks/useContactStore";
import { AddNewContact } from "./addNewContact";
import { ContactModal } from "./contactModal";
import { DeleteContact } from "./deleteContact";

// import { useUiStore } from "../../../hooks/useUiStore";

export const Contact = () => {
  const { rowsContact, setActiveRow, startLoadingContact } = useContactStore();
  // const { openTecModal } = useUiStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "ENTIDAD FINANCIERA",
      width: 300,
    },
    {
      field: "lastname",
      headerName: "CODIGO FINANCIERA",
      width: 200,
    },
    {
      field: "phone",
      headerName: "TIPO DE ENTIDAD",
      width: 200,
    },
    {
      field: "charge",
      headerName: "TIPO DE ENTIDAD",
      width: 200,
    },
    {
      field: "company",
      headerName: "TIPO DE ENTIDAD",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,

      renderCell: (cellValues) => {
        return <ContactModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 100,

      renderCell: (cellValues) => {
        return <DeleteContact />;
      },
    },
  ];

  const onClick = (row) => {
    console.log(row);
    // openTecModal();
    setActiveRow(row.row);
  };
  useEffect(() => {
    startLoadingContact();
  }, []);

  return (
    <>
      <div className="contegrip">
        <div className="conthead">
          <div>
            <span>Entidades Financieras</span>
          </div>
          <div>
            <AddNewContact />
          </div>
        </div>

        <div className="contgri">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              style={{ backgroundColor: "#222e3c" }}
              rows={rowsContact}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
              onRowClick={onClick}
            />
          </Box>
        </div>
      </div>
    </>
  );
};
