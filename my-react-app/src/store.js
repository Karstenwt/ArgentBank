import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // 28. Ajouter le reducer auth pour gérer l'état global de l'authentification.
  },
});

export default store;
// Suite logique dans le fichier index.js.
