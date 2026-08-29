// src/App.tsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<div className="text-xl">Main Page (Catalog)</div>}
          />
          <Route
            path="/categories/:categoryId"
            element={<div className="text-xl">Category Page</div>}
          />
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
}

export default App;
