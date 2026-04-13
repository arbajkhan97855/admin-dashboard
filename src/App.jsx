import React from "react";
import {useNavigate} from "react-router-dom"
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./assets/css/main.css";
import "./App.css";
import { PRoutes } from "./Router";
import { AuthProvider } from "./context/authContext";


function AppRoutes() {
  const routing = useRoutes(PRoutes); 
  return routing;
}


function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
