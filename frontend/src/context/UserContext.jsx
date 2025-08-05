import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../controllers/auth";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchMe();                
                setUser(data)
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }finally{
                setUserLoading(false)
            }
        }

        loadUser();
    }, [])

    return(
        <UserContext.Provider value={{user, setUser, userLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)