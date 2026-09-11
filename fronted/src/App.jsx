import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import AddCrop from "./pages/AddCrop";
import MyProduce from "./pages/MyProduce";
import CropDetails from "./pages/CropDetails";
import EditCrop from "./pages/EditCrop";
import QualityCheck from "./pages/QualityCheck";

function Layout({ children }) {
  return (
    <div className="app-shell">

      <header className="topbar">

        <div>
          <div className="brand">
            🌱 AgriFlow
          </div>

          <div className="subtitle">
            Crop Management & Quality Check
          </div>
        </div>

        <nav className="nav">

          <NavLink to="/my-produce">
            My Produce
          </NavLink>

          <NavLink to="/add-crop">
            Add Crop
          </NavLink>

        </nav>

      </header>

      <main className="container">
        {children}
      </main>

    </div>
  );
}

export default function App() {
  return (
    <Layout>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/my-produce" replace />}
        />

        <Route
          path="/my-produce"
          element={<MyProduce />}
        />

        <Route
          path="/add-crop"
          element={<AddCrop />}
        />

        <Route
          path="/crop/:id"
          element={<CropDetails />}
        />

        <Route
          path="/edit-crop/:id"
          element={<EditCrop />}
        />

        <Route
          path="/quality-check/:id"
          element={<QualityCheck />}
        />

        <Route
          path="*"
          element={<Navigate to="/my-produce" replace />}
        />

      </Routes>

    </Layout>
  );
}