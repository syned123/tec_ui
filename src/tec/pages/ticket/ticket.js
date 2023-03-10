import { Box, Fab, IconButton } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useTicketStore } from "../../../hooks/useTicketStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Pdf } from "./Pdf";
import { PDFViewer } from "@react-pdf/renderer";
import { AiOutlinePrinter } from "react-icons/ai";
export const Ticket = () => {
  const { rows, setActiveRow, startLoadingTicket } = useTicketStore();
  const [value, setValue] = useState(null);
  const [verPdf, setVerPdf] = useState(false);
  const columns = [
    {
      field: "make",
      headerClassName: "super-app-theme--header",
      headerName: "Marca",
      width: 100,
    },
    {
      field: "model",
      headerClassName: "super-app-theme--header",
      headerName: "Modelo",
      width: 100,
    },
    {
      field: "serie",
      headerName: "Serie",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "cnt",
      headerName: "CNT",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "agency",
      headerName: "Agencia",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "city",
      headerName: "Ciudad",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "company",
      headerName: "Entidad Financiera",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "Editar",
      headerName: "EDITAR",
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Link to={"/ticket/edit/" + cellValues.id}>
            <IconButton style={{ color: "#00ff2a" }}>
              <EditIcon />
            </IconButton>
          </Link>
        );
      },
    },
    {
      field: "Pdf",
      headerName: "PDF",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <IconButton
            onClick={() => {
              setVerPdf(!verPdf);
              setValue(cellValues.row);
            }}
          >
            <AiOutlinePrinter />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    startLoadingTicket();
  }, []);
  // console.log(value);

  return (
    <div className="contegrip">
      {verPdf === false ? (
        <>
          <div className="conthead">
            <div>
              <span className="title-table">Boletas</span>
            </div>
            <div>
              <Link to="/create/ticket">
                <Fab
                  size="small"
                  style={{ color: "#e0e0e0", backgroundColor: "rgb(6 96 21)" }}
                >
                  <AddIcon />
                </Fab>
              </Link>
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
              />
            </Box>
          </div>
        </>
      ) : (
        <>
          <PDFViewer style={{ width: "100%", height: "80vh" }}>
            {verPdf ? <Pdf name={value} /> : null}
          </PDFViewer>
        </>
      )}
    </div>
  );
};
