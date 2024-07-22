import { Dayjs } from "dayjs";

export interface MenuProps {
    key: string;
    label: string;
}
export interface MenuCustom extends MenuProps {
    children: MenuProps[];
}

export interface IResData<T> {
    payload: {
        message: string
        status: number;
        data: T
    };


}
export interface IResVideoLive {
    _id: string;
    title: string;
    liveStartTime: string;
    liveEndTime: string;
    commentators: IResCommentators[];
    roomChat: string
    description: string
    imageThumbnailUrl: string
    urlVideoLive: string;
    createdAt: string
    viewers: number;
    isLive: boolean;

}
export interface IReqVideoLive {
    _id?: string;
    title: string;
    timeLive: Dayjs[] | string[]
    commentators: string
    description: string
    imageThumbnailUrl: any
    urlVideoLive: string;
    isLive: boolean;

}
export interface IResCommentators {
    _id: string;
    name: string;
    nickName: string;
    __v: number;
}


export interface IRole {
    _id: string;
    roleName: string;
}
export interface IUsers {
    _id: string;
    phone: string;
    nickname: string;
    isLogin: string;
    role: string;
}
export interface ICommentators {
    _id: string;
    name: string;
    nickName: string;
    phone: string
}
export interface IReqCommentators {
    _id?: string;
    name: string;
    nickName: string;
    phone: string
    passWord: string
}
export interface IReqUsers {
    _id?: string;
    nickname: string;
    phone: string
    passWord: string
}


