import io from 'socket.io-client';

export let socket;

export function init() {
    socket = io('http://localhost:3001', {
        transports: ['websocket'],
    });
}
