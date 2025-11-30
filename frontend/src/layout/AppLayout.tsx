import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <nav>yoyoyo this is the navbar</nav>
      <main>
        <Outlet/> 
      </main>
      <div>this is the footer</div>
    </div>
  );
}
