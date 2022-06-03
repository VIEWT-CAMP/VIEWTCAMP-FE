import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import {actionCreators as studyListAction} from "../../../redux/modules/studyList";
import { actionCreators as userActions } from "../../../redux/modules/user";
import Host from '../../../assets/Host.svg'
function FollowModal(props) {
    const { open,
            close,
            ws,
            nickname,
            roomId,
            roomTitle
         } = props;
         const dispatch = useDispatch();
         React.useEffect(() => {
          dispatch(studyListAction.hostGetRoomAllDB());
          dispatch(userActions.getFollowerDB());
          dispatch(userActions.getFollowingDB());
      },[]);

    const token = sessionStorage.getItem("Authorization");
    const namelist = useSelector((state)=>state.profile.list)
    const myName = namelist.username

    //유저정보
    const roomUserList = useSelector((state)=> state.user.user_list)
    const user_idx = roomUserList.findIndex((u) => u.user.username === nickname)
    const kakao_id = roomUserList[user_idx]?.user.kakaoId
    const userProfile = roomUserList[user_idx]?.user.profileImg

    //호스트 지정
    const roomList = useSelector((state)=> state.studyList.host_room_list)
    const roomList_idx = roomList.findIndex((r) => r.roomId === roomId)
    const hostName = roomList[roomList_idx]?.user.username

    //언팔로우
    const followerList = useSelector((state) => state.user.follower_list)
    const followingList = useSelector((state) => state.user.following_list)
    const followerList_idx = followerList.findIndex((r) => r.user.kakaoId === kakao_id)
    const followingList_idx = followingList.findIndex((r) => r.followingUser.kakaoId === kakao_id)
    const followUp = followerList[followerList_idx]?.followUp
    const followingId = followingList[followingList_idx]?.id

     //강퇴하기
     const sendBen = () => {
        ws.send(`/pub/chat/message`, { Authorization: token }, JSON.stringify({
            type: "BAN",
            roomId: roomId,
            senderId: hostName,
            banUsername: nickname,
            roomTitle:roomTitle
        }))
    }
  return (
      <>
      {
        myName === hostName ?
        <Wrap>
          <CloseBTN onClick={close}>X</CloseBTN>
          <Profile src={userProfile}></Profile>
          <UserName>{nickname}</UserName>
          {nickname === hostName?
          <HostIcon src={Host}/>
          : null}
          {
          // followUp === true ?
          followingId === undefined
          ?<Follow onClick={()=> dispatch(userActions.addFollowingDB(kakao_id))}>팔로우</Follow>
            :<Following onClick={()=>{dispatch(userActions.unFollowingDB(followingId))}}>팔로잉</Following>
            }
          <BanBTN onClick={sendBen}>강제 퇴장 </BanBTN>
          </Wrap>

          : <NoHostWrap>
            <CloseBTN onClick={close}>X</CloseBTN>
            <Profile src={userProfile}></Profile>
            <UserName>{nickname}</UserName>
            {nickname === hostName?
          <HostIcon src={Host}/>
          : null}
            {
            // followUp === true ?
            followingId === undefined
            ?<Follow onClick={()=> dispatch(userActions.addFollowingDB(kakao_id))}>팔로우</Follow>
            :<Following onClick={()=>{dispatch(userActions.unFollowingDB(followingId))}}>팔로잉</Following>
            }
            </NoHostWrap>
      }
      </>
    )
}
const Wrap = styled.div`
  max-width : 200px;
  min-width : 167px;
  width : 10.4vw;
  height : 26.8vh;
  background : #fff;
  box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
  border-radius : 10px;
  position : absolute;
  bottom : 0.8vh;
  left : 5vw;
  z-index : 999;
`;
const NoHostWrap = styled.div`
  max-width : 200px;
  min-width : 167px;
  width : 10.4vw;
  height : 24.8vh;
  background : #fff;
  box-shadow: 1px 1px 15px 5px rgba(0,0,0,0.7);
  border-radius : 10px;
  position : absolute;
  bottom : 1vh;
  left :  5vw;
  z-index : 999;
`;
const CloseBTN = styled.button`
  position : absolute;
  right: 0.5vw;
  top: 0.7vh;
  border : none;
  background : none;
`;
const Profile = styled.img`
  max-width : 75px;
  min-width : 60px;
  width : 3.8vw;
  max-height : 75px;
  min-height : 60px;
  height : 7.5vh;
  background : #D9D9D9;
  border-radius : 50vw;
  margin : 0 auto;
  margin-top : 3.1vh;
  display :flex;
  justify-content :center;
  align-items : center;
  object-fit : cover;
`;

const HostIcon = styled.img`
  position :absolute;
  top : 8.7vh;
  left : 5.9vw;
  font-family: "PretendardMedium";
`;

const UserName = styled.div`
  width : 100%;
  text-align :center;
  color:#000;
  font-size : 16px;
  margin : 0 auto;
  margin-top : 1.1vh;
  font-family: "PretendardMedium";
`;

const Follow = styled.button`
  min-width : 130px;
  max-width : 150px;
  width : 8vw;
  height : 3.7vh;
  color : #fff;
  font-size :16px;
  margin : 0 auto;
  margin-top : 2.1vh;
  border-radius : 10px;
  border : none;
  background : #6B63F6;
  display :block;
  font-family: "PretendardMedium";
  &:hover{
    background : #8983FF;
  }
`;

const Following = styled.button`
  min-width : 130px;
  max-width : 150px;
  width : 8vw;
  height : 3.7vh;
  color : #6B63F6;
  font-size :16px;
  margin : 0 auto;
  margin-top : 2.1vh;
  border-radius : 10px;
  border : 1px solid #6B63F6;
  background : #fff;
  display :block;
  font-family: "PretendardMedium";
  &:hover{
    background : #EBEBFF;
  }
`;

const BanBTN = styled.button`
  min-width : 130px;
  max-width : 150px;
  width : 8vw;
  height : 3.7vh;
  color : #848484;
  font-size :16px;
  margin : 0 auto;
  margin-top : 0.8vh;
  border-radius : 10px;
  border : 1px solid #848484;
  background : none;
  font-family: "PretendardMedium";
  display :block;
  &:hover{
    background : #EEE;
  }
`;
export default FollowModal