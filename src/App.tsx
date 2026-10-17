import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import UsersPage from "./pages/UsersPage";
import ClaimsPage from "./pages/ClaimsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="claims" element={<ClaimsPage />} />
        <Route path="courses" element={<Navigate to="/claims" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected routes (token required) */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<ItemsPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="items/:id" element={<ItemDetailPage />} />
          <Route path="submissions" element={<Navigate to="/items" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;