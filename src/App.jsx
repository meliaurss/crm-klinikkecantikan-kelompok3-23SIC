import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import  ProductManagement from "./pages/ProductManagement";
import FormReservasi from "./pages/FormReservasi";
import FormDataDiri from "./pages/FormDataDiri";

function App() {
  return(

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/produk" element={< ProductManagement/>} />
      <Route path="/reservasi" element={< FormReservasi/>} />
      <Route path="/data-diri" element={< FormDataDiri/>} />
      </Route>
    </Routes> 
  )
}

export default App