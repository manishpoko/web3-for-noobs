import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); //the !! immediately converts a string -> boolean

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    //we do not return anything here. this is a fn, not a component idiot!
  }

  return (
    <nav className="p-4 bg-white/20 backdrop-blur-md border-b border-white/30 flex justify-between items-center shadow-sm">
      {
        //if the user is logged in, show this -
        isLoggedIn ? (
          <Link
            to="/create"
            className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold hover:bg-teal-50 transition shadow-sm"
          >
            + CREATE A POST
          </Link>
        ) : (
          //keeping it empty if loggedd out
          <div></div>
        )
      }
      <Link
        to="/"
        className="text-xl font-bold text-white drop-shadow-md"
        //center logo, this stays regardless
      >
        <h1>web3 blog</h1>
      </Link>

      <div>
        {isLoggedIn ? (
            //if logged in, show logout button
            <button onClick={handleLogout} className="cursor-pointer  text-white hover:text-red-200 font-bold mr-4">LOGOUT</button>
        ) :
        (//if logged out, show login link - 
            <Link
        to={"/login"}
        className="text-white hover:text-teal-100 font-bold mr-4"
      >
        login
      </Link>
            )}
      </div>

      
    </nav>
  );
}
