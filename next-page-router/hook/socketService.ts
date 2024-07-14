import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = () => {
    if (!socket) {
        socket = io('ws://localhost:5000', {
            transports: ['websocket'],
            autoConnect: false
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

