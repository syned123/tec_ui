import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadCompany,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/companySlice";

export const useCompanyStore = () => {
  const dispatch = useDispatch();
  const { rows, activeRows } = useSelector((state) => state.company);
  console.log(rows, activeRows);
  const setActiveRow = (companyRow) => {
    dispatch(onSetActiveRows(companyRow));
  };
  const startSavingRow = async (companyRow) => {
    if (companyRow.id) {
      await tecApi.put(`/company/updateCompany/${companyRow.id}`, companyRow);
      dispatch(onUpdateRow({ ...companyRow }));
    } else {
      const { data } = await tecApi.post("/company/postCompany", companyRow);
      dispatch(onAddNewRow({ ...companyRow, id: data.company.id }));
    }
  };
  const deleteRow = async () => {
    try {
      await tecApi.delete(`/company/deleteCompany/${activeRows.id}`);
      dispatch(onDeleteRow());
    } catch (error) {
      console.log(error);
    }
  };
  const startLoadingCompany = async () => {
    try {
      const { data } = await tecApi.get("/company/getCompany");
      dispatch(onLoadCompany(data));
    } catch (error) {
      console.log("error cargando compañias");
      console.log(error);
    }
  };
  return {
    rows,
    activeRows,
    setActiveRow,
    startSavingRow,
    deleteRow,
    startLoadingCompany,
  };
};
