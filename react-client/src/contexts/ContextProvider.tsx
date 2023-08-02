import { createContext, useContext, useState } from "react";

interface IContextProps {
    user: User
    token: string | null;
    setToken: (token: string | null) => void;
    setUser: (user: any) => void;
    setNotification: (message: string) => void;
}
interface User {
    name: String
}

const StateContext = createContext<IContextProps>({
    user: {
        name: ''
    },
    token: null,
    setToken: () => { },
    setUser: () => { },
    setNotification: () => { }
})

export const ContextProvider = ({ children }: any) => {

    const [user, setUser] = useState({
        name: "K2"
    })
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    const setToken = (token: string | null) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setNotification = (message: string) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 3000)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setToken,
            setUser,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);