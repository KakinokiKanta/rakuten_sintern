import { useEffect, useState } from 'react'
import QrReader from '../../features/qr/QrReader'
import { styled } from 'styled-components'
import Header from '@/layout/header/components/Header'
import { useRouter } from 'next/router'

const Text = styled.p`
  font-size: 24px;
  text-align: center;
`

const Div = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`

const Qr = () => {
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState('')

  const router = useRouter();

  const handleExit = () => {
    router.push('/');
  };

  return (
    <Div>
      <Header title="QRコードスキャン" onExit={handleExit} />
      <QrReader setResult={setResult} onRequestClose={() => null} />
      <Text>QRコードをスキャンして<br/>ポイントゲット</Text>
    </Div>
  )
}

export default Qr
