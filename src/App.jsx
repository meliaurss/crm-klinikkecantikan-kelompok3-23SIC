import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import FormReservasi from "./pages/FormReservasi";
import FormDataDiri from "./pages/FormDataDiri";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/admin" element={<Dashboard/>} />
      <Route path="/produk" element={< ProductManagement/>} />
      <Route path="/reservasi" element={< FormReservasi/>} />
      <Route path="/data-diri" element={< FormDataDiri/>} />
      <Route path="/datapelanggan" element={<SalesManagement/>} />
      </Route>
    </Routes>
  );
}

