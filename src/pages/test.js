import { useRouter } from "next/router";
import { styled } from "styled-components";

const A = styled.button`
  background-color: blue;
`;

const Test = () => {
  const router = useRouter();

  const linkTest = () => {
    if (router.isReady) {
<<<<<<< HEAD
      router.push("/point");
    }
  };
  return <A onClick={() => linkTest()}>aaa</A>;
};
=======
        router.push("/pointChange");
    }
  }
    return <A onClick={() => linkTest()}>Link to Point Change</A>
}
>>>>>>> 618715672fd0903f222f4e5c286499535b0e3787

<<<<<<< HEAD
export default Test;
=======
export default Test
>>>>>>> c65c4314824b418baaa761a7cccb9f045685b833
