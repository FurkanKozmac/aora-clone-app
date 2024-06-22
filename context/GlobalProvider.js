import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()
export const useGlobalContext = () => useGlobalContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((result) => {
                if (result) {
                    setIsLoggedIn(true)
                    setUser(result)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            }).catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            }) 

            
    }, [])

    return (
        <GlobalContext.Provider value={{
            isLoading,
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider