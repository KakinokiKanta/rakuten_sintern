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

const Img = styled.img`
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

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
        <Header title="ポイント獲得" onExit={handleExit} />
        <Container>
          <div style={{ position: 'relative', width: '100vw', height: '35vh'}}>
            <Img src="../logo_red.png" alt="logo image"/>
          </div>
          <PointsText>{answer === "correct" ? "正解": "不正解"} {point}ポイント獲得!</PointsText>
          <PointsList>
            <PointItem>保有ポイント</PointItem>
            <PointItem>{points}ポイント:</PointItem>
          </PointsList>
        </Container>
      </>
    );
};

export default Point;
