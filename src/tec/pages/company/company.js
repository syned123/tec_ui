import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useCompanyStore } from "../../../hooks/useCompanyStore";
// import { useUiStore } from "../../../hooks/useUiStore";
import { AddNewCompany } from "./addNewCompany";
import { CompanyModal } from "./companyModal";
import { DeleteCompany } from "./deleteCompany";

export const Company = () => {
  const { rows, setActiveRow, startLoadingCompany } = useCompanyStore();
  // const { openTecModal } = useUiStore();
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "ENTIDAD FINANCIERA",
      width: 300,
    },
    {
      field: "code",
      headerName: "CODIGO FINANCIERA",
      width: 200,
    },
    {
      field: "entityType",
      headerName: "TIPO DE ENTIDAD",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,

      renderCell: (cellValues) => {
        return <CompanyModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 100,

      renderCell: (cellValues) => {
        return <DeleteCompany />;
      },
    },
  ];

  const onClick = (row) => {
    console.log(row);
    // openTecModal();
    setActiveRow(row.row);
  };
  useEffect(() => {
    startLoadingCompany();
  }, []);

  return (
    <>
      <div className="contegrip">
        <div className="conthead">
          <div>
            <span>Entidades Financieras</span>
          </div>
          <div>
            <AddNewCompany />
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
    </>
  );
};
