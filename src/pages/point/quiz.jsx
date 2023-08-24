import Header from '@/layout/header/components/Header';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router'; 

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    font-family: Arial, sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Question = styled.div`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #bf0000;
  margin: 20px 20px 20px 20px;
`;

const Option = styled.button`
  background-color: #bf0000;
  border: none;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 25px;
  width: 80%;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  color: white;
`;

const ConfirmationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmationBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled(StyledButton)`
  background-color: #ccc;
`;

const ConfirmButton = styled(StyledButton)`
  background-color: #bf0000;
  color: white;
`;

const Quiz = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const choice = ["1. アイスクリーム", "2. ビスケット", "3. キャラメル", "4. ポテトチップス"];
  const questionText = "加工食品の中には、賞味期限を記載しなくてもよい品目があります。次のうち、賞味期限を記載しなくてもよいものはどれでしょうか。";
  const answer = "1. アイスクリーム";

  const handleExit = () => {
    if (router.isReady) {
      router.push("/");
    }
  };

  const handleConfirmation = () => {
    if (selectedOption === answer) {
        router.push({
            pathname: '/point/get_point',
            query: { answer: "correct", point: 50},
        },'/point/get_point')
    } else {
        router.push({
            pathname: '/point/get_point',
            query: { answer: "wrong", point: 30},
        },'/point/get_point')
    }
  };

  return (
    <>
      <Header title="ポイント獲得クイズ" onExit={handleExit} />
      <GlobalStyle />
      <Wrapper>
        <Question>{questionText}</Question>
        {choice.map((option) => (
          <Option key={option} onClick={() => setSelectedOption(option)}>
            {option}
          </Option>
        ))}
      </Wrapper>
      {selectedOption && (
        <ConfirmationWrapper>
          <ConfirmationBox>
            <div>{selectedOption} でよろしいですか？</div>
            <CancelButton onClick={() => setSelectedOption(null)}>キャンセル</CancelButton>
            <ConfirmButton onClick={handleConfirmation}>確認</ConfirmButton>
          </ConfirmationBox>
        </ConfirmationWrapper>
      )}
    </>
  );
};

export default Quiz;
