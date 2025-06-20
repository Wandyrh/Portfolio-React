import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import MainLayout from "./layouts/MainLayout";
import ProductCategory from "./pages/ProductCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="product-categories" element={<ProductCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
