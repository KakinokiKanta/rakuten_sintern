import { Progress, Space } from 'antd';
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


// キャラ育成画面を表示するプログラム
const CharacterGrowing = () => {
    const router = useRouter() // 使用するルータ
    const {height, width} = useGetWindowSize(); // 画面のサイズ
    const [points, setPoints] = useAtom(pointAtom); // 所持ポイント
    const use_point = 10; // 1プッシュで消費するポイント
    var plus_growth = 10; // 1プッシュで成長するパーセント
    const [growth, setGrowth] = useAtom(growthAtom ) // 成長度

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

    // 戻り値
    return (
      <>
          <Header title="マイキャラ育成" onExit={handleExit}/>
          <div style={{position: "relative", left:20, top:10, width: width-50, height: 50, z_index: 100}}>
              <p> 成長度 </p>
              <Progress id="progress" percent={growth} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
          </div>

          <div style={{position: "absolute", left: 25, bottom: 100, width: width-50}} >
              <div align="left">
                  <p> 所持ポイント：{points} </p>
              </div>
              <div id="Div_Grow" align="center" style={{position: "absolute", width: width-50, height: 50, visibility: "visible"}}>
                  <Button1 id="Btn_Grow" onClick={increase}>育てる（{use_point} ポイント⇒{plus_growth}%成長）</Button1>
              </div>
              <div id="Div_PoinGet" align="center" style={{position: "absolute", width: width-50, height: 50, visibility: "hidden"}} >
                  <Button2 onClick={change_point}>成長度100%でポイントゲット！</Button2>
              </div>
          </div>
      </>
    );
}

export default CharacterGrowing
