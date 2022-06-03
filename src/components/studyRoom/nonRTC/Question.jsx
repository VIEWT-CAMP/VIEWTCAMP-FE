import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from "../../../redux/modules/question";
import blueQuestion from '../../../assets/blueQuestion.svg'

function Question() {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(questionActions.getQuestionDB());
  },[]);

  const questionList = useSelector((state) =>state.question.questionRoomList)//리덕스내용 가져와서뿌리기
  const settings = { 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1 ,
  };


  return (
    <Wrap>
       <CircleWrap>
        <Circle id='circle'><img src={blueQuestion}/>
        <StopWatchHelper id='stopWatchHelper'>
          예상질문 보기 버튼을 누르면 여기서<br/>
          스터디원의 예상질문을 볼 수 있어요.
        </StopWatchHelper>
        <div id='Triangle'></div>
      </Circle>
    </CircleWrap>
      {
        (questionList?.length === 0)
        ? <>
        <Title>예상질문</Title>
        <StyledSlider>
          <QuestionList>
            예상질문이 없습니다
          </QuestionList>
        </StyledSlider>
        </>
        :
        <>
        <Title>{(questionList[0]?.user.nickname ? (questionList[0]?.user.nickname + '님의') : null)} 예상질문</Title>
        <StyledSlider className="carousel" {...settings}>
          {
          questionList.map((item, i) => {
            return(
            <QuestionList key={i}>
              Q{i+1}. {item.question}
            </QuestionList>
          )})}       
        </StyledSlider>
        </>
      }
       
    </Wrap>
  )
}

const Wrap = styled.div`
  height : 22.6vh;
  background : #6B63F6;
  margin-bottom: 3.2vh;
  border-radius : 30px;
  position : relative;
  padding : 3.25vh 0px;
  box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`;

const CircleWrap = styled.div`
  width : 28px;
  height : 28px;
  position:absolute;
  top :18px;
  left :18px;
  &:hover{
    #circle{
    }

    #stopWatchHelper{
      width : 290px;
      height :89px;
      background : #454545;
      border-radius :10px;
      font-family: "PretendardRegular";
      font-size : 16px;
      color:white;
      padding : 20px 25px 20px 32px;
      position: absolute;
      top : -28px;
      left : -315px;
      text-align :left;
    }
      #Triangle{
        width: 0;
        height: 0;
        border-bottom: 13px solid transparent;
        border-top: 13px solid transparent;
        border-left: 25px solid #454545;
        border-right: 10px solid transparent;
        position :absolute;
        right :25px;
        top :2px;
      }
  
  }
`;
const Circle = styled.div`
  width : 28px;
  height : 28px;
`;
const StopWatchHelper = styled.div`
  width : 0px;
  height : 0px;
  overflow : hidden;
  font-family: "PretendardRegular";
  z-index: 2;
`
const Title = styled.div`
  font-size : 16px;
  text-align : center;
  color : #fff;
  font-family: "PretendardMedium";
  margin-bottom : 1vh;
`;

const StyledSlider = styled(Slider)`
  height : 11vh;
  text-align : center;
  position : relative;
  .slick-next{
    position: absolute;
    right : 25px;
    top : 4.5vh;
  &::before{
    font-size : 30px;
    color : rgb(255,255,255,0.0);
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23DFDFDF'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='%23454545'/%3E%3C/svg%3E%0A");
  }
  }
  .slick-prev{
    position: absolute;
    left : 18px;
    top : 4.5vh;
    z-index: 7;
  &::before{
    font-size : 30px;
    color : rgb(255,255,255,0.0);
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 31 30' fill='none' transform='scale(-1,1)' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23DFDFDF'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='%23454545'/%3E%3C/svg%3E%0A");
  }
  }
`;

const QuestionList = styled.div`
  font-size : 18.5px;
  padding : 3.5vh 50px;
  font-family: "PretendardBold";
  color : #fff;
  `;
  
export default Question