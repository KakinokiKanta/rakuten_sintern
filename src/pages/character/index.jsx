
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
  color: #bf0000; // 文字色
  align-items: center;
  justify-content: center;
  background-color: #ffe4e1; // 背景色を白に変更
  cursor: pointer;
  border-radius: 15px; // 角を丸くする
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); // 影を追加
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.00); // ホバー時の拡大
    background-color: #ff5757; // ホバー時の背景色変更
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
    const [growth, setGrowth] = useAtom(growthAtom); // 成長度
    const x1 = 50; // キャラの移動域のx座標（左上）
    const y1 = 200; // キャラの移動域のy座標（左上）
    const x2 = width-100; // キャラの移動域のx座標（右下）
    const y2 = height-100; // キャラの移動域のy座標（右下）
    const minStopDuration = 1000; // キャラの最短静止時間 [msec]
    const maxStopDuration = 3000; // キャラの最長静止時間 [msec]
    const [position, setPosition] = useState({ x: 200, y: 300 });　// キャラの初期位置
    const [direction, setDirection] = useState(getRandomDirection()); //キャラ移動の方向を表す
    const [speed, setSpeed] = useState(getRandomSpeed()); //キャラ移動の速度を表す
    const [isChangingDirection, setIsChangingDirection] = useState(false); // キャラ移動の方向転換を表す

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
        if (newGrowth == 100){
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

    // 戻り値
    return (
      <div>
        <div align="center" style={{position: "absolute", left:0, top:0, width:width-10}}>
          <img src="./img_bg.png" style={{width: width, height: height}}/>
        </div>
        <img
        src="/path/to/your/image.png" // Change this to the path of your image
        alt="Moving Image"
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      />
        <div style={{background: "rgba(255,255,255,0.8)", position: "absolute", left:10, top:100, width: 300, height: 50}}>
            <p> 成長度 </p>
            <Progress id="progress" percent={growth} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        </div>

        <div style={{position: "absolute", left: 10, bottom: 50}} >
          <div align="left" style={{background: "rgba(255,255,255,0.8)", width: 180}}>
            <p> 所持ポイント：{points}</p>
          </div>
          <div id="Div_Grow" align="center" style={{position: "absolute", top: 25, width: 250, height: 50, visibility: "visible"}}>
            <Button1 id="Btn_Grow" onClick={increase}>育てる</Button1>
          </div>
          <div id="Div_PoinGet" align="center" style={{position: "absolute", width: 250, height: 50, visibility: "hidden"}} >
            <Button2 onClick={change_point}>ポイントゲット！</Button2>
          </div>
          <div align="center" style={{position: "relative", height: 50, top:55}}>
            <p> 交換レート：{use_point} ポイント⇒{plus_growth}%成長</p>
          </div>
        </div>

        <Header title="マイキャラ育成" onExit={handleExit}/>
      </div>
    );
}

export default CharacterGrowing
