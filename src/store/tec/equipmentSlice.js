import { createSlice } from "@reduxjs/toolkit";

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState: {
    isLoadingEquipment: true,
    rowsEquipment: [],
    activeRows: null,
  },
  reducers: {
    onSetActiveRows: (state, { payload }) => {
      state.activeRows = payload;
    },
    onAddNewRow: (state, { payload }) => {
      state.rowsEquipment.push(payload);
      state.activeRows = null;
    },
    onUpdateRow: (state, { payload }) => {
      state.rowsEquipment = state.rowsEquipment.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteRow: (state) => {
      if (state.activeRows) {
        state.rowsEquipment = state.rowsEquipment.filter(
          (event) => event.id !== state.activeRows.id
        );
        state.activeRows = null;
      }
    },
    onLoadEquipment: (state, { payload = [] }) => {
      state.isLoadingEquipment = false;
      // console.log("payload", payload);
      payload.equipment.forEach((element) => {
        const exists = state.rowsEquipment.some(
          (dbEquipment) => dbEquipment.id === element.id
        );
        if (!exists) {
          state.rowsEquipment.push(element);
        }
      });
    },
  },
});
export const {
  onSetActiveRows,
  onAddNewRow,
  onUpdateRow,
  onDeleteRow,
  onLoadEquipment,
} = equipmentSlice.actions;
