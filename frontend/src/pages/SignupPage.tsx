import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [inputs, setInputs] = useState({ username: "", password: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);

    async function sendSignupRequest(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();
            
            if (res.ok) {
                login(data.jwt);
                toast.success("IDENTITY_VERIFIED");
                navigate("/");
            } else {
                toast.error(data.message || "REGISTRATION_FAILED");
            }
        } catch {
            toast.error("NETWORK_ERROR");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex justify-center items-center px-4">
            <div className="max-w-md w-full bg-black border border-white/20 p-8">
                
                <div className="mb-8 border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-mono font-bold text-white uppercase tracking-tight">
                        NEW_OPERATOR
                    </h1>
                    <p className="text-xs font-mono text-gray-500 mt-2">
                        // INITIATE_REGISTRATION_SEQUENCE
                    </p>
                </div>

                <form onSubmit={sendSignupRequest} className="flex flex-col gap-5">
                    
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-mono text-acid mb-2 tracking-widest">
                            // CODENAME
                        </label>
                        <input 
                            type="text" 
                            placeholder="MrNoob"
                            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none"
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-mono text-acid mb-2 tracking-widest">
                            // COMMS_LINK (EMAIL)
                        </label>
                        <input 
                            type="email" 
                            placeholder="operator@web3.com"
                            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none"
                            onChange={(e) => setInputs({...inputs, email: e.target.value})}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-mono text-acid mb-2 tracking-widest">
                            // SECURITY_KEY
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••"
                            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none"
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    <button 
                        disabled={isLoading}
                        className="mt-6 w-full bg-white text-black font-mono font-bold py-4 hover:bg-acid transition-colors uppercase tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? "PROCESSING..." : "[ INITIALIZE_ACCOUNT ]"}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-white/10 pt-4">
                    <Link to="/login" className="text-xs font-mono text-gray-500 hover:text-white transition-colors">
                        // EXISTING_USER? <span className="underline decoration-acid">RESUME_SESSION</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}