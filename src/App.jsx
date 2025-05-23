import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import  ProductManagement from "./pages/ProductManagement";
import SalesManagement from "./pages/SalesManagement";

function App() {
  return(

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/pelanggan" element={<CustomerManagement/>} />
      <Route path="/produk" element={< ProductManagement/>} />
      <Route path="penjualan" element={<SalesManagement/>} />
      </Route>
    </Routes> 
  )
}

export default App