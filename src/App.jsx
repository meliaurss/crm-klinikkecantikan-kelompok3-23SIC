import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import FormReservasi from "./pages/FormReservasi";
<<<<<<< HEAD
import FormDataDiri from "./pages/FormDataDiri";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";
<<<<<<< HEAD
=======
import Feedback from "./pages/feedback";
>>>>>>> KELOMPOK3/Kinantiara
=======
import ReservasiManagement from "./pages/ReservasiManagement";

>>>>>>> KELOMPOK3/indah

export default function App() {
  return (

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<LandingPage/>} />
<<<<<<< HEAD
      <Route path="/admin" element={<Dashboard/>} />
      <Route path="/produk" element={< ProductManagement/>} />
      <Route path="/reservasi" element={< FormReservasi/>} />
<<<<<<< HEAD
      <Route path="/data-diri" element={< FormDataDiri/>} />
      <Route path="/datapelanggan" element={<SalesManagement/>} />
=======
      <Route path="admin" element={<Dashboard/>} />
      <Route path="datapelanggan" element={<SalesManagement/>} />
      <Route path="feedback" element={<Feedback/>} />
>>>>>>> KELOMPOK3/Kinantiara
=======
      <Route path="/reservasi-management" element={< ReservasiManagement/>} />
>>>>>>> KELOMPOK3/indah
      </Route>
    </Routes>
  );
}

