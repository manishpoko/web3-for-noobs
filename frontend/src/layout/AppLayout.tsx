import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-amber-400 to-teal-400">
      <nav className="p-4 bg-amber-600 border-b border-gray-700">yoyoyo this is the navbar</nav>
      <main className="grow">
        <Outlet/> 
      </main>
      <footer className="p-4 bg-cyan-600 border-b border-gray-700">this is the footer</footer>
    </div>
  );
}
