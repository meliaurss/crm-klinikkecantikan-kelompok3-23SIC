// // src/layouts/MainLayout.jsx
// import { Outlet } from "react-router-dom";
// import Header from "../components/Admin/Header";
// import Sidebar from "../components/Admin/Sidebar";
// import { motion } from "framer-motion";

// export default function MainLayout() {
//   return (
//     <div className="h-screen w-screen flex overflow-hidden bg-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Konten utama */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <Header />

//         {/* Main Content */}
//         <motion.main
//           className="flex-1 overflow-auto"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-full">
//             <Outlet />
//           </div>
//         </motion.main>
//       </div>
//     </div>
//   );
// }