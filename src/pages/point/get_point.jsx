import Header from 'src/layout/header/components/Header';
import { useRouter } from "next/router";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const PointsText = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PointsList = styled.div`
  width: 80%;
  border: 1px solid black;
`;

const PointItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;

  &:last-child {
    border-bottom: none;
  }
`;

const ExitButton = styled.button`
  background-color: blue;
`;

const Point = () => {
  const router = useRouter();

  const handleExit = () => {
    if (router.isReady) {
      router.push("/");
    }
    console.log("Exit button clicked!");
  };

  return (
    <>
      <Header title="ポイントページ" onExit={handleExit} />
      <Container>
        <Logo src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" alt="Logo" />
        <PointsText>30ポイント獲得!</PointsText>
        <PointsList>
          <PointItem>保有ポイント</PointItem>
          <PointItem>家ポイント:3000</PointItem>
          <PointItem>外ポイント:2000</PointItem>
        </PointsList>
      </Container>
      <ExitButton onClick={handleExit}>aaa</ExitButton>
    </>
  );
};

export default Point;
