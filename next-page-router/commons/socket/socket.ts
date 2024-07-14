import { Socket, io } from 'socket.io-client'

export const socket: Socket = io('ws://localhost:5000', {
    transports: ['websocket', 'pulling', 'flashsocket']
})

export const ClientSocket = {

    JoinRoom: (data: { room: string, userId: string }) => {
        if (!socket.connected) {
            socket.connect()
        }

        socket.emit('joinChat', data)
    },
    Disconnect: () => {
        socket.disconnect()
    },


    sendMessage: (data: { chatRoom: string; user: string; message: string }) => {
        socket.emit('sendMessage', data)
    },

    receiverMessage: () => {
        socket.on('receiveMessage', async (newChat) => {
            console.log(newChat, "DDDD")
            return await newChat
        })
    },


}
