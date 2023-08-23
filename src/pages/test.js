import { useRouter } from "next/router"
import { styled } from "styled-components"

const A = styled.button`
    background-color: blue;
`

const Test = () => {
    const router = useRouter()

    const linkTest = () => {
    if (router.isReady) {
        router.push("/pointChange");
    }
  }
    return <A onClick={() => linkTest()}>Link to Point Change</A>
}

export default Test