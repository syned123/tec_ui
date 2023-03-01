import { createSlice } from "@reduxjs/toolkit";
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isTecModalOpen: false,
  },
  reducers: {
    onOpenTecModal: (state) => {
      state.isTecModalOpen = true;
    },
    onCloseTecModal: (state) => {
      state.isTecModalOpen = false;
    },
  },
});
export const { onOpenTecModal, onCloseTecModal } = uiSlice.actions;
