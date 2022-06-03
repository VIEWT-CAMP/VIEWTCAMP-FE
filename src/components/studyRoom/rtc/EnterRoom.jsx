import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import DividewebRTC from "./DividewebRTC"
import MyWebRTC from "./MyWebRTC";
import url from "../../../shared/url"

const OPENVIDU_SERVER_URL = url.OPEN_VIDU;
const OPENVIDU_SERVER_SECRET = url.OPEN_VIDU_SECRET;

class EnterRoom extends Component {
  constructor(props) {
    super(props);
    this.connectionId = '';
    this.state = {
      OV: undefined,
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      sessionToken: undefined,
      audio: this.props.audio,
      video: this.props.video,
      userModel: undefined,
      roomId: this.props.roomId,
      nickname : this.props.nickname,
      ws : this.props.ws,
      host : this.props.host,
      roomTitle : this.props.roomTitle
    };
    
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.getConnectionId = this.getConnectionId.bind(this);
    this.setConnectionId = this.setConnectionId.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload); //beforeunload => 사용자가 페이지를 이탈하려고 할 때 호출하는 함수


    setTimeout(this.joinSession, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload());
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.video !== this.props.video) {
      this.sendSignalUserVideo(this.props.video);
    }
    if (prevProps.audio !== this.props.audio) {
      this.sendSignalUserAudio(this.props.audio);
    }
  
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  sendSignalUserAudio(audio) {
    const data = {
      Saudio: audio,
      nickname: this.state.myUserName + "OV",
    };
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }
  
  sendSignalUserVideo(video) {
    const data = {
      Svideo: video,
      nickname: this.state.myUserName + "OV",
    };
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  //채팅관련 함수
  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
}

  getConnectionId() {
    return this.connectionId;
}


  joinSession() {

    this.OV = new OpenVidu();

    //session 초기화

    this.setState(
      {
        OV: this.OV,
        mySessionId: `Session${this.props.roomId}`,
        myUserName: this.props.nickname,
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;
       

        mySession.on("streamCreated", (event) => {
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

      

          this.setState(
            {
              subscribers: subscribers,
            },
            
            () => {
                  
              this.sendSignalUserVideo(this.props.video);
              this.sendSignalUserAudio(this.props.audio);
              this.setConnectionId(this.state.session.connection.connectionId);
            }
          );
        });

        //구독자 삭제
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
          this.setState({
            sessionToken: token,
          });
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async() => {
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined, 
                publishAudio: true,
                publishVideo: true, 
                resolution: "240x180", 
                frameRate: 16,
                insertMode: "APPEND",
                mirror: false,
              });
              mySession.publish(publisher);
              
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
              this.sendSignalUserVideo(this.props.video);
              this.sendSignalUserAudio(this.props.audio);
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
              this.sendSignalUserVideo(this.props.video);
              this.sendSignalUserAudio(this.props.audio);
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    alert("스터디가 종료됩니다.")
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
    console.log(this.state.publishAudio)
    console.log(this.state.publishVideo)

  }

  
  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const nickname = this.props.nickname;
    
    return (
      <>
        {this.state.session === undefined ? (
          <div id="join"></div>
        ) : (
          <>
           <MyWebRTC
            publisher={this.state.publisher}
            session={this.state.session}
            OV={this.state.OV}
            host={this.props.host}
            myName={this.props.myName}
            roomTitle={this.props.roomTitle}
            nickname={nickname}
            ws={this.props.ws}
            sessionToken={this.state.sessionToken}
          />
          <DividewebRTC
            subscribers={this.state.subscribers}
            session={this.state.session}
            ws={this.props.ws}
            roomTitle={this.props.roomTitle}
          />      

          </>
        )}

      </>
    );
  }

  async getToken() {
    const gogo = await this.createSession(this.state.mySessionId).then(
      (sessionId) => this.createToken(sessionId)
    );
    return gogo;
  }
  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default EnterRoom;