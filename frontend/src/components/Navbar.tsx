import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    // Sharp edges, solid border, pure black background
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO: Monospace + Blinking Cursor */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-3 h-6 bg-acid animate-pulse"></div> 
          <h1 className="text-2xl font-mono font-bold tracking-tighter text-white">
            WEB3_FOR_<span className="text-acid">NOOBS</span>
          </h1>
        </Link>

        {/* RIGHT ACTIONS: Terminal style links */}
        <div className="flex items-center gap-8">
          {isLoggedIn && (
            <Link
              to="/create"
              className="hidden md:block font-mono text-sm text-textMuted hover:text-acid transition-colors"
            >
              [ WRITE_NEW_LOG ]
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              // Sharp acid button
              className="font-mono text-sm bg-acid text-black font-bold px-6 py-2 hover:bg-white hover:scale-105 transition-all active:translate-y-1"
            >
              LOGOUT
            </button>
          ) : (
             <div className="w-4"></div> 
          )}
        </div>
      </div>
    </nav>
  );
}