//the context file (brain) lives here.

import { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";




//shape of our context - 
interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void; //it is a function w void as return type and token as input
    logout: () => void
}

//create an empty context (box) - just a channel (pipeline), has no data here
const AuthContext = createContext<AuthContextType | undefined>(undefined)

//the provider- (this is the parent for all - navbar, loginpage, createpostpage etc ). also is the broadcaster to all

export function AuthProvider({children}: {children: ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token")) //sets trus if token is there otherwise false - universal point of logic declaration

    //login context logic - 
    const login = (token: string)=> {
        localStorage.setItem("token", token)
        setIsLoggedIn(true)
    }
    

    //logout context logic
    const logout = ()=> {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    return(
        //broadcaster - everyone inside this provider can read these variables
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
            
        </AuthContext.Provider>
    )
}

//a custom hook to not rewrite the usecontext and other lines again and again

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be used within an authProvider")
    }
    return context;
}


