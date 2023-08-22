import { useRouter } from "next/router";
import { styled } from "styled-components";
import Header from "@/layout/header/components/Header";
import Image from "next/image";

const A = styled.button`
  background-color: #bf0000;
  color: white;
  padding: 5pt;
`;

const Food = styled.p`
  position: relative;
  color: black;
  font-size: 16px;
  bottom: 0;
  left: 0;
`;

const RestaurantInfo = styled.p`
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
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          src="/foodSample.jpg"
          alt="食品画像"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <Food>料理名</Food>
      <RestaurantInfo>店舗情報</RestaurantInfo>
      <RestaurantInfo>ポイント残高:100pt</RestaurantInfo>
      <A onClick={() => linkExchange()}>ポイント交換に戻る</A>
    </div>
  );
};

export default CompletedExchange;
