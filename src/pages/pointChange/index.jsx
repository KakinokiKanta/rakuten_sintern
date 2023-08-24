import ItemList from "@/features/point/components/ItemList";
import Header from "@/layout/header/components/Header";
import { useRouter } from "next/router";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [jsonData, setJsonData] = useState([]); // 声明一个状态变量来存储 JSON 数据

  useEffect(() => {
    axios.get('http://localhost:8080/companyproducts/all')
      .then(response => {
        setJsonData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  

  const router = useRouter();

  const handleExit = () => {
    router.push('/');
  };

  return (
    <>
      <Header title="ポイント交換" onExit={handleExit} />
      <ItemList data={jsonData} />;
    </>
  )


};

export default App;



// import React from 'react';
// import { Layout, Space,Button, Radio, Divider } from 'antd';
// const { Header, Footer, Sider, Content } = Layout;
// const headerStyle = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 64,
//   paddingInline: 50,
//   lineHeight: '64px',
//   backgroundColor: '#BF0000',
// };
// const contentStyle = {
//   textAlign: 'center',
//   minHeight: 120,
//   lineHeight: '120px',
//   color: '#fff',
//   backgroundColor: '#108ee9',
// };


// const PointChange = () => (


//   <Space
//     direction="vertical"
//     style={{
//       width: '100%',
//       height:'100%'
//     }}
//     size={[0, 100]}
//   >
//     <Layout>
//       <Header style={headerStyle}>ポイント交換</Header>
//       <Content style={contentStyle}>      
//       ポイント残高:
//       <br></br>
//       <Space direction="vertical">
//         <Space wrap>
//           <Button size="large">
//           Service 1
//           </Button>
//           <Button size="large">Service 2</Button>
//           <br></br>
//           <Button size="large">
//             Service 3
//           </Button>
//           <Button size="large">
//             Service 
//           </Button>
//         </Space>
//       </Space>
//       </Content>
//     </Layout>
//   </Space>
// );
// export default PointChange;