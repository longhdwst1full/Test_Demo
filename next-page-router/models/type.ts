export interface MenuProps {
    key: string;
    label: string;
}
export interface MenuCustom extends MenuProps {
    children: MenuProps[];
}

export interface IResData<T> {
    message: string
    status: number;
    data: T
}
export interface IResVideoLive {
    _id: string;
    title: string;
    liveStartTime: string;
    liveEndTime: string;
    commentators: IResCommentators[];
}
export interface IResCommentators {
    _id: string;
    name: string;
    nickName: string;
    __v: number;
}
 