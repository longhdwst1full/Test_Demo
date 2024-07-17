import { ReactNode, useEffect, useState } from 'react';

import HeaderContent from '../HeaderContent';
import type { MenuProps } from 'antd';
import { itemMenus } from '@/utils/data';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { MenuCustom } from '@/models/type';

const { Content, Sider } = Layout;

type Props = {
  children: ReactNode;
};

export default function NavbarDash({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;

  const [current, setCurrent] = useState<string>('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (pathname) {
      setCurrent(pathname);
      const arr: string[] = [];
      setOpenKeys(['sub1']);
      const arrItems = itemMenus as MenuCustom[];
      const fItem = arrItems.find((item) => pathname.includes(item?.key));
      arr.push(fItem?.key || '');
      fItem?.children?.map((f) => {
        if (f?.key) {
          arr.push(f.key);
        }
      });
      setOpenKeys(arr);
    }
  }, [pathname]);

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };
  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key);
    router.push(e.key, undefined, { shallow: true });
  };

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="layout-sider">
      <HeaderAdmin />
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsedWidth={0}
          className="sider"
          breakpoint="lg"
          style={{ background: colorBgContainer, height: '94vh' }}
          width={240}
        >
          <Menu
            theme="light"
            onClick={onClick}
            selectedKeys={[current]}
            openKeys={openKeys}
            mode="inline"
            onOpenChange={onOpenChange}
            style={{
              backgroundColor: 'white',
              fontSize: '15px',
              paddingTop: '10px',
            }}
            items={itemMenus}
          />
        </Sider>

        <Layout className="content">
          <Content>
            <HeaderContent collapsed={collapsed} onCollapsed={onCollapsed} />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
