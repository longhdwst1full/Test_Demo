import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import { useRouter } from 'next/router';

const { Header } = Layout;

type Props = {
  onCollapsed: () => void;
  collapsed: boolean;
};
export default function HeaderContent({ collapsed, onCollapsed }: Props) {
  const { pathname } = useRouter();

  return (
    <Header className="header-content">
      <Row justify="space-between" align="middle" style={{ height: '100%' }}>
        <Col
          // span={24}
          style={{ cursor: 'pointer' }}
          onClick={onCollapsed}
        >
          <Row align="middle">
            <Col>
              <Row>
                {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 18 }} /> : <MenuFoldOutlined style={{ fontSize: 18 }} />}

                <h3
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    marginBottom: 0,
                  }}
                >
                  titleContent
                </h3>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}
