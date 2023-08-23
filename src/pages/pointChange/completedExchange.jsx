import { useRouter } from "next/router";
import { styled } from "styled-components";
import { useAtomValue } from "jotai";
import { pointAtom } from "../../features/common/atom";
import Header from "@/layout/header/components/Header";
import Image from "next/image";

// 交換品のダミーデータ
const pointItem = {
  company_id: 10,
  item_id: 11,
  item_name: "マルゲリータピザ",
  item_text: "キノコやパプリカなど野菜たっぷりで栄養満点なマルゲリータ!!",
  item_image: "/foodSample.jpg",
};

const ItemImg = styled.div`
  background-color: gray;
`;

const ExchangeItem = styled.p`
  position: absolute;
  color: white;
  background-color: gray;
  font-weight: bold;
  font-size: 16px;
  top: 390px;
  left: 0;
  margin: 0;
  padding: 2px 10px;
  border-left: solid 5px #ff5757;
  border-bottom: solid 3px #d7d7d7;
`;

const Box = styled.div`
  padding: 5px 10px;
  margin: 20px 40px;
  color: #474747;
  background: whitesmoke; /*背景色*/
  border-left: double 7px #ff5757; /*左線*/
  border-right: double 7px #ff5757; /*右線*/
`;

const Description = styled.p`
  font-size: 16px;
  /* padding: 5px 30px; */
`;

const Balance = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const CompletedExchange = () => {
  const point = useAtomValue(pointAtom);
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  const linkHome = () => {
    if (router.isReady) {
      router.push("/");
    }
  };

  const linkExchange = () => {
    if (router.isReady) {
      router.push("/");
    }
  };

  return (
    <div>
      <Header title="ポイント交換完了" onExit={handleExit} />
      <ItemImg style={{ position: "relative", width: "100%", height: "370px" }}>
        <Image
          src={pointItem.item_image}
          alt="ポイント交換品の画像"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </ItemImg>
      <ExchangeItem>{pointItem.item_name}</ExchangeItem>
      <Box>
        <Description>{pointItem.item_text}</Description>
      </Box>
      <Balance>ポイント残高:{point}pt</Balance>
    </div>
  );
};

export default CompletedExchange;
