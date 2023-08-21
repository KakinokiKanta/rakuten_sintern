import { useRouter } from "next/router"
import { styled } from "styled-components"

const A = styled.button`
    background-color: blue;
`

const Test = () => {
    const router = useRouter()

    const linkTest = () => {
    if (router.isReady) {
        router.push("/");
    }
  }
    return <A onClick={() => linkTest()}>aaa</A>
}

export default Test