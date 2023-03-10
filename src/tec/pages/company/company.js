import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
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
      headerClassName: "super-app-theme--header",
      width: 300,
    },
    {
      field: "code",
      headerName: "CODIGO FINANCIERA",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "entityType",
      headerName: "TIPO DE ENTIDAD",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "Editar",
      headerName: "Editar",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (cellValues) => {
        return <CompanyModal />;
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      headerClassName: "super-app-theme--header",
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
    </>
  );
};
