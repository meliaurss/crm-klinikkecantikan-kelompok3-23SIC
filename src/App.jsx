import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import FormReservasi from "./pages/FormReservasi";
import FormDataDiri from "./pages/FormDataDiri";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";
import Feedback from "./pages/feedback";
import ReservasiManagement from "./pages/ReservasiManagement";
import FaqManagement from "./pages/FaqManagement";


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
      <Route path="admin" element={<Dashboard/>} />
      <Route path="datapelanggan" element={<SalesManagement/>} />
      <Route path="feedback" element={<Feedback/>} />
      <Route path="/reservasi-management" element={< ReservasiManagement/>} />
      <Route path="/faq" element={<FaqManagement />} />
      </Route>
    </Routes>
  );
}

