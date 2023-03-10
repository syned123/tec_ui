import { createSlice } from "@reduxjs/toolkit";
export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    isLoadingTicket: true,
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
    onLoadTicket: (state, { payload = [] }) => {
      state.isLoadingTicket = false;
      // console.log("payload", payload);
      payload.forEach((element) => {
        const exists = state.rows.some(
          (dbTicket) => dbTicket.id === element.id
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
  onLoadTicket,
} = ticketSlice.actions;
