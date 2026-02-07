import {  Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Github, Linkedin, Twitter, Substack } from "../components/SocialIcons";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col text-slate-100 relative">

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>

      <footer className="p-6 flex items-center gap-6 justify-center bg-black/20 backdrop-blur-md border-t border-white/5 relative z-10">
        <a href="https://www.github.com/manishpoko/" className="text-gray-400 hover:text-white transition-all">
          <Github />
        </a>
        <a href="https://www.x.com/manishpoko/" className="text-gray-400 hover:text-white transition-all">
          <Twitter />
        </a>
        <a href="https://www.linkedin.com/in/manishpoko/" className="text-gray-400 hover:text-white transition-all">
          <Linkedin />
        </a>
                <a href="https://manishpokhrel.substack.com/?utm_campaign=profile_chips" className="text-gray-400 hover:text-white transition-all">
          <Substack />
        </a>
      </footer>
    </div>
  );
}