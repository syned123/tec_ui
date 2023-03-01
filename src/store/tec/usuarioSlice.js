import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoadingUser: true,
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
    onLoadUser: (state, { payload = [] }) => {
      state.isLoadingUser = false;
      payload.user.forEach((element) => {
        const exists = state.rows.some((dbUser) => dbUser.id === element.id);
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
  onLoadUser,
} = userSlice.actions;
