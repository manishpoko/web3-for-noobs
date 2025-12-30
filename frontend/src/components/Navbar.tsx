import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  function handleLogout() {
    logout(); //logic straight from the useAuth hook
    navigate("/");
    //we do not return anything here. this is a fn, not a component idiot!
  }

  return (
    <nav className="p-4 bg-white/20 backdrop-blur-md border-b border-white/30 flex justify-between items-center shadow-sm">
      <div className="w-1/3 ">
        {
          // this will be visible only if logged in, i.e., only to the admin and not to others
          isLoggedIn && (
            <Link
              to="/create"
              className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold hover:bg-teal-50 transition shadow-sm"
            >
              + NEW POST
            </Link>
          )
        }
      </div>
      <div className="w-1/3 flex justify-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white drop-shadow-md tracking-wider"
        >
          <h1> web3fornoobs logo </h1>
        </Link>
      </div>

      <div className="w-1/3 flex justify-end">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer text-white hover:text-red-200 font-bold"
          >
            LOGOUT
          </button>
        ) : null //null because we want the logout to be seen ojnly by the logged in person (admin)
        }
      </div>
    </nav>
  );
}
