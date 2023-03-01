import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { agencySlice } from "./tec/agencySlice";
import { companySlice } from "./tec/companySlice";
import { contactSlice } from "./tec/contactSlice";
import { equipmentSlice } from "./tec/equipmentSlice";
import { ticketSlice } from "./tec/ticketSlice";
import { userSlice } from "./tec/usuarioSlice";

import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    ticket: ticketSlice.reducer,
    user: userSlice.reducer,
    contact: contactSlice.reducer,
    agency: agencySlice.reducer,
    company: companySlice.reducer,
    equipment: equipmentSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});
