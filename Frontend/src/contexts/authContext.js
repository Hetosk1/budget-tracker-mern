import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loggedin, isLoggedin] = useState(false);
    return (
        <AuthContext.Provider value={{loggedin, isLoggedin}}>
            {children}
        </AuthContext.Provider>
    )
}

