import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";
import Feedback from "./pages/feedback";

function App() {
  return(

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<LandingPage/>} />
      <Route path="admin" element={<Dashboard/>} />
      <Route path="datapelanggan" element={<SalesManagement/>} />
      <Route path="feedback" element={<Feedback/>} />
      </Route>
    </Routes>
  )
}

export default App