import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoadingCompany: true,
    rows: [],
    activeRows: null,
  },
  reducers: {
    onSetActiveRows: (state, { payload }) => {
      state.activeRows = payload;
    },
    onAddNewRow: (state, { payload }) => {
      state.rows.push(payload);
      state.activeRows = null;
    },
    onUpdateRow: (state, { payload }) => {
      state.rows = state.rows.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteRow: (state) => {
      if (state.activeRows) {
        state.rows = state.rows.filter(
          (event) => event.id !== state.activeRows.id
        );
        state.activeRows = null;
      }
    },
    onLoadCompany: (state, { payload = [] }) => {
      state.isLoadingCompany = false;
      payload.company.forEach((element) => {
        const exists = state.rows.some(
          (dbCompany) => dbCompany.id === element.id
        );
        if (!exists) {
          state.rows.push(element);
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
  onLoadCompany,
} = companySlice.actions;
