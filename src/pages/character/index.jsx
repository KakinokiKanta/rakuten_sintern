import { Progress, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { styled } from "styled-components";
import Header from '@/layout/header/components/Header';
import useGetWindowSize from '../..//features/character/GetWindowSize';
import { useAtom } from 'jotai';
import { pointAtom } from '../../features/common/atom';
import { growthAtom } from '../../features/character/atom';


// ボタンのスタイル1
const Button1 = styled.div`
  width: width; // 幅を広げる
  height: 50px; // 高さを広げる
  display: flex;
  text-align: center;
  font-size: 1.2rem; // フォントサイズを調整
  color: #fff; // 文字色
  align-items: center;
  justify-content: center;
  background-color: #bf0000; // 背景色を白に変更
  cursor: pointer;
  border-radius: 15px; // 角を丸くする
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); // 影を追加
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.00); // ホバー時の拡大
    background-color: #bf0000; // ホバー時の背景色変更
    color: #fff; // ホバー時の文字色変更
  }
`;

// ボタンのスタイル2
const Button2 = styled.div`
  width: width; // 幅を広げる
  height: 50px; // 高さを広げる
  display: flex;
  text-align: center;
  font-size: 1.2rem; // フォントサイズを調整
  color: #0068b7; // 文字色
  align-items: center;
  justify-content: center;
  background-color: #e0ffff; // 背景色を白に変更
  cursor: pointer;
  border-radius: 15px; // 角を丸くする
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); // 影を追加
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.00); // ホバー時の拡大
    background-color: #00a0e9; // ホバー時の背景色変更
    color: #fff; // ホバー時の文字色変更
  }
`;

// キャラ移動の方向を決める関数
const getRandomDirection = () => {
  const angle = Math.random() * Math.PI * 2;
  return { x: Math.cos(angle), y: Math.sin(angle) };
};

// キャラ移動の速度を決める関数
const getRandomSpeed = () => {
  return Math.random() * 2 + 1;
};


// キャラ育成画面を表示するプログラム
const CharacterGrowing = () => {
    const router = useRouter() // 使用するルータ
    const {height, width} = useGetWindowSize(); // 画面のサイズ
    const [points, setPoints] = useAtom(pointAtom); // 所持ポイント
    const use_point = 10; // 1プッシュで消費するポイント
    var plus_growth = 10; // 1プッシュで成長するパーセント
    const bonus_point = 100; // 成長度100%でもらえるポイント
    const [growth, setGrowth] = useAtom(growthAtom); // 成長度
    const x1 = 0; // キャラの移動域のx座標（左上）
    const y1 = 200; // キャラの移動域のy座標（左上）
    const x2 = width-300; // キャラの移動域のx座標（右下）
    const y2 = height-300; // キャラの移動域のy座標（右下）
    const minStopDuration = 1000; // キャラの最短静止時間 [msec]
    const maxStopDuration = 3000; // キャラの最長静止時間 [msec]
    const [position, setPosition] = useState({ x: 0, y: 300 });　// キャラの初期位置
    const [direction, setDirection] = useState(getRandomDirection()); //キャラ移動の方向を表す
    const [speed, setSpeed] = useState(getRandomSpeed()); //キャラ移動の速度を表す
    const [isChangingDirection, setIsChangingDirection] = useState(false); // キャラ移動の方向転換を表す
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // アニメーション表示
    const images = ['./character/img_baby_1.png',
                    './character/img_baby_2.png',
                    './character/img_child_1.png',
                    './character/img_child_2.png',
                    './character/img_adult_1.png',
                    './character/img_adult_2.png']; // アニメーション画像
    const [messageVisible, setMessageVisible] = useState(false); // 進化メッセージ
    const evolution_growth = [40, 80]; // 進化する成長度のタイミング

    // 戻るボタンを押した時に前画面に戻る関数
    const handleExit = () => {
      router.push('/');
    }

    // 育てるボタンが押された時に呼び出される関数
    const increase = () => {
      setGrowth((prevGrowth) => {
        // ポイントの消費の処理
        if (points >= use_point){
          setPoints(prevPoints => prevPoints - use_point);
        }else{
          plus_growth = 0;
        }

        // 成長度増加の処理
        var newGrowth = prevGrowth + plus_growth;
        if (newGrowth > 100) newGrowth = 100;

        // 成長度が100%以上になったときの処理
        if (newGrowth == evolution_growth[0] || newGrowth == evolution_growth[1]){
          showMessage()
        }else if(newGrowth == 100){
          Div_PoinGet.style.visibility = "visible";
          Div_Grow.style.visibility = "hidden";
        }
        return newGrowth;
      });
    };

    // ポイントの交換をする関数
    const change_point = () => {
      setGrowth((prevGrowth) => {
        var newGrowth = 0;
        Div_PoinGet.style.visibility = "hidden";
        Div_Grow.style.visibility = "visible";
        setPoints(prevPoints => prevPoints + bonus_point);
        return newGrowth;
      });
    };

    // キャラ移動を処理する関数
    useEffect(() => {
      const updatePosition = () => {
        // 方向転換の処理
        if (isChangingDirection) {
          const stopDuration = Math.random() * (maxStopDuration - minStopDuration) + minStopDuration;
          setTimeout(() => {
            setDirection(getRandomDirection());
            setSpeed(getRandomSpeed());
            setIsChangingDirection(false);
          }, stopDuration);
        }

        //  移動座標の計算
        const newPosition = {
          x: position.x + direction.x * speed,
          y: position.y + direction.y * speed,
        };
        if (
          newPosition.x < x1 ||
          newPosition.x > x2 ||
          newPosition.y < y1 ||
          newPosition.y > y2
        ) {
          setIsChangingDirection(true);
        } else {
          setPosition(newPosition);
        }
      };
      const animationFrame = requestAnimationFrame(updatePosition);
      return () => cancelAnimationFrame(animationFrame);
    }, [position, direction, speed, isChangingDirection]);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    // 進化メッセージの処理をする関数
    const showMessage = () => {
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 1000);
    };


    // 戻り値
    return (
      <div>
        <div align="center" style={{position: "absolute", left:0, top:0, width:width-10}}>
          <img src="./character/img_bg.png" style={{width: width, height: height}}/>
        </div>

        <img src={growth < 40 ? images[currentImageIndex]: growth < 80 ? images[currentImageIndex + 2]: images[currentImageIndex + 4]} style={{position: 'absolute', top: position.y, left: position.x, width: 300, height: 300}}/>
        <div>
          <div style={{ position: 'absolute', backgroundColor: "rgba(255,255,255,0.8)", width: '80vw', top:130, left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', padding: '5px'}}>
            <p> 成長度 </p>
            <Progress id="progress" percent={growth} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', bottom: 70, transform: 'translateY(-50%)', marginLeft: '20px', padding: '10px'}}>
            <p> 所持ポイント：{points}</p>
            <p> 交換レート：{use_point} ポイント⇒{plus_growth}%成長</p>
          </div>
          <div id="Div_Grow" style={{ position: 'absolute', width: '90vw', bottom:10, left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', visibility: "visible"}}>
            <Button1 id="Btn_Grow" onClick={increase}>育てる</Button1>
          </div>
          <div id="Div_PoinGet" style={{ position: 'absolute', width: '90vw', bottom:10, left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', visibility: "hidden"}}>
            <Button2 onClick={change_point}>ポイントゲット！</Button2>
          </div>
        </div>

        {messageVisible && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'white',
              opacity: 0.9,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
            }}
          >
            進化！
          </div>
        )}

        <Header title="マイキャラ育成" onExit={handleExit}/>
      </div>
    );
}

export default CharacterGrowing
