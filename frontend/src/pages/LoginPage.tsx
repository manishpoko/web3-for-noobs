import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      
      if (!response.ok) throw new Error("ACCESS_DENIED");
      
      const data = await response.json();
      login(data);
      toast.success("ACCESS_GRANTED");
      navigate("/");
    } catch  {
      setError("INVALID_CREDENTIALS");
      toast.error("ACCESS_DENIED");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-black border border-white/20 p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        
        <div className="mb-8 text-center border-b border-white/10 pb-6">
          <h1 className="text-3xl font-mono font-bold text-white uppercase tracking-tight">
            SYSTEM_LOGIN
          </h1>
          <p className="text-xs font-mono text-acid mt-2 tracking-widest">
            // AUTHENTICATION_REQUIRED
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {error && (
            <div className="border border-red-500/50 bg-red-900/10 text-red-500 text-xs font-mono p-3 text-center">
              [!] {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2">
              USER_ID (EMAIL)
            </label>
            <input
              type="text"
              className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none transition-colors"
              placeholder="admin@sys.com"
              value={loginEmail}
              onChange={(e) => setloginEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-2">
              PASSKEY
            </label>
            <input
              type="password"
              className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none transition-colors"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={isLoading}
            className="mt-4 bg-acid text-black font-mono font-bold py-3 hover:bg-white transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            {isLoading ? "DECRYPTING..." : "[ EXECUTE_LOGIN ]"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/signup" className="text-xs font-mono text-gray-600 hover:text-acid transition-colors">
            &lt; CREATE_NEW_IDENTITY /&gt;
          </Link>
        </div>

      </div>
    </div>
  );
}