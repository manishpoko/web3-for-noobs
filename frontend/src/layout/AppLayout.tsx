import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-amber-500 to-teal-500">
      <nav>yoyoyo this is the navbar</nav>
      <main>
        <Outlet/> 
      </main>
      <div>this is the footer</div>
    </div>
  );
}
