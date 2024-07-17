import { getAuthLocalData } from '@/hook/token';
import { useLogout } from '@/hook/useLogout/useLogout';
import { UserOutlined } from '@ant-design/icons';
import { Col, Layout, Row } from 'antd';

const { Header } = Layout;

type Props = {
  active?: boolean;
  onExitFullScreen?: () => void;
};
export default function HeaderAdmin({ active, onExitFullScreen }: Props) {
  const dataUser = getAuthLocalData();
  const { logoutMutate } = useLogout();

  return (
    <div id="headerPage">
      <Layout>
        <Header style={{ height: '6vh' }} color="#305496" className="header">
          <Col span={24}>
            <Row align="middle" justify="space-between">
              <h2> Management Page </h2>
              {active ? (
                <h2 style={{ cursor: 'pointer' }} onClick={onExitFullScreen}>
                  X
                </h2>
              ) : (
                <Row className="items-center gap-x-4">
                  <h2 className="flex gap-x-1 items-center justify-center">
                    <UserOutlined />
                    <span className="mb-0 font-medium text-white">{(dataUser as any)?.user_id}</span>
                  </h2>
                  <h2 style={{ cursor: 'pointer' }} onClick={logoutMutate}>
                    Logout
                  </h2>
                </Row>
              )}
            </Row>
          </Col>
        </Header>
      </Layout>
    </div>
  );
}
