import React from "react";
import Video from "./Video";

const UserVideo = (props) => {
  const getNicknameTag = () =>
    JSON.parse(props.streamManager.stream.connection.data).clientData;
  const OpenVidu = props.OV ? props.OV : null;
  const {streamManager} = props;

  return (
    <>
      {props.streamManager !== undefined ? (
        <Video
          streamManager={props.streamManager}
          nickname={getNicknameTag()}
          host={props.host}
          OV={OpenVidu}
          sessionToken={props.sessionToken}
          myUserName={props.myUserName}
          me={props.me}
          session={props.session}
          username={props.username}
          ws={props.ws}
          roomTitle={props.roomTitle}
        />
      ) :null}
    </>
  );
};


export default UserVideo;