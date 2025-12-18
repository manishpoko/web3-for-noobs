import {Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-amber-400 to-teal-400">


      //updated navbar//
      <nav className="p-4 bg-white/20 backdrop-blur-md border-b border-white/30 flex justify-between items-center shadow-sm">
      <Link to= '/' className="text-xl font-bold text-white drop-shadow-md">
      web3 blog
      </Link>
      <Link to={'/login'} className="text-white hover:text-teal-100 font-bold mr-4">
      login</Link>

      <Link to='/create' className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold hover:bg-teal-50 transition shadow-sm" >
      + CREATE A POST
      </Link>
      
      
      
      </nav>
      <main className="grow p-4">
        <Outlet/> 
      </main>
      <footer className="p-4 bg-cyan-600 border-b border-gray-700">this is the footer</footer>
    </div>
  );
}
