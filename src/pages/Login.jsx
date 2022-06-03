import React from "react";
import styled from "styled-components";
import LOGO from '../assets/LOGO.svg'
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/kakaoApi";
import { history } from "../redux/configureStore";

const Login = () => {
  const kakaoAuth = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <ContainerWrap>
      <KaKaoLoginWrap>
        <LogoImg src={LOGO}></LogoImg>
        <Text>면접 스터디원 구인부터 화상 스터디까지,
          뷰트캠프 시작하기
        </Text>
        <ClickLogin onClick={kakaoAuth}>카카오톡으로 로그인 하기</ClickLogin>
        <GoBackBtn onClick={()=>{history.push('/')}}>다음에 할래요</GoBackBtn>
      </KaKaoLoginWrap>
    </ContainerWrap>
  );
};
const ContainerWrap = styled.div`
    padding : 12% 0% 30% 0%;
    width : 100%;
    height:100vh;
`
const KaKaoLoginWrap = styled.div`
    width : 640px;
    height : 500px;
    margin : 0 auto;
    border-radius : 50px;
    background-color : #FFFFFF;
    padding : 100px 62px 74px 62px;
    display : grid;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`
const LogoImg = styled.img`
    width : 260px;
    height : 50px;
`
const Text = styled.p`
    font-size : 32px;
    font-family: "PretendardBold";
    width : 510px;
    margin-bottom : 35px;
    margin-top : 35px;
    color : #2B303B;
`
const ClickLogin = styled.button`
    width : 516px;
    height : 75px;
    border-radius : 10px;
    border : none;
    background : #FEE638;
    font-size : 26px;
    font-family: "PretendardBold";
    color : #000000;
    margin-bottom : 20px;
`
const GoBackBtn = styled.button`
    border : none;
    background-color : transparent;
    font-family: "PretendardMedium";
    font-size : 20px;
    color : #AAAAAA;
`
export default Login;