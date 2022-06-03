import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as videoActions} from "../../../redux/modules/video";
import {actionCreators as questionActions} from "../../../redux/modules/question";
import {actionCreators as userActions} from "../../../redux/modules/user";
import { useParams } from 'react-router-dom';
import FollowModal from '../nonRTC/FollowModal'
import video from '../../../assets/video.png'
import smallmicoff from '../../../assets/smallmicoff.png'
import smallmicon from '../../../assets/smallmicon.png'
import smallcamon from '../../../assets/smallcamon.png'
import smallcamoff from '../../../assets/smallcamoff.png'
import profileicon from '../../../assets/profileicon.svg'

function Vedio(props) {
    const dispatch = useDispatch();
    const videoReducer = useSelector((state) => state.video.video);
    const videoRef = React.useRef();    

    const params = useParams();
    const roomId = params.id
  
    const {
        streamManager,
        session,
        nickname,
        username,
        roomTitle,
        ws
    } = props;

    const [mic, setMic] = React.useState(true);
    const [vid, setVid] = React.useState(true);

    React.useEffect(() => {
        dispatch(userActions.getUserListDB(roomId));

        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    Handlers();
        return() => {};
    }, []);

     
    //모달
    const modalClose = useRef(); 
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        if(modalOpen===false){
            setModalOpen(true);
         }
    }

    const closeModal = () => {
        if(modalOpen===true){
            setModalOpen(false);
         }
    }

    //모달창 바깥클릭시 닫기
    React.useEffect(() => {
        document.addEventListener("mousedown", clickModalOutside);
        return () => {
        document.removeEventListener("mousedown", clickModalOutside);
        };
      }, [modalOpen]);

    const clickModalOutside = (e) => {
        if (modalOpen && !modalClose.current.contains(e.target)) {setModalOpen(false)};
      };


      
    const Handlers =() => {
        if (session) {
            session.on("signal:userChanged", (event) => {
                const data = JSON.parse(event.data);
                if (nickname + "OV" === data.nickname) {
                    if (data.Saudio !== undefined) {
                        setMic(data.Saudio);
                    }
                }
            });
        }
    } 

    const handleVideo = () => {
        if (vid === false) {
                dispatch(videoActions.setVideo({audio: videoReducer.audio, video: true}));
                setVid(true);
                streamManager.subscribeToVideo(true)
        } else {
                dispatch(videoActions.setVideo({audio: videoReducer.audio, video: false}));
                setVid(false);
                streamManager.subscribeToVideo(false)
        }
    };

    const handleMic = () => {
        if (mic === false) {
                 dispatch(videoActions.setVideo({video: videoReducer.video, audio: true}));
                setMic(true);
               streamManager.subscribeToAudio(true)
        } else {
                 dispatch(videoActions.setVideo({video: videoReducer.video, audio: false}));
                setMic(false);
                streamManager.subscribeToAudio(false)
        }
    };
    if (!session) {
        return <VideoWrap></VideoWrap>;
    }

    const QuestionRoad = () => {
        if(nickname===username){
        dispatch(questionActions.getRoomQuestionDB(nickname))         
        }else{
            dispatch(questionActions.getRoomQuestionDB(nickname))
        }
    }

      
    return (
    <>        
      <Uservideo>
            <Video id="Video" autoPlay={true} ref={videoRef} muted={!mic} hidden={!vid}></Video>
            <VideoBack/>
            {vid===false?
            <VideoBackimg style={{background: `url(${video})`,
                                backgroundRepeat: "noRepeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover"}}/>
                                :null}
            <div id='VideoButtonWrap'>
                    <div id='VideoButton'>
                        <div id='handleMic' onClick={handleMic}>
                            {
                                mic === true
                                    ? (<Mic
                                        id='Mic'><MicImgOn src={smallmicon}/></Mic>)
                                    : (<Mic
                                        id='Mic'><MicImgOff src={smallmicoff}/></Mic>)
                            }
                        </div>

                        <div id='handleVideo' onClick={handleVideo}>
                            {
                                vid === true
                                    ? <Cam
                                        id='Cam'><CamImgOn src={smallcamon}/></Cam>
                                    : <Cam
                                    id='Cam'><CamImgOff src={smallcamoff}/></Cam>
                            }
                        </div>
                    </div>
              
                </div>
                <div ref={modalClose}>
                    {modalOpen===true?
                    <FollowModal 
                    open={modalOpen} 
                    close={closeModal} 
                    ws={ws}
                    nickname={nickname}
                    roomId={roomId}
                    roomTitle={roomTitle}
                     />
                     :null
                    }
                
                 </div>
      </Uservideo>
      <ButtonWrap>
            <Button onClick={QuestionRoad}>{nickname}님의 예상질문보기</Button>
            <UserButton onClick={openModal} ><ProfileImg src={profileicon}/></UserButton>
      </ButtonWrap> 
    </>
    )
}


const VideoWrap = styled.div `
    width : 100%;
    height : 100%;
`;

const Uservideo = styled.div `
    position :relative;
    width : 15.4vw;
    max-width : 296px;
    min-width : 246px;
    height : 17.45vh;
    margin-right :16px;
    &:last-child {
        margin-right : 0px;
    }
    &:hover {
    #Video{
        position: absolute;
        transition: filter 0.1s;
        filter: brightness(45%);
        background : #000;
        
    }
    #VideoButtonWrap{
        width : 6.2vw;
        max-width : 119px;
        min-width : 99px;
        height : 4.25vh;
        display : flex;
        position : absolute;
        bottom : 2.5vh;
        left : 87px;
        z-index:8;
    }
    #VideoButton{
        margin-right : 0.8vw;
            display : flex;
            justify-content :center;
            align-items : center;
    }
    #Mic{
        width : 59px;
            height : 4.25vh;
            border : none;
            font-size : 11px;
            font-family: "PretendardMedium";
            background : #333;
            border-top-left-radius : 10px;
            border-bottom-left-radius : 10px;
    }
    #Cam{
        width : 59px;
            height : 4.25vh;
            border : none;
            font-size : 11px;
            font-family: "PretendardMedium";
            display:block;
            background : #333;
            border-top-right-radius : 10px;
            border-bottom-right-radius : 10px;
    }
    }
`;

const Mic = styled.button `
    height : 0px;
    border : none;
    background : none;
    overflow : hidden;
   `
const MicImgOn=styled.img `
    width : 16px;
`;
const MicImgOff=styled.img `
    width : 20px;
`;
const Cam = styled.button `
    height : 0px;
    border : none;
    background : none;
    overflow : hidden;
`
const CamImgOn=styled.img `
      width : 23px;
`;
const CamImgOff=styled.img `
      width : 25px;
      padding-top : 0.1vh;
`; 
const Video = styled.video `
    width : 100%;
    height : 17.4vh;
    border-radius : 10px;
    margin-bottom : 0px;
    position :absolute;
    top : -7.5px;
    z-index:8;
`;

const VideoBack = styled.div `
    width : 100%;
    height : 17.45vh;
    position : absolute;
    top : -7.5px;
    border-radius : 10px;
    margin-bottom : 0px;
    background :#000;
`;
const VideoBackimg = styled.div `
    width : 100%;
    height : 17.45vh;
    position : absolute;
    top : -7.5px;
    border-radius : 10px;
    margin-bottom : 0px;
    z-index:8;
`;

const ButtonWrap = styled.div `
    width : 15.4vw;
    max-width : 295px;
    min-width : 245px;
    height : 4.7vh;
    position :relative;
`;
const Button = styled.button `
    width : 80%;
    height : 4.7vh;
    color : white;
    font-size : 16px;
    font-family: "PretendardMedium";
    background : #6B63F6;
    border-radius : 10px;
    display:block;
    margin : 0 auto;
    border : none; 
    position : absolute;
    bottom : -3px;
    &:hover {
        background : #8983FF;
    }
`;

const ProfileImg = styled.img `
    width : 30px;
    height : 30px;
`;

const UserButton = styled.button `
    width : 18%;
    height : 4.7vh;
    color : white;
    font-size : 20px;
    font-family: "PretendardMedium";
    background : #EBEBFF;
    border-radius : 10px;
    display:block;
    margin : 0 auto;
    border : none;
    position : absolute;
    right : 0px;
    bottom : -3px;
    margin-left : 3px;
    padding-bottom : 1vh;
`;

export default Vedio