import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {




  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-amber-400 to-teal-400">


      //updated navbar//
      <Navbar/>
      <main className="grow p-4">
        <Outlet/> 
      </main>
      <footer className="p-4 bg-cyan-600 border-b border-gray-700">this is the footer</footer>
    </div>
  );
}
