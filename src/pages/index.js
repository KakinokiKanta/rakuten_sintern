import styled from 'styled-components';
import { useAtomValue } from 'jotai'
import { countAtom } from '../atoms.js'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #bf0000 0%, #ff5757 100%); // グラデーション追加
`;

const AppName = styled.h1`
  color: #fff; // 文字色を白に変更
  font-size: 3.5rem; // サイズ調整
  margin-bottom: 20px; // 下部のマージンを追加
`;

const Point = styled.p`
  font-size: 2rem;
  text-align: center;
  color: #fff; // 文字色を白に変更
  margin-bottom: 40px; // 下部のマージンを追加
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Button = styled.div`
  width: 120px; // 幅を広げる
  height: 120px; // 高さを広げる
  display: flex;
  text-align: center;
  font-size: 1.2rem; // フォントサイズを調整
  color: #bf0000; // 文字色を #bf0000 に変更
  align-items: center;
  justify-content: center;
  background-color: #fff; // 背景色を白に変更
  cursor: pointer;
  border-radius: 15px; // 角を丸くする
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); // 影を追加
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); // ホバー時の拡大
    background-color: #ff5757; // ホバー時の背景色変更
    color: #fff; // ホバー時の文字色変更
  }
`;

export default function Home() {
  const [a, setA] = useAtom(pointAtom)
  setA((n) => n + 1)
  const point = useAtomValue(pointAtom)
  const setV = useSetAtom(pointAtom)
  // const point = 100;

  return (
    <Container>
      <AppName>アプリネーム</AppName>
      <Point>
        ポイント <br /> {point}
      </Point>
      <ButtonGrid>
        <Button onClick={() => window.location.href = '/qr'}>QRコード<br/>スキャン</Button>
        <Button onClick={() => window.location.href = '/qr'}>Page 2</Button>
        <Button onClick={() => window.location.href = '/qr'}>Page 3</Button>
        <Button onClick={() => window.location.href = '/qr'}>Page 4</Button>
      </ButtonGrid>
    </Container>
  );
}
