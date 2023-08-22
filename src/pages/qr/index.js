import { useEffect, useState } from 'react'
import QrReader from '../../features/qr/QrReader'
import { styled } from 'styled-components'
import Header from '@/layout/header/components/Header'
import { useRouter } from 'next/router'

const Text = styled.p`
  font-size: 24px;
  text-align: center;
`

const Qr = () => {
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState('')

  const router = useRouter();

  const handleExit = () => {
    router.push('/');
  };

  return (
    <div>
      <Header title="QRコードスキャン" onExit={handleExit} />
      <QrReader setResult={setResult} onRequestClose={() => null} />
      <p>a{result}</p>
      <Text>QRコードをスキャンして<br/>ポイントゲット</Text>
    </div>
  )
}

export default Qr
