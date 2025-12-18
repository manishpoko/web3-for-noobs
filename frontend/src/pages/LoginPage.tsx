import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
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
      const token = data.token;

      //storing the token in localStorage to prevent asking for it every single time in every action  -
      localStorage.setItem("token", token);

      alert("login successful");
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("login failed");
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
