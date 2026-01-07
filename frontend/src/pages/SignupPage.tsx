import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";



export default function Signup() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    async function sendSignupRequest(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        try {
                    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(inputs)
        }); //we send data to backend here (username, email, etc)
        // res only has the response object (it is the envelope only)

        const data = await res.json(); //actual backend data appears here (receiving part)
        if(res.ok) {
            login(data.jwt); //this updates the global state and saves to localstorage thanks to useContext

            toast.success("user registered successfully")
            navigate("/")
        } else {
            toast.error(data.message || "signup failed")
        }

        } catch  {
            toast.error("connection error")

        }finally {
            setIsLoading(false)
        }



    }
    return (
        // 🌌 Background: Deep Arcade Purple
        <div className="min-h-screen bg-brand-primary flex flex-col justify-center items-center p-4">
            
            {/* The "Arcade Cabinet" Box */}
            <div className="
                bg-white 
                border-8 border-black 
                shadow-[16px_16px_0px_0px_rgba(0,0,0,0.5)] 
                p-8 md:p-12 
                max-w-md w-full 
                text-center
            ">
                
                {/* Header */}
                <h1 className="font-retro text-2xl md:text-3xl text-brand-primary mb-2 animate-pulse">
                    NEW CHALLENGER
                </h1>
                <p className="font-body text-xs text-gray-500 mb-8">
                    ENTER CREDENTIALS TO BEGIN
                </p>

                <form onSubmit={sendSignupRequest} className="space-y-6">
                    
                    {/* Username Input */}
                    <div className="text-left">
                        <label className="block font-retro text-[10px] mb-2">CODENAME</label>
                        <input 
                            type="text" 
                            placeholder="MrNoob"
                            className="w-full border-4 border-black p-3 font-display focus:bg-brand-peach focus:outline-none"
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="text-left">
                        <label className="block font-retro text-[10px] mb-2">COMMS LINK (EMAIL)</label>
                        <input 
                            type="email" 
                            placeholder="admin@arcade.com"
                            className="w-full border-4 border-black p-3 font-display focus:bg-brand-peach focus:outline-none"
                            onChange={(e) => setInputs({...inputs, email: e.target.value})}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="text-left">
                        <label className="block font-retro text-[10px] mb-2">PASSKEY</label>
                        <input 
                            type="password" 
                            placeholder="••••••"
                            className="w-full border-4 border-black p-3 font-display focus:bg-brand-peach focus:outline-none"
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                    </div>

                    {/* The "Insert Coin" Button */}
                    <button 
                        disabled={isLoading}
                        className="
                            w-full 
                            bg-brand-pop 
                            text-black 
                            font-retro 
                            text-sm
                            py-4 
                            border-4 border-black 
                            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                            hover:translate-y-1 hover:shadow-none
                            active:bg-brand-accent
                            transition-all
                            disabled:opacity-50
                        "
                    >
                        {isLoading ? "LOADING..." : "SIGN UP"}
                    </button>
                </form>

                <div className="mt-6 text-xs font-body">
                    ALREADY A PLAYER? <Link to="/login" className="font-bold underline decoration-brand-pop hover:text-brand-primary">CONTINUE GAME</Link>
                </div>
            </div>

            <div className="mt-8 font-retro text-white text-[10px] opacity-60">
                get in baby!
            </div>
        </div>
    );
    
    

}