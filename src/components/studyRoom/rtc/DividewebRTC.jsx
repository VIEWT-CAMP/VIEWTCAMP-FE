import React from "react";
import UserVideo from "./UserVideo"
import styled from 'styled-components'
import { useSelector } from "react-redux";

const DividewebRTC = (props) => {
    const {
      subscribers,
      session,
      ws,
      roomTitle
    } = props;

    const userList = useSelector((state) => state.user.user_list);


    return (
        <UserWrap>
            {subscribers.map((sub, i) => (
            <VideoWrap>
              <UserVideo
                streamManager={sub}
                key={i + JSON.parse(sub.stream.connection.data).clientData}
                session={session}
                username={userList[i]?.user.username}
                ws={ws}
                roomTitle={roomTitle}
              />
            </VideoWrap> ))}
        </UserWrap>
    );
};

const UserWrap = styled.div `
  max-width : 1345px;
  min-width : 1045px;
  width : 70vw;
  position : relative;
  top : -25vh;
  display:flex;
  padding-left :35.5px;
  z-index : 2;
`;
const VideoWrap = styled.div`
  position: relative;
  justify-content: center;
  margin-right : 0.9vw;
`;

export default DividewebRTC;