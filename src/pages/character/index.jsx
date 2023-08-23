import { useState } from 'react';
import { Progress, Space } from 'antd';
import { useRouter } from "next/router"
import { styled } from "styled-components"
import Header from '@/layout/header/components/Header'

// キャラ育成画面を表示するプログラム
const CharacterGrowing = () => {
    const router = useRouter() // 使用するルータ
    const [percent, setPercent] = useState(0); // プログレスバーの進捗変数

    // 戻るボタンを押した時に前画面に戻る関数
    const handleExit = () => {
      router.push('/');
    }

    // プログレスバーを増加させる関数
    const increase = () => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 10;
        if (newPercent > 100) {
          return 100;
        }
        return newPercent;
      });
    };

    return (
        <>
            <Header title="マイキャラ育成" onExit={handleExit} />
            <Progress id="progress" percent={percent} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
            <button onClick={increase}>Grow!</button>
        </>
    );
}

export default CharacterGrowing
