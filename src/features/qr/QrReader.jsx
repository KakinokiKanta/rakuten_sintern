<<<<<<< HEAD
import { useZxing } from "react-zxing";
import { styled } from "styled-components";

const Video = styled.video`
  max-width: 100%;
  height: 400px;
  align-items: center;
  justify-content: center;
  /* max-height: 60%; */
`;
=======
import { useRouter } from 'next/router';
import { useZxing } from 'react-zxing';
import { styled } from 'styled-components';

const Video = styled.video`
  max-width: 100%;
  /* height: 600px; */
  /* align-items: center;
  justify-content: center; */
  max-height: 60%;
`
>>>>>>> 618715672fd0903f222f4e5c286499535b0e3787

const QrReader = ({ setResult, onRequestClose }) => {
  const router = useRouter();

  const handleExit = () => {
    router.push(`/get_point?data=${10}}`);
  };

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      onRequestClose();
      handleExit()
    },
  });

  return <Video ref={ref} />;
};

export default QrReader;
