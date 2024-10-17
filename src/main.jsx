import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminPanel, PharmacyRegistration, HomePage, SignIn } from "./pages";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path= "/sign-up" element  ={<PharmacyRegistration/>}/>
          <Route path= "/adminPanel/:id" element  ={<AdminPanel/>}/>
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </Router>
    </StrictMode>
  </GoogleOAuthProvider>
);
