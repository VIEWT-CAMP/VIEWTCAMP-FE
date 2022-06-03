import React, { useState } from 'react'
import styled from 'styled-components'
import Stopwatch from '../components/studyRoom/nonRTC/Stopwatch'
import Question from '../components/studyRoom/nonRTC/Question'
import Chatting from '../components/studyRoom/nonRTC/Chatting'
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as subscribersActions } from "../redux/modules/subscriber";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as roomActions } from "../redux/modules/room";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {actionCreators as studyListAction} from "../redux/modules/studyList";
import EnterRoom from '../components/studyRoom/rtc/EnterRoom'
import chatBack from '../assets/chatBack.jpg';
import Loding from '../shared/Loding';

function StudyChatRoom() {
    const dispatch = useDispatch();
    const params = useParams();
    const roomId = params.id
    const token = sessionStorage.getItem("Authorization");
   
    //방장권한주기
    const roomList = useSelector((state)=>state.studyList.host_room_list)
    const roomList_idx = roomList.findIndex((r) => r.roomId === roomId)
    const hostName = roomList[roomList_idx]?.user.username
    const roomTitle = roomList[roomList_idx]?.title
    const profileList = useSelector((state) => state.profile.list)
    const myVideo = useSelector((state) => state.video);
    const { audio, video } = myVideo;
    const nickname = profileList.nickname
    const myName = profileList.username
    const [ready, setReady] = useState(true)

    // SockJS 설정
  let options = {
    debug: true,
   header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };

//스크롤 핸들러
  const chattingRef = React.useRef();
  const server = "https://prac-interview.shop";
  const sock = new SockJS(server + "/ws-stomp");
  const ws = Stomp.over(sock, options);

  React.useEffect(() => {  

    setTimeout(()=>{         
    setReady(false)     
    },500)  

    dispatch(chatActions.clearChat())
    dispatch(profileActions.getProfileDB());
    dispatch(roomActions.enterRoomDB(roomId))//입장할때 post
    window.addEventListener("beforeunload", exit);//퇴장할때 post
    dispatch(studyListAction.hostGetRoomAllDB());   
    created();

    return () => {
      onbeforeunload();
    };
  }, []);

   
  const exit = () =>{
    dispatch(roomActions.quitRoomDB(roomId,roomTitle))
    }

  const onbeforeunload = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
          clearTimeout(waitForConnection);
        },
        { token: token }
      );
    } catch (e) {
      console.log("연결 구독 해체 에러", e);
    }

  
  };

  const waitForConnection = (ws, callback) => {
    setTimeout(() => {
      if (ws.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(ws, callback);
      }
    }, 0.1);
  };

  const created = () => {
    try {
      ws.connect(
       { Authorization: token },
        (frame) => {
          ws.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              let recv = JSON.parse(message.body);

              if (recv.type === "TALK") {
                dispatch(chatActions.getChat(recv));

                chattingRef.current?.scrollIntoView({ behavior: "smooth" });
                
              } else if (recv.type === "ENTER") {
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.getSubscribers(recv));
                chattingRef.current?.scrollIntoView({ behavior: "smooth" });
            
              } else if (recv.type === "CLOSE") {//스터디시작
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.startSubscribers(recv));
                chattingRef.current?.scrollIntoView({ behavior: "smooth" });
                
              } else if (recv.type === "OPEN") {//스터디종료
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.startSubscribers(recv));
                chattingRef.current?.scrollIntoView({ behavior: "smooth" });

              } else if (recv.type === "BAN") {//강퇴
                dispatch(chatActions.banChat(recv));
                dispatch(subscribersActions.getSubscribers(recv));
                chattingRef.current?.scrollIntoView({ behavior: "smooth" });

              } else if (recv.type === "QUIT") {
                dispatch(chatActions.getChat(recv));

                dispatch(subscribersActions.leaveSubscribers(recv));
              }
            },
            { Authorization: token }
          );
        },
        (error) => {
          console.log("서버연결 실패", error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    ready ? <Loding/>
    :
    <Wrap style={{background:`url(${chatBack})`,backgroundRepeat: "no-repeat",backgroundSize:"cover"}}>
       <Contents>
         <LeftWrap>
        <EnterRoom 
        roomId={roomId} 
        nickname={nickname}
        video={video}
        audio={audio}
        ws={ws}
        host={hostName}
        myName={myName}
        roomTitle={roomTitle}
      /> 
      </LeftWrap>

        <RightWrap>
            <Stopwatch/>
            <Question/>
            <Chatting chattingRef={chattingRef} ws={ws}/>
        </RightWrap>
        </Contents>

        
    </Wrap>
  ) 
}

const Wrap = styled.div`
  margin : 0 auto;
  width : 100%;
  position :fixed;
  padding : 5.3vh 2.3vw 5.1vh 2.8vw;
`;

const Contents = styled.div`
  position : relative;
  display :flex;
`;
const LeftWrap = styled.div`
  position : relative;
`;

const RightWrap = styled.div`
  width : 21vw;
  max-width : 404px;
  min-width : 341px;
  position : relative;
  top: -0.2vh;
  left: 3.1vw;
`;


export default StudyChatRoom