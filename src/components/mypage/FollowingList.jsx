import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";
import FollowingItem from './FollowingItem';
import Emoge from "../../assets/emoge.svg"

const FollowingList = (props) => {
    const dispatch = useDispatch();


  const followingList = useSelector((state) => state.user.following_list)
 
    return (
        <ContainerWrap>
           <TitleWrap>
                <ReviewTitle onClick={()=>{history.push('/mypage/review')}}>나의 소감</ReviewTitle>
                <FollowerTitle onClick={()=>{history.push('/mypage/follower')}}>팔로워</FollowerTitle>
                <TitleText onClick={()=>{history.push('/mypage/following')}}>팔로잉</TitleText>
            </TitleWrap>  
            <ListWrap>
            {
                    (followingList?.length===0)
                    ?<IssuePageWrap>
                        <IssueIcon src={Emoge}/>
                        <IssueMsg>
                            팔로잉 리스트가 <span style={{color:"#6B63F6"}}>비었습니다.</span>
                        </IssueMsg>
                        <GuideIssue>
                            스터디를 진행하고 함께 스터디하고 싶은 친구를 팔로우 해보세요.
                        </GuideIssue>
                    </IssuePageWrap>
                    :followingList&&followingList?.map((e, idx)=>{
                        return(
                            <>
                            {
                               (e?.roomId)
                               ? <InRoomWrap>
                                   <InfoWrap>
                                    <FollowingItem key={idx} e={e}/>
                                    <div>       
                                    <FollowBtn onClick={()=>{dispatch(userActions.unFollowingDB(e.id))}}>팔로잉</FollowBtn>
                                    </div>
                                    </InfoWrap>
                                    <hr></hr>
                                    <RoomInfoWrap>
                                        <StatusWrap>
                                            <Status>{e.followingUser.nickname}님이 입장한 방</Status>
                                            <StayRoom>{e.title}</StayRoom>
                                        </StatusWrap>
                                        <JoinBtn onClick={()=>{history.push(`/videoCheck/${e.roomId}`)}}>같이 스터디하기</JoinBtn>
                                    </RoomInfoWrap>
                                 </InRoomWrap>
                               : <OutRoomWrap>
                                    <FollowingItem key={idx} e={e}/>
                                    <div>       
                                    <FollowBtn onClick={()=>{dispatch(userActions.unFollowingDB(e.id))}}>팔로잉</FollowBtn>
                                    </div>
                                 </OutRoomWrap>
                            }
                            </>
                        )
                    })   
            }
            </ListWrap>
        </ContainerWrap>
    );
};

const ContainerWrap = styled.div`
    max-width : 918px;
    min-width : 600px;
    max-height : 840px;
    min-height : 564px;
    width : 50vw;
    display : grid-row-end;
    border-radius : 15px;
    background-color : white;
    margin-top : 23px;
    padding : 40px;
    overflow-x : hidden;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`
const ListWrap = styled.div`
    height : 700px;
    display : grid-row-end;
    border-radius : 15px;
    background-color : white;
    overflow : scroll;
    overflow-x : hidden;
    &::-webkit-scrollbar {
        opacity : 100%;
    }
    &:hover{
    &::-webkit-scrollbar {
        width: 6px;
        opacity : 0%;
    }
    &::-webkit-scrollbar-thumb {
        height: 10%;
        background: gray;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transition;
  }
}
`
const TitleWrap = styled.div`
    display : flex;
    min-width : 360px;
    gap : 40px;
    z-index : 9999;
    background-color : #FFFFFF;
`
const TitleText = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #2B303B;
    border-bottom : 2px solid #2B303B;
    &:hover{
        cursor : pointer;
    }
    `
const ReviewTitle = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #9B9B9B;
    &:hover{
        cursor : pointer;
    }
    `
const FollowerTitle = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #9B9B9B;
    &:hover{
        cursor : pointer;
    }
    `


const InRoomWrap = styled.div`
    max-width : 820px;
    min-width : 380px;
    height : 240px;
    background-color : #FFFFFF;
    margin-top:18px;
    border : 1px solid #DEE3E8;
    border-radius : 10px;
    position : relative;
    padding : 30px;
    justify-content : space-between;
    display : gird;
`

const InfoWrap = styled.div`
    display : flex;
    justify-content : space-between;
`

const OutRoomWrap = styled.div`
    max-width : 820px;
    min-width : 380px;
    height : 120px;
    background-color : #FFFFFF;
    margin-top:18px;
    border : 1px solid #DEE3E8;
    border-radius : 10px;
    position : relative;
    padding : 30px;
    justify-content : space-between;
    display : flex;
`
const FollowBtn = styled.button`
    color : #6B63F6;
    background-color : #FFFFFF;
    border : 1px solid #6B63F6;
    border-radius : 10px;
    width : 100px;
    height : 42px;
    margin-top:8.5px;
`
const RoomInfoWrap = styled.div`
    display : flex;
    justify-content : space-between;
`
const StatusWrap = styled.div`
    display : grid;

`
const Status = styled.p`
    font-size : 14px;
    margin-bottom: 8px;
    color : #7B7B7B;
    font-family: "PretendardRegular";
`
const StayRoom = styled.p`
    font-size : 16px;
    margin-bottom:0;
    color : #212121;
    font-family: "PretendardMedium";
`

const JoinBtn = styled.button`
    color : #FFFFFF;
    background-color : #6B63F6;
    border : none;
    border-radius : 10px;
    width : 149.5px;
    height : 42px;
    margin-top:5.5px;
`
const IssuePageWrap = styled.div`
    max-width : 819px;
    max-height:400px;
    gap : 18px;
    margin-top : 91px;
    justify-content : center;
    text-align : center;
    align-items:center;
`
const IssueIcon = styled.img`
    margin-bottom : 30px;
    margin-top : 107px;
`
const IssueMsg = styled.p`
    font-size : 2em;
    font-family: "PretendardSemiBold";
    color: #272727;
    min-width: 520px;
    max-width: 560px;
    justify-content : center;
    text-align : center;
    margin-left : auto;
    margin-right : auto;
`
const GuideIssue = styled.p`
    font-size : 1.5em;
    font-family: "PretendardRegular";
    color : #7A7A7A;
    min-width: 400px;
    max-width: 838px;
    width : 33vw;
    justify-content : center;
    text-align : center;
    margin-left : auto;
    margin-right : auto;
`

export default FollowingList;