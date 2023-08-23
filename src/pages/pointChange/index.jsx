import React from 'react';
import { Layout, Space,Button, Radio, Divider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#BF0000',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};


const PointChange = () => (


  <Space
    direction="vertical"
    style={{
      width: '100%',
      height:'100%'
    }}
    size={[0, 100]}
  >
    <Layout>
      <Header style={headerStyle}>ポイント交換</Header>
      <Content style={contentStyle}>      
      ポイント残高:
      <br></br>
      <Space direction="vertical">
        <Space wrap>
          <Button size="large">
          Service 1
          </Button>
          <Button size="large">Service 2</Button>
          <br></br>
          <Button size="large">
            Service 3
          </Button>
          <Button size="large">
            Service 
          </Button>
        </Space>
      </Space>
      </Content>
    </Layout>
  </Space>
);
export default PointChange;