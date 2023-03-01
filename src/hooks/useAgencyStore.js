import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadAgency,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/agencySlice";

export const useAgencyStore = () => {
  const dispatch = useDispatch();
  const { rowsAgency, activeRows } = useSelector((state) => state.agency);
  const setActiveRow = (agencyRow) => {
    dispatch(onSetActiveRows(agencyRow));
  };
  const startSavingRow = async (agencyRow) => {
    if (agencyRow.id) {
      await tecApi.put(`/agency/updateAgency/${agencyRow.id}`, agencyRow);
      dispatch(onUpdateRow({ ...agencyRow }));
    } else {
      const { data } = await tecApi.post("/agency/postAgency", agencyRow);
      dispatch(onAddNewRow({ ...agencyRow, id: data.agency.id }));
    }
  };
  const deleteRow = async () => {
    try {
      await tecApi.delete(`/agency/deleteAgency/${activeRows.id}`);
      dispatch(onDeleteRow());
    } catch (error) {
      console.log(error);
    }
  };
  const startLoadingAgency = async () => {
    try {
      const { data } = await tecApi.get("/agency/getAgency");
      const agency = [];
      data.agencyList.map((elem) => {
        agency.push({
          id: elem.id,
          nameAgency: elem.nameAgency,
          adress1: elem.adress1,
          department: elem.department,
          city: elem.city,
          company: elem.company.name,
        });
      });
      dispatch(onLoadAgency(agency));
    } catch (error) {
      console.log("error cargando agencias");
      console.log(error);
    }
  };
  return {
    rowsAgency,
    activeRows,
    setActiveRow,
    startSavingRow,
    deleteRow,
    startLoadingAgency,
  };
};
