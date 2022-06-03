import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

function TestOverlay() {
const history = useHistory();
const params = useParams();
const roomId = params.id
const videoRef = React.useRef(null);  
const [test,setTest] = useState(false);

  React.useEffect(() => {

    //버튼 비활성화
    btnDisabled()

    //버튼 활성화
     setTimeout(() => {
      btnActive()
      setTest(true)
     }, 3000);

     //카메라 속성 확인
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          videoRef.current.srcObject = stream;
        })
        .catch(function (err0r) {
          alert("카메라가 인식되지않습니다. 카메라를 확인해주세요.");

    return history.push('/');
        });
    }

  }, []);

  //버튼 카운트다운
  const [num, setNum] = useState(3)
  const timeRef = React.useRef([])

  React.useEffect(() => {
    for (let i = 1; i < 6; i++) {
            console.log('i', i)
            timeRef.current[i] = setTimeout(() => {
                setNum(num - 1)
            }, i * 1000)
    }
    return () => timeRef.current.forEach((v) => clearTimeout(v))
}, [num]);


  //카메라,마이크 핸들러
  const [myMic, setMyMic] = React.useState(true);
  const [myVid, setMyVid] = React.useState(true);

  //버튼 비활성화
  const btnDisabled = () => {
    const target = document.getElementById('EnterRoom');
    target.disabled = true;
  }
  //버튼 활성화
  const btnActive = () => {
    const target = document.getElementById('EnterRoom');
    target.disabled = false;
  }

  //룸입장버튼
  const gogo = () =>{
    history.push(`/room/${roomId}`)
  }

  return (
  <Wrap>
    <AllLayout>
    <VideoWrap>
      <Video ref={videoRef} muted={!myMic} hidden={!myVid} autoPlay={true} />
     </VideoWrap >
      <Right>
        <CheckTextWrap>
          <MainTitle>입장전 확인해주세요!</MainTitle>
          <Text>
          입장전 카메라가 정상적으로 <br/>
          작동하는지 확인해주세요.<br/>
          <Span>* 화상스터디를 위해 카메라는 필수입니다.</Span>
          </Text>
        </CheckTextWrap>
      <RoomWrap>
        {test === false?
          <EnterRoomDisabled  id="EnterRoom" onClick={() => gogo()}>{num}</EnterRoomDisabled>
        :<EnterRoom id="EnterRoom" onClick={() => gogo()}>방 입장하기</EnterRoom>
      }
        
        <LeaveRoom onClick={() => history.push('/')}>입장 취소</LeaveRoom>
      </RoomWrap>
    </Right>
    </AllLayout>
  </Wrap>
  );
}

const Wrap = styled.div`
  width : 100%;
  height : 100vh;
  background : #fff;
`;
const AllLayout = styled.div`
  width : 52vw;
  margin : 0 auto;
  padding-top : 10.4vh;
  display :flex;
`;
const VideoWrap = styled.div`
  width: 29vw;
  height : 43.2vh;
  border-radius : 10px;
  position:relative;
  top : 15.5vh;
`;
const BackImg = styled.img`
  width: 29vw;
  height : 43.2vh;
  margin : 0 auto;
  border-radius : 10px;
  position:absolute;
  object-fit : cover;
`;
const Video = styled.video`
  width: 29vw;
  height : 43.2vh;
  border-radius : 10px;
  position:absolute;
  z-index:9;
`;

const Right = styled.div`
  width : 24vw;
  margin-top : 13.5vh;
  margin-left : 3.7vw;
`;
const CheckTextWrap = styled.div`
  width :100%;
`;
const MainTitle = styled.div`
  font-size : 1.35vw;
  margin-top : 8.6vh;
  font-weight : bold;
  font-family: "PretendardBold";
  text-align :center;
`;
const Text = styled.div`
  font-size : 1.05vw;
  margin-top : 3.1vh;
  font-family: "PretendardBold";
  text-align :center;
`;
const Span = styled.span`
  font-size : 14px;
  margin : 0  auto;
`;

const RoomWrap = styled.div`
  width : 29vh;
  margin : 0  auto;
`;

const EnterRoomDisabled = styled.button`
  width : 9vw;
  height : 5.5vh;
  display :block;
  margin : 0 auto;
  margin-top : 4vh;
  border-radius : 10px;
  color :  #6B63F6;  
  font-family: "PretendardBold";
  border : 1px solid #6B63F6;
  background : none;
`;
const EnterRoom = styled.button`
  width : 9vw;
  height : 5.5vh;
  display :block;
  margin : 0 auto;
  margin-top : 4vh;
  border-radius : 10px;
  border : none;
  color :  #fff;
  cursor: pointer;
  font-family: "PretendardBold";
  background : #6B63F6;
  &:hover {
      background : #8983FF;
  }
`;

const LeaveRoom = styled.button`
  display :block;
  margin : 0 auto;
  margin-top : 2.5vh;
  font-family: "PretendardBold";
  font-size : 0.82vw;
  text-decoration:underline;
  color :  #929292;
  cursor: pointer;
  background : none;
  border : none;
`;

export default TestOverlay;




