import React from "react";
import MyVideo from "./MyVideo";
import styled from 'styled-components'
 
const MyWebRTC = (props) => {
  const {
    publisher,
    session,
    OV,
    roomTitle,
    host,
    myName,
    ws,
    sessionToken,
    nickname,
  } = props;

  return (
    <>
      <div>
          {publisher !== undefined ? (
            <MyVideo
              streamManager={publisher}
              OV={OV}
              sessionToken={sessionToken}
              nickname={nickname}
              me={true}
              session={session}
              roomTitle={roomTitle}
              ws={ws}
              host={host}
              myName={myName}
            />
          ) : (
            <VideoWrap></VideoWrap>
          )}
      </div>
    </>
  );
};



const VideoWrap = styled.div`
  position: relative;
  justify-content: center;
  margin: 4px auto;
  background: #000;
`;

export default MyWebRTC;