import React from 'react'
import styled, {keyframes}from 'styled-components'
import Ellipse from '../assets/Ellipse1.png'

function loding() {
  return (
      <Wrap>
    <Loader className='loader'>Loading...</Loader>
    <Box></Box>
    <Text>로딩중입니다...</Text>
    </Wrap>
  )
}

const Wrap = styled.div`
  width:100%;
  position :relative;
  align-items :center;
  justify-content :center;
`;

const Load4 = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`;

const Load3 = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }

`;

const Loader = styled.div`
   font-size: 10px;
    margin: 0px auto;
    text-indent: -9999em;
    width: 174px;
    height: 174px;
    border-radius: 50%;
    background: #6B63F6;
    background: -moz-linear-gradient(left, #6B63F6 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #6B63F6 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #6B63F6 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #6B63F6 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #6B63F6 10%, rgba(255, 255, 255, 0) 42%);
    position: absolute;
    top : 33.1vh;
    left : 44.26vw; 
    -webkit-animation: ${Load4} 1.4s infinite linear;
    animation: ${Load4} 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    
  .loader:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: #6B63F6;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

`;
const Box = styled.div`
  width : 130px;
  height : 130px;
  border-radius : 50%;
  background : #F5F5FB;
  position : absolute;
  top : 33.1vh;
  left : 44.26vw; 
  margin-top : 22px;
  margin-left : 22px;
`;
const Text = styled.div`
  color : #6B63F6;
  font-size : 33px;
  font-family: "PretendardMedium";
  position : absolute;
  top : 58vh;
    left : 43.8vw; 
`;

export default loding