import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      {!user ? (
        <Route path="*" element={<Login />} />
      ) : (
        <Route path="*" element={<Dashboard />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
