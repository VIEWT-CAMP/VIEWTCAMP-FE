import {Button} from 'bootstrap';
import styled from 'styled-components'
import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {actionCreators as userActions} from "../../../redux/modules/user";
import chatsend from '../../../assets/chatsend.png'

function Chatting(props) {

    const {chattingRef, ws} = props;
    const chattingList = useSelector((state) => state.chat.list);
    // user 정보
    const UserInfo = useSelector((state) => state.user.user_list);
    const Myinfo = useSelector((state) => state.profile.list);
    const nickname = Myinfo.nickname;
    const token = sessionStorage.getItem("Authorization");
    
    const dispatch = useDispatch();
    const params = useParams();
    const roomId = params.id

    React.useEffect(()=>{
      dispatch(userActions.getUserListDB(roomId));
    },[])

    // 메시지 핸들러
    const [sendMessage, setSendMessage] = React.useState(
        {type: "TALK", roomId: roomId, sender: nickname, message: ""  }
    );

    // input값 핸들러
    const sendingMessageHandler = (event) => {
      setSendMessage({
        ...sendMessage,
        message: event.target.value
    })
    };

    // 엔터 시 채팅 제출
    const onEnterPress = (e) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        if(sendMessage.message === ""){
          return alert("메세지를 작성해주세요")
        }
          return sendingMessage(ws, setSendMessage, sendMessage, token);
        }
      };


    const sendingMessage = (ws, setSendMessage, sendMessage, token) => {    
      if(sendMessage.message === ""){
        return alert("메세지를 작성해주세요")
      }   
        ws.send(`/pub/chat/message`, {
            Authorization: token
        }, JSON.stringify({
            ...sendMessage
        }));
        setSendMessage({
            ...sendMessage,
            message: ""
        });
    };


    return (
        <Wrap>
            <ChatMessageList>
                {/* 내가쓴 메세지 */}
                {
                    chattingList.map(
                        (item, i) => 
                        item.sender === nickname
                            ? (
                                <RrightChat>
                                    <MyChatWrap>
                                        <TimeRight>
                                            <h3>{item.time}</h3>
                                        </TimeRight>
                                        <MyChat>
                                            <MyChatMsg>{item.message}</MyChatMsg>
                                        </MyChat>
                                    </MyChatWrap>
                                </RrightChat>
                            )
                            : 
                            
                            (
                              <LeftChat>
                              <OtherChatWrap>
                                  <OtherProfileImg src={item.profileImg}></OtherProfileImg>
                                  <div>
                                      <TimeLeft>
                                          <div>{item.sender}</div>
                                          <h3>{item.time}</h3>
                                      </TimeLeft>
                                      <OtherChat>
                                          <OtherChatMsg>{item.message}</OtherChatMsg>
                                      </OtherChat>
                                  </div>
                              </OtherChatWrap>
                          </LeftChat>
                            ) 
                    )
                }
                 <div ref={chattingRef} />
            </ChatMessageList>

            <WriteWrap>
                <Input  onSubmit={onEnterPress}  onChange={sendingMessageHandler} onKeyDown={onEnterPress} value={sendMessage.message} type="text" placeholder="여기에 채팅 메세지를 입력하세요."></Input>
                <SendButton  onClick={() => {sendingMessage(ws, setSendMessage, sendMessage, token)}}>
                  <img class="fit-picture"
                        src={chatsend}
                        alt={"send"}
                        style={{width:"25px",height:"2.5vh"}}/></SendButton>
            </WriteWrap>

        </Wrap>
    )
}

const Wrap = styled.div `
  height : 39.5vh;
  border-radius : 20px;
  padding : 3vh 0vw 1vh 0vw;
  background: rgba(255, 255, 255, 0.16);
  -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(50px);
    border : 2px solid rgba(255, 255, 255, 0.93);
    box-shadow: 1px 1px 15px 5px rgba(102,96,173,0.14);
`;

const ChatMessageList = styled.div `
  width : 100%;
  height : 29vh;
  padding : 0vh 19px 0.5vh 19px;
  overflow : scroll;
      overflow-x : hidden;
      &::-webkit-scrollbar {
          width: 0.3vw;
      }
      &::-webkit-scrollbar-thumb {
          height: 10%;
          background: lightgray;
          border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
          background: transition;
    }
`;

//내가보낸 채팅
const RrightChat = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const MyChatWrap = styled.div `
  width : 100%;
  margin-bottom : 1.5vh;
`;

const TimeRight = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  h3 {
    font-size: 11px;
    font-family: "PretendardRegular";

    color : #979797;
    margin-bottom: 0.35vh;
  }
`;
const MyChat = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;
const MyChatMsg = styled.div `
  border-top-left-radius : 50px;
  border-bottom-left-radius : 50px;
  border-bottom-right-radius : 50px;
  padding :  1.6vh 22px;
  background: #fff;
  font-size : 14px;
  font-family: "PretendardMedium";
`;

//상대방채팅
const LeftChat = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

`;

const OtherChatWrap = styled.div `
  width : 100%;
  display : flex;
  margin-bottom : 1.5vh;
`;

const OtherProfileImg = styled.img `
  width : 38px;
  height : 3.9vh;
  border-radius : 50px;
  margin-top :0.5vh;
  margin-right : 10px;
  background : rgba(200, 200, 200, 0.6);
  object-fit : cover;
`;
const TimeLeft = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  div {
    width:80%;
    font-size: 11px;
    font-family: "PretendardRegular";

    color : #979797;
    margin: 0px;
    margin-bottom: 0.35vh;
  }
  h3 {
    width:20%;
    font-size: 11px;
    font-family: "PretendardRegular";

    color : #979797;
    margin: 0px;
    margin-bottom:  0.35vh;
  }
`;
const OtherChat = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: start;
`;
const OtherChatMsg = styled.div `
  border-top-right-radius : 50px;
  border-bottom-left-radius : 50px;
  border-bottom-right-radius : 50px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding :  1.6vh 22px;
  background: #fff;
  font-size : 14px;
  font-family: "PretendardMedium";
`;

const WriteWrap = styled.div `
  width : 100%;
  height : 5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled("input").attrs({ maxLength: "200"})`
  width : 15.5vw;
  max-width : 300px;
  min-width : 250px;
  height : 5vh;
  padding : 0.9vw;
  font-size : 12.3px;
  font-family: "PretendardRegular";
  background: rgba(255, 255, 255, 0.7);
  border-top-left-radius : 10px;
  border-bottom-left-radius : 10px;
  border : none;
  &:focus {outline:none;}
`;

const SendButton = styled.button `
  width : 3.4vw;
  min-width : 55px;
  max-width : 65px;
  height : 5vh;
  padding : 0.6vw;
  font-size : 0.77vw;
  font-family: "PretendardRegular";
  background: rgba(255, 255, 255, 0.7);
  border-top-right-radius : 10px;
  border-bottom-right-radius : 10px;
  border : none;
`;

export default Chatting