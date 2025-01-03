import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen.tsx";
import RegistrationScreen from "./screens/RegistrationScreen/RegistrationScreen.tsx";
import ChatScreen from "./screens/ChatScreen/ChatScreen.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import ChatContextProvider from "./contexts/ChatContext.tsx";
import React from "react";
// Definindo o componente de rotas
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>PAGINA INICIAL</h1>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route
          path="/chat"
          element={
            <AuthContextProvider>
              <ChatContextProvider>
                <ChatScreen />
              </ChatContextProvider>
            </AuthContextProvider>
          }
        />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
