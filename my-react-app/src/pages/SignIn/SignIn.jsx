import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginSuccess, loginFailure, setUser } from "../../features/authSlice";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState(""); // 1. Initialiser l'email saisi par l'utilisateur.
  const [password, setPassword] = useState(""); // 2. Initialiser le mot de passe saisi par l'utilisateur.
  const [errorMessage, setErrorMessage] = useState(""); // 3. Stocker les éventuelles erreurs de connexion.
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 4. Vérifier si l'utilisateur est déjà authentifié.
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 5. Envoyer une requête API pour obtenir un token en fonction des identifiants fournis.
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.body.token; // 6. Récupérer le token depuis la réponse de l'API.
        dispatch(loginSuccess(token)); // 7. Enregistrer le token dans Redux.

        // 8. Utiliser le token pour récupérer les informations utilisateur.
        const profileResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 9. Ajouter le token dans les headers pour autoriser l'accès.
          },
        });
        const profileData = await profileResponse.json();

        if (profileResponse.ok) {
          dispatch(setUser(profileData.body)); // 10. Enregistrer les informations utilisateur dans Redux.
          setErrorMessage("");
        } else {
          throw new Error(profileData.message || "Failed to fetch user profile");
        }
      } else {
        throw new Error(data.message || "Invalid credentials"); // 11. Gérer les erreurs si les identifiants sont invalides.
      }
    } catch (error) {
      dispatch(loginFailure(error.message)); // 12. Enregistrer l'erreur dans Redux si la connexion échoue.
      setErrorMessage(error.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/user" />; // 13. Rediriger vers la page utilisateur si la connexion est réussie.
  }

  return (
    <div className="sign-in-page">
  
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="/img/argentBankLogo.webp"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default SignIn;
// Suite logique dans le fichier authSlice.js.
