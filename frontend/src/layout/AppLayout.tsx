import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Github, Linkedin, Twitter } from "../components/SocialIcons";

export default function AppLayout() {




  return (
    <div className="min-h-screen flex flex-col bg-brand-peach text-gray-900 font-body">

      <Navbar/>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet/> 
      </main>
      <footer className="p-4 flex items-center gap-4 bg-brand-peach border-b border-gray-700 justify-center"> 

        {/* links below-- */}
        <a href="https://www.github.com/manishpoko/"> <Github/></a>
        <a href="https://www.x.com/manishpoko/"> <Twitter/></a>
        <a href="https://www.linkedin.com/in/manishpoko/"> <Linkedin/></a>



        
        
        </footer>
    </div>
  );
}


