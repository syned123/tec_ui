import { createSlice } from "@reduxjs/toolkit";
export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    isLoadingContact: true,
    rowsContact: [],
    activeRows: null,
  },
  reducers: {
    onSetActiveRows: (state, { payload }) => {
      state.activeRows = payload;
    },
    onAddNewRow: (state, { payload }) => {
      state.rowsContact.push(payload);
      state.activeRows = null;
    },
    onUpdateRow: (state, { payload }) => {
      state.rowsContact = state.rowsContact.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteRow: (state) => {
      if (state.activeRows) {
        state.rowsContact = state.rowsContact.filter(
          (event) => event.id !== state.activeRows.id
        );
        state.activeRows = null;
      }
    },
    onLoadContact: (state, { payload = [] }) => {
      state.isLoadingContact = false;

      payload.forEach((element) => {
        const exists = state.rowsContact.some(
          (dbContact) => dbContact.id === element.id
        );
        if (!exists) {
          state.rowsContact.push(element);
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
  onLoadContact,
} = contactSlice.actions;
