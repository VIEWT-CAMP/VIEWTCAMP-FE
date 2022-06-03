import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import yellowQuestion from '../../../assets/yellowQuestion.svg'
import clock from '../../../assets/clock.svg'

function Stopwatch() {

const [time,setTime] = useState(0);
const [start,setStart] = useState(false);

useEffect(() => {
  let interval = null;

  if(start) {
    interval = setInterval(()=> {
      setTime(prevTime => prevTime + 10)
    }, 10)
  }else {
    clearInterval(interval);
  }

  return () => clearInterval(interval)
},[start])

return (
  <Wrap>
    <CircleWrap>
        <Circle id='circle'><img src={yellowQuestion}/>
        <StopWatchHelper id='stopWatchHelper'>
          시간 측정이 필요한 질문의 경우,<br/>
          스탑워치를 사용해보세요.
        </StopWatchHelper>
        <div id='Triangle'></div>
      </Circle>
    </CircleWrap>
    
    <TimeWrap>
      <TimeTop>
        <Img src={clock}/>
          <Time>
            <Span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Span>
            <Span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Span>
          </Time>
      </TimeTop>
      <TimeBTN>
        <Reset onClick={()=> {setTime(0); setStart(false);}}>■</Reset>
        <Start onClick={()=> setStart(true)}>▶</Start>
        <Stop onClick={()=> setStart(false)}>❚❚</Stop>
      </TimeBTN>
    </TimeWrap>
  </Wrap>
);

}

const Wrap = styled.div`
  height : 20.8vh;
  margin-bottom: 3.2vh;
  background : #FFCE51;
  border-radius : 30px;
  padding-top : 1.3vh;
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
      width : 264px;
      height :86px;
      background : #454545;
      border-radius :10px;
      font-family: "PretendardRegular";
      font-size : 16px;
      color:white;
      padding : 20px 25px 20px 32px;
      position: absolute;
      top : -28px;
      left : -290px;
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
`

const Img = styled.img`
  width : 29px;
  height : 29px;
  margin-right : 13px;
`;
const TimeWrap = styled.div`
  max-width : 200vw;
  min-width : 165px;
  width : 10.5vw;
  margin : 0 auto;
  font-family: "PretendardBold";
`;

const TimeTop = styled.div`
  display :flex;
  align-items :center;
  justify-content:center;
`;

const Time = styled.div`
  width : 100%;
  font-family: "PretendardBold";
  display : flex;
  align-items : center;
  justify-content : center;
  color :#454545;
  margin-right : 37px;
`;

const Span = styled.div`
  font-size : 6.6vh;
  margin-top :0.5vh;
  font-family: "PretendardBold";
`;

const TimeBTN = styled.div`
  width : 100%;
  display : flex;
  align-items : center;
  justify-content : center;
`;

const Reset = styled.div`
  font-size : 4.2vh;
  font-family: "PretendardBold";
  margin-right : 27px;
  color :#454545;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;

const Start = styled.div`
  font-size : 3.6vh;
  font-family: "PretendardBold";
  color :#454545;
  margin-right : 23px;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;

const Stop = styled.div`
  font-size : 4.2vh;
  font-family: "PretendardBold";
  color :#454545;
  cursor: pointer;
  &:hover{
    color : #333;
  }
`;


export default Stopwatch;