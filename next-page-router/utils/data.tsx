import { MenuProps } from "antd";
import React from "react";

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
export const itemMenus: MenuItem[] = [
    getItem('user', '/user', null, [
        getItem('add', '/user/add'),

    ]),
    getItem('chat', '/chat'),

];