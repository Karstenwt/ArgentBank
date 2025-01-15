import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // 15. Initialiser le token à null.
  isAuthenticated: false, // 16. Vérifier si l'utilisateur est authentifié.
  error: null, // 17. Gérer les erreurs éventuelles.
  user: null, // 18. Stocker les informations de l'utilisateur.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload; // 19. Enregistrer le token après une connexion réussie.
      state.isAuthenticated = true; // 20. Marquer l'utilisateur comme authentifié.
      state.error = null; // 21. Réinitialiser les erreurs après une connexion réussie.
    },
    loginFailure: (state, action) => {
      state.error = action.payload; // 22. Enregistrer l'erreur en cas d'échec de la connexion.
    },
    logout: (state) => {
      state.token = null; // 23. Réinitialiser le token lors de la déconnexion.
      state.isAuthenticated = false; // 24. Marquer l'utilisateur comme déconnecté.
      state.user = null; // 25. Réinitialiser les informations utilisateur.
      state.error = null; // 26. Réinitialiser les erreurs.
    },
    setUser: (state, action) => {
      state.user = action.payload; // 27. Stocker les informations utilisateur après récupération.
    },
  },
});

export const { loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;
export default authSlice.reducer;
// Suite logique dans le fichier store.js.
