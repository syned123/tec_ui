import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadUser,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/usuarioSlice";

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { rows, activeRows } = useSelector((state) => state.user);
  const setActiveRow = (userRow) => {
    dispatch(onSetActiveRows(userRow));
  };
  const startSavingRow = async (userRow) => {
    if (userRow.id) {
      await tecApi.put(`/auth/putUser/${userRow.id}`, userRow);
      dispatch(onUpdateRow({ ...userRow }));
    } else {
      const { data } = await tecApi.post("/auth/new", userRow);
      dispatch(onAddNewRow({ ...userRow, id: data.id }));
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
  const startLoadingUser = async () => {
    try {
      const { data } = await tecApi.get("/auth/getuser");
      dispatch(onLoadUser(data));
    } catch (error) {
      console.log("error cargando usuarios");
      console.log(error);
    }
  };
  return {
    rows,
    activeRows,
    setActiveRow,
    startSavingRow,
    deleteRow,
    startLoadingUser,
  };
};
