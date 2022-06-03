import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as videoActions} from "../../../redux/modules/video";
import {actionCreators as questionActions} from "../../../redux/modules/question";
import { useHistory, useParams } from 'react-router-dom';
import { actionCreators as roomActions } from "../../../redux/modules/room";
import ChoiceQuestionModal from "../nonRTC/ChoiceQuestionModal"
import video from '../../../assets/video.png'
import logout3 from '../../../assets/logout3.svg'
import lock2 from '../../../assets/lock2.svg'
import lockopen2 from '../../../assets/lockopen2.svg'
import bicmicon from '../../../assets/bicmicon.png'
import bigmicoff from '../../../assets/bigmicoff.png'
import bigcamon from '../../../assets/bigcamon.png'
import bigcamoff from '../../../assets/bigcamoff.png'
import on from '../../../sound/onSound1.m4a'
import off from '../../../sound/offSound1.m4a'

function MyVideo(props) {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const videoReducer = useSelector((state) => state.video.video);
    const userReducer = useSelector((state) => state.profile.list)
    const videoRef = React.useRef();
    const backgroundRef = React.useRef();
    

    const {
        streamManager,
        session,
        nickname,
        roomTitle,
        ws,
        host,
       myName
    } = props;

    const onSound = new Audio(on);
    const offSound = new Audio(off);

    const getQuestion = useSelector((state)=>state.question.question_list)

    const token = sessionStorage.getItem("Authorization");
    const [myMic, setMyMic] = React.useState(true);
    const [myVid, setMyVid] = React.useState(true);
    
    const [start,setStart] = React.useState(true);

    const [ChoiceModal,setChoiceModal] = React.useState(false);
    


    React.useEffect(() => {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }

        return() => {};
    }, []);

    const handleVideo = () => {
        if (myVid === false) {
            if (nickname === userReducer.nickname) {
                dispatch(videoActions.setVideo({audio: videoReducer.audio, video: true}));
                setMyVid(true);
                streamManager.publishVideo(true);
            }
             
            onSound.play();    
        } else {
            if (nickname === userReducer.nickname) {
                dispatch(videoActions.setVideo({audio: videoReducer.audio, video: false}));
                setMyVid(false);
                streamManager.publishVideo(false)
                if(streamManager.publishVideo(false)){
                    streamManager.stream.videoActive(backgroundRef.current)
                    }
            }
            offSound.play();
            
        }
    };

    const handleMic = () => {
        if (myMic === false) {
            if (nickname === userReducer.nickname) {
                dispatch(videoActions.setVideo({video: videoReducer.video, audio: true}));
                setMyMic(true);
                streamManager.publishAudio(true)
            }
            onSound.play();
        } else {
            if (nickname === userReducer.nickname) {
                dispatch(videoActions.setVideo({video: videoReducer.video, audio: false}));
                setMyMic(false);
                streamManager.publishAudio(false)
               
            }
             offSound.play();
        }
    };
    if (!session) {
        return <VideoWrap></VideoWrap>;
    }

    
    const roomId = params.id
    const ExitRoom = () => {
        dispatch(roomActions.quitRoomDB(roomId,roomTitle))
        history.push(`/loding/${roomId}`)
    }
    

    

    const openChoiceModal = () => {
        setChoiceModal(true)
    }


    const closeChoiceModal = () => {
        setChoiceModal(false)
    }


    //스터디 시작
    const sendClose = () => {
     ws.send(
       "/pub/chat/message",
       {Authorization: token },
       JSON.stringify({
         type: "CLOSE",
         roomId: roomId,
         message:"📢 스터디를 시작합니다"
       })
     );
     setStart(false);
   };
   
    //스터디 종료
   const sendOpen = () => {
     ws.send(
       "/pub/chat/message",
       {Authorization: token },
       JSON.stringify({
        type: "OPEN",
         roomId: roomId,
         message:"📢 스터디를 종료합니다"
         
   })
   )
   setStart(true);
   }
     
   
    
    return (
          <Wrap>
              <Vheader>
                <ExitButton id='ExitButton' onClick={ExitRoom}><ExitImg src={logout3}/> 스터디 마치기</ExitButton>
                <Title>{roomTitle}</Title>
                {host === myName ?
                    start === true ?
                    <StartBTN onClick={sendClose}><Lock src={lock2}/> 모집마감</StartBTN>
                    :
                    <EndtBTN onClick={sendOpen}><OpenLock src={lockopen2}/> 모집중</EndtBTN>
                    :null
                }
              </Vheader>
            <VideoWrap>
           {streamManager !== undefined ?(
                <Videos>
                    <MainVideo
                        id='MainVideo'
                        autoPlay={true}
                        ref={videoRef}/>
                    <MainVideoBack/> 
                    {myVid===false?
                    <VideoImgBack style={{background: `url(${video})`,
                                        backgroundRepeat: "noRepeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover"}}/>
                                        :null}
              
                <VideoButtonWrap id='VideoButtonWrap'>
                    <VideoButton id='VideoButton'>
                        <handleMic id='handleMic' onClick={handleMic}>
                            {
                                myMic === true
                                    ? (<Mic id='Mic'>
                                        <MicImgOn src={bicmicon}/>
                                       </Mic>)
                                    : (<Mic id='Mic'>
                                        <MicImgOff src={bigmicoff}/>
                                       </Mic>)
                            }
                        </handleMic>

                        <handleVideo id='handleVideo' onClick={handleVideo}>
                            {
                                myVid === true
                                    ? (<Cam id='Cam'>
                                        <CamImgOn src={bigcamon}/>
                                       </Cam>)
                                    : (<Cam id='Cam'>
                                        <CamImgOff src={bigcamoff}/>
                                       </Cam>)
                            }
                        </handleVideo>
                    </VideoButton>
                    </VideoButtonWrap>
                    

                    <MyQuestion onClick={openChoiceModal}>
                        나의<br/>
                        예상질문
                    </MyQuestion>

                {ChoiceModal===true?
                   <ChoiceQuestionModal
                   close={closeChoiceModal}
                   />
                   :null
                }  
                   
               
                   
                    
                                    
                  
                </Videos>) : false}
                                
                <UserWrap>


                </UserWrap> 

            </VideoWrap>
        </Wrap> 
    )
}
const Wrap = styled.div `
    max-width : 1344px;
    min-width : 1120px;
    width : 70vw;
    height : 89vh;
    background : #fff;
    float:left;
    padding : 0vh 38px 4vh 38px;
    border-radius : 30px;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`;
const ExitImg = styled.img `
    max-width : 16px;
    min-width : 13px;
    width : 16vw;
    margin-right : 0.1vw;
    margin-bottom : 0.1vw;
`;
const Title = styled.div `
    min-width : 640px;
    max-width : 770px;
    width : 40vw;
    margin: 0 auto;
    margin-top : 3vh;
    margin-bottom : 3vh;
    font-size : 25px;
    font-weight : 600;
    text-align:center;
    font-family: "PretendardMedium";
`;

const Vheader = styled.div `
    width : 100%;
    align-items : center;
    display : flex;
    position :relative;
`;

const StartBTN = styled.button`
    width : 163px;
    height : 5.2vh;
    background :#3BCA8E;
    border-radius : 15px;
    border : none;
    color : #fff;
    position : absolute;
    top : 2.5vh;
    right : 0vh;
    font-size : 16px;
    font-family: "PretendardBold";
    &:hover{
        background :#5BD6A2;
    }
`;
const Lock = styled.img`
    width : 15.5px;
    margin-right : 0.1vw;
    margin-bottom : 0.1vw;
`;
const EndtBTN = styled.button`
    width : 163px;
    height : 5.1vh;
    background :#7B7B7B;
    border-radius : 15px;
    border : none;
    color : #fff;
    position : absolute;
    top : 2.5vh;
    right : 0vh;
    font-size : 16px;
    font-family: "PretendardBold";
    &:hover{
        background :#979797;
    }
`;

const OpenLock = styled.img`
    width : 15.5px;
    margin-right : 0.1vw;
    margin-bottom : 0.1vw;
`;

const VideoWrap = styled.div `
    width : 100%;
`;

const Videos = styled.div `
    width : 100%;
    height : 52vh;
    border-radius : 10px;
    position:relative;
    margin-bottom : 1.7vh;
`;

const VideoButtonWrap = styled.div `
    width : 162px;
    height : 5.8vh;
    display : flex;
    position : absolute;
    top: 83%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index:1;
`;
  
const VideoButton =styled.div `
      height : 5.8vh;
      margin-right : 0.85vw;
      display :flex;
`;
const Mic=styled.button `
      width : 81px;
      height : 100%;
      border : none;
      background : #333;
      font-family: "PretendardMedium";

      border-top-left-radius : 20px;
      border-bottom-left-radius : 20px;
`;
const MicImgOn=styled.img `
      width : 20px;
`;
const MicImgOff=styled.img `
      width : 24px;
`;
const Cam = styled.button`
      width : 81px;
      height : 100%;
      border : none;
      background : #333;
      font-family: "PretendardMedium";
      border-top-right-radius : 20px;
      border-bottom-right-radius : 20px;
`;
const CamImgOn=styled.img `
     width : 30px;
`;
const CamImgOff=styled.img `
      width : 30px;
      padding-top : 3px;
`;
const ExitButton = styled.button `
width : 177px;
height : 5.8vh;
      border-radius : 15px;
      font-size : 15.5px;
      color : #fff;
      background :#7B7B7B;
      font-family: "PretendardMedium";
      position : absolute;
      border : none;
      &:hover{
    background :#979797;
}
`;
const MyQuestion = styled.button`
    width : 80px;
    height :80px;
    border-radius : 50px;
    background : #5A51F6;
    color : white;
    font-family: "PretendardSemibold";
    font-size : 16px;
    text-align :center;
    position :absolute;
    border :none;
    top : 40.8vh;
    right : 25px;
    cursor: pointer;
    z-index:8;
`;
const MainVideo = styled.video `
    width : 100%;
    height : 52vh;
    border-radius : 10px;
    position : absolute;
    top : 0px;
    z-index : 1;
`;
const VideoImgBack = styled.img `
    width : 100%;
    height : 52vh;
    background : #000;
    border-radius : 10px;
    position : absolute;
    top : 0px;
    z-index:1;
`;
const MainVideoBack = styled.div `
    width : 100%;
    height : 52vh;
    background : #000;
    border-radius : 10px;
    position : absolute;
    top : 0px;
`;

const UserWrap = styled.div `
    width : 100%;
    display:flex;
    justify-content :center;
    align-items : center;
`;

export default MyVideo