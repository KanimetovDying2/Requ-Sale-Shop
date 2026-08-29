import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CataloguePage from "./pages/CataloguePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewItemPage from "./pages/NewItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CataloguePage />} />
          <Route path="/categories/:categoryId" element={<CataloguePage />} />
          <Route path="/items/new" element={<NewItemPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <div className="text-xl font-semibold text-center mt-12 text-gray-700">
                404 — Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
