import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client'; 
import { initializeSocket, disconnectSocket } from './socketService';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = initializeSocket();
        setSocket(socketInstance);

        if (!socketInstance.connected) {
            socketInstance.connect();
        }

        return () => {
            disconnectSocket();
        };
    }, []);

    return socket;
};