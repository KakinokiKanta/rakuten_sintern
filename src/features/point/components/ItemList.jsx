import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { pointAtom } from '@/features/common/atom';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  background-color: #ffffff;
`;

const Item = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 16px;
  cursor: pointer;
  background-color: white;
  transition: transform 0.3s;
  border: 1px solid #ececec;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ItemName = styled.div`
  font-size: 1.0em;
  color: #bf0000;
  margin: 8px 0;
`;

const Storage = styled.div`
  font-size: 1em;
  color: #333;
`;

const DetailOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DetailContainer = styled.div`
  width: 70%;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
`;

const ItemText = styled.p`
  white-space: pre-wrap;  /* 改行やスペースを保持する */
  word-break: break-word; /* 長い単語が枠からはみ出すのを防ぐ */
  overflow-y: auto;       /* 必要に応じてスクロールバーを表示する */
  max-height: 150px;      /* 任意の最大高さ */
`;

const Button = styled.button`
  margin: 7px;
  padding: 8px 16px;
  background-color: #bf0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #9d0000;
  }
`;

const PointsDisplay = styled.div`
  background-color: #bf0000;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin: 10px auto;
  max-width: 250px;
`;

const ExchangePoints = styled.div`
  font-size: 0.9em;
  color: #bf0000;
  margin-top: 8px;
`;

const ItemList = ({ data }) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);

  const [myPoint, setMyPoint] = useAtom(pointAtom)

  return (
    <>
        <PointsDisplay>所持ポイント: {myPoint}pts</PointsDisplay>
        <Container>
        {data.map(item => (
            <Item key={item.itemId} onClick={() => setSelectedItem(item)}>
            <Image src={item.itemImage} alt={item.itemName} />
            <ItemName>{item.itemName}</ItemName>
            <Storage>残りの個数: {item.storage}</Storage>
            <ExchangePoints>必要ポイント: 50pts</ExchangePoints>
            </Item>
        ))}

        {selectedItem && (
            <DetailOverlay onClick={() => setSelectedItem(null)}>
            <DetailContainer onClick={e => e.stopPropagation()}>
                <Image src={selectedItem.itemImage} alt={selectedItem.itemName} />
                <ItemName>{selectedItem.itemName}</ItemName>
                <Storage>残りの個数: {selectedItem.storage}</Storage>
                <ExchangePoints>必要ポイント: 50pts</ExchangePoints>
                <ItemText>{selectedItem.itemText}</ItemText>
                <Button onClick={() => {
                    setMyPoint((p) => p - 50);
                    router.push({
                    pathname: '/point/completedExchange',
                    query: { itemId: selectedItem.itemId, companyId: selectedItem.companyId, point: 50},
                    },'/point/completedExchange')}}>
                        交換する
                </Button>
                <Button onClick={() => setSelectedItem(null)}>キャンセル</Button>
            </DetailContainer>
            </DetailOverlay>
        )}
        </Container>
    </>
  );
};

export default ItemList