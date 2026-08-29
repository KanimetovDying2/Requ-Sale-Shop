import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CataloguePage from "./pages/CataloguePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CataloguePage />} />
          <Route path="/categories/:categoryId" element={<CataloguePage />} />
          <Route
            path="/items/:id"
            element={<div className="text-xl">Item Details Page</div>}
          />
          <Route
            path="/items/new"
            element={<div className="text-xl">New Item Page</div>}
          />
          <Route
            path="/register"
            element={<div className="text-xl">Register Page</div>}
          />
          <Route
            path="/login"
            element={<div className="text-xl">Login Page</div>}
          />
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
