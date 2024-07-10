export interface IDataRes<T> {
    payload: {
        status: number,
        data?: T,
        message: string
    }
}

export interface IResUserLogin {
    access_token: string
    userId: string
    useName: string
}
export interface IMessageLiveChatRoom {
    _id: string;
    user: {
        _id: string;
        phone: string;
        nickname: string;
    };
    message: string;
    roomchat: {
        _id: string;
    };
    timestamp: string;
    __v: number;

}