import { Box, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useTicketStore } from "../../../hooks/useTicketStore";
import { useEffect } from "react";
export const Ticket = () => {
  const { rows, setActiveRow, startLoadingTicket } = useTicketStore();
  const columns = [
    {
      field: "make",
      headerName: "Marca",
      width: 100,
    },
    {
      field: "model",
      headerName: "Modelo",
      width: 100,
    },
    {
      field: "serie",
      headerName: "Serie",
      width: 100,
    },
    {
      field: "cnt",
      headerName: "CNT",
      width: 100,
    },
    {
      field: "agency",
      headerName: "Agencia",
      width: 200,
    },
    {
      field: "city",
      headerName: "Ciudad",
      width: 100,
    },
    {
      field: "company",
      headerName: "Entidad Financiera",
      width: 100,
    },
  ];
  useEffect(() => {
    startLoadingTicket();
  }, []);
  return (
    <div className="contegrip">
      <div className="conthead">
        <div>
          <span>Boletas</span>
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
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </div>
    </div>
  );
};
