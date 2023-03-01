import { useDispatch, useSelector } from "react-redux";
import tecApi from "../api/tecApi";
import {
  onAddNewRow,
  onDeleteRow,
  onLoadEquipment,
  onSetActiveRows,
  onUpdateRow,
} from "../store/tec/equipmentSlice";

export const useEquipStore = () => {
  const dispatch = useDispatch();
  const { rowsEquipment, activeRows } = useSelector((state) => state.equipment);
  const setActiveRow = (equipmentRow) => {
    dispatch(onSetActiveRows(equipmentRow));
  };
  const startSavingRow = async (equipmentRow) => {
    if (equipmentRow.id) {
      await tecApi.put(
        `/equipment/updateEquipment/${equipmentRow.id}`,
        equipmentRow
      );
      dispatch(onUpdateRow({ ...equipmentRow }));
    } else {
      const { data } = await tecApi.post(
        "/equipment/postEquipment",
        equipmentRow
      );
      dispatch(onAddNewRow({ ...equipmentRow, id: data.equipment.id }));
    }
  };
  const deleteRow = async () => {
    try {
      await tecApi.delete(`/equipment/deleteEquipment/${activeRows.id}`);
      dispatch(onDeleteRow());
    } catch (error) {
      
    }
  };
  const startLoadingEquipment = async () => {
    try {
      const { data } = await tecApi.get("/equipment/getEquipment");
      dispatch(onLoadEquipment(data));
    } catch (error) {
      console.log("error cargando compañias");
      console.log(error);
    }
  };
  return {
    rowsEquipment,
    activeRows,
    setActiveRow,
    startSavingRow,
    deleteRow,
    startLoadingEquipment,
  };
};
