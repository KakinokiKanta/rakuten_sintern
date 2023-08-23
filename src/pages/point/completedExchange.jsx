import { useRouter } from "next/router";
import { styled } from "styled-components";
import Header from "@/layout/header/components/Header";
import Image from "next/image";

const A = styled.button`
  background-color: #bf0000;
  color: white;
  padding: 5pt;
`;

const ItemImg = styled.div`
  background-color: #8d8b8b;
`;

const ExchangeItem = styled.p`
  position: absolute;
  color: white;
  background-color: #8d8b8b;
  font-weight: bold;
  font-size: 18px;
  top: 420px;
  left: 0;
  margin: 0;
  padding: 5px 10px;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
`;

const CompletedExchange = () => {
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
      <ItemImg style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          src="/foodSample.jpg"
          alt="食品画像"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </ItemImg>
      <ExchangeItem>ポイント交換品に対する説明(料理名など)</ExchangeItem>
      <Description>店舗か企業ポイントの情報</Description>
      <Description>ポイント残高:100pt</Description>
      <A onClick={() => linkExchange()}>ポイント交換に戻る</A>
    </div>
  );
};

export default CompletedExchange;
