import { MenuProps } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
export const itemMenus: MenuItem[] = [
  getItem('Commentators', '/admin/commentators'),
  getItem('Video live', '/admin/videoLive'),
  // getItem('user', '/admin/user', null, [getItem('add', '/user/add')]),
  getItem('user', '/admin/user'),
  getItem('Role', '/admin/role'),
];

export const menuBody = [
  {
    title: 'Trực tiếp',
    link: '',
  },
  {
    title: 'Toán',
    link: '',
  },
  {
    title: 'Văn',
    link: '',
  },
  {
    title: 'Anh',
    link: '',
  },
  {
    title: 'Lý',
    link: '',
  },
];
export const dataVideo = [
  {
    link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
    urlImage: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
  },
  {
    link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
    urlImage: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
  },
  {
    link: 'https://www.youtube.com/watch?v=nrRxp8jqE4c',
    urlImage: '',
  },
  {
    link: '',
    urlImage: '',
  },
];
