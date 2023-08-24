import { useRouter } from "next/router";
import { styled } from "styled-components";

const A = styled.button`
  background-color: blue;
`;

const Point = () => {
  const router = useRouter();

  const linkTest = () => {
    if (router.isReady) {
      router.push("/");
    }
  };
  return (
    <>
      <h1>ポイントページ</h1>
      <A onClick={() => linkTest()}>aaa</A>
    </>
  );
};

export default Point;
