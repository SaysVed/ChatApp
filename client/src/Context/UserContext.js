import { createContext } from "react";
import io from "socket.io-client";

const Socket1 = createContext();

const SocketContext = ({children}) => {
    const socket = io("http://localhost:5000");
    return (
        <Socket1.Provider value={{socket}}>
            {children}
        </Socket1.Provider>
    );
};

export {Socket1, SocketContext};
