import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";

//created login page in order to get and keep the token automatically (in localstorage) - otherwise we'd be copying it from postman everytime

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("invalid email or password");
      }
      //if no error we capture the token from the fetched data
      const data = await response.json();
      //console.log("SERVER SENT:", data); - uncomment this ifyou want to see the token in your console

      //storing the token in localStorage to prevent asking for it every single time in every action  -
      //   localStorage.setItem("token", data);
      login(data); //calling the login() fn from the AuthProvider

      toast.success("login successful");
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message)
      } else {
        setError("login failed");
        toast.error(error)
      }
    }
  };
  return (
    <div className="flex  justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">LOGIN</h1>
        //the form logic here w onSubmit
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center ">{error}</div>
          )}
          //email field -
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {" "}
              email{" "}
            </label>
            <input
              type="text"
              className="w-full border rounded mt-1"
              //the connection binding -
              value={loginEmail}
              onChange={(e) => setloginEmail(e.target.value)}
            />
          </div>
          //password field-
          <div>
            <label className="block text-sm font-medium text-gray-700"></label>
            <input
              type="password"
              className="w-full border rounded mt-1"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          //sign in button -
          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
