import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadTicket,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/ticketSlice";

export const useTicketStore = () => {
  const dispatch = useDispatch();
  const { rows, activeRows } = useSelector((state) => state.ticket);
  const setActiveRow = (ticketRow) => {
    dispatch(onSetActiveRows(ticketRow));
  };
  const startSavingRow = async (ticketRow) => {
    if (ticketRow.id) {
      await tecApi.put(`/ticket/updateTicket/${ticketRow.id}`, ticketRow);
      dispatch(onUpdateRow({ ...ticketRow }));
    } else {
      const { data } = await tecApi.post("/ticket/postTicket", ticketRow);
      dispatch(onAddNewRow({ ...ticketRow, id: data.ticket.id }));
    }
  };
  const deleteRow = async () => {
    try {
      await tecApi.delete(`/ticket/deleteTicket/${activeRows.id}`);
      dispatch(onDeleteRow());
    } catch (error) {
      console.log(error);
    }
  };
  const startLoadingTicket = async () => {
    try {
      const { data } = await tecApi.get("/ticket/getTicket");
      console.log(data.ticket);
      var ticketUp = [];
      data.ticket.map((elem) => {
        ticketUp.push({
          id: elem.id,
          agency: elem.agency.nameAgency,
          city: elem.city,
          cnt: elem.cnt,
          code: elem.code,
          company: elem.company.name,
          entity: elem.entity,
          make: elem.equipment.make,
          model: elem.equipment.model,
          serie: elem.equipment.serie,

          status: elem.status,
          typeService: elem.typeService,
        });
      });
      dispatch(onLoadTicket(ticketUp));
    } catch (error) {
      console.log("error cargando Boletas");
      console.log(error);
    }
  };
  return {
    rows,
    activeRows,
    startLoadingTicket,
    deleteRow,
    startSavingRow,
    setActiveRow,
  };
};
