import { createSlice } from "@reduxjs/toolkit";
// const tempRow = { id: 1, name: 1, code: "Snow", entityType: "Jon" };
export const agencySlice = createSlice({
  name: "agency",
  initialState: {
    isLoadingAgency: true,
    rowsAgency: [],
    activeRows: null,
  },
  reducers: {
    onSetActiveRows: (state, { payload }) => {
      state.activeRows = payload;
    },
    onAddNewRow: (state, { payload }) => {
      state.rowsAgency.push(payload);
      state.activeRows = null;
    },
    onUpdateRow: (state, { payload }) => {
      state.rowsAgency = state.rowsAgency.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteRow: (state) => {
      if (state.activeRows) {
        state.rowsAgency = state.rowsAgency.filter(
          (event) => event.id !== state.activeRows.id
        );
        state.activeRows = null;
      }
    },
    onLoadAgency: (state, { payload = [] }) => {
      state.isLoadingAgency = false;
      payload.forEach((element) => {
        const exists = state.rowsAgency.some(
          (dbAgency) => dbAgency.id === element.id
        );
        if (!exists) {
          state.rowsAgency.push(element);
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
  onLoadAgency,
} = agencySlice.actions;
