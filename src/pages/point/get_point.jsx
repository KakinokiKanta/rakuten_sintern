import Header from 'src/layout/header/components/Header';
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAtom } from 'jotai';
import { pointAtom } from 'src/features/common/atom';
import { useEffect } from 'react';
import { flagAtom } from '@/features/qr/atom';

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
    const { answer, point } = router.query;
    const [points, setPoints] = useAtom(pointAtom);
    const [flag, setFlag] = useAtom(flagAtom)
    useEffect(() => {
        if (point && flag) {
            const additionalPoints = parseInt(point, 10);


            setPoints(prevPoints => prevPoints + additionalPoints);
            console.log(points)
            setFlag(false)
        }
    }, []);

    const handleExit = () => {
      console.log("Exit button clicked!");
      if (router.isReady) {
        router.push("/");
      }
    };
  
    return (
      <>
        <Header title="ポイントページ" onExit={handleExit} />
        <Container>
          <Logo src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" alt="Logo" />
          <PointsText>{answer === "correct" ? "正解": "不正解"} {point}ポイント獲得!</PointsText>
          <PointsList>
            <PointItem>保有ポイント</PointItem>
            <PointItem>{points}ポイント:</PointItem>
          </PointsList>
        </Container>
        <ExitButton onClick={handleExit}>Exit</ExitButton>
      </>
    );
};

export default Point;