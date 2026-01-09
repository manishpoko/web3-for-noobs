import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {




  return (
    <div className="min-h-screen flex flex-col bg-brand-peach text-gray-900 font-body">

      <Navbar/>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet/> 
      </main>
      <footer className="p-4 bg-brand-peach border-b border-gray-700 text-center">connect- <a href="https://x.com/manishpoko"> @manishpoko</a></footer>
    </div>
  );
}
