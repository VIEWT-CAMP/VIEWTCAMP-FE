import React, { useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
// import { actionCreators as reviewActions } from "../../redux/modules/review";
import { actionCreators as userActions } from "../../redux/modules/user";
import FollowerItem from "./FollowerItem";
import { history } from "../../redux/configureStore";
import Emoge from "../../assets/emoge.svg"

    const FollowerList = (props) => {
    const dispatch = useDispatch();
    const followerList = useSelector((state) => state.user.follower_list)
    
    React.useEffect(()=>{
        dispatch(userActions.getFollowerDB());
    },[]);

    return (
        <ContainerWrap>
            <TitleWrap>
                <ReviewTitle onClick={()=>{history.push('/mypage/review')}}>나의 소감</ReviewTitle>
                <TitleText onClick={()=>{history.push('/mypage/follower')}}>팔로워</TitleText>
                <FollowingTitle onClick={()=>{history.push('/mypage/following')}}>팔로잉</FollowingTitle>
            </TitleWrap>
            <ListWrap> 
            {
                    (followerList?.length===0)
                    ?<IssuePageWrap>
                        <IssueIcon src={Emoge}/>
                        <IssueMsg>
                            팔로워 리스트가 <span style={{color:"#6B63F6"}}>비었습니다.</span>
                        </IssueMsg>
                        <GuideIssue>
                            스터디를 진행하고 스터디 친구를 만들어 보세요.
                        </GuideIssue>
                    </IssuePageWrap>
                    :followerList&&followerList?.map((e, idx)=>{
                        return(
                            <>
                            {
                                (e.followUp === true)
                                ? <BoxWrap >
                                    <FollowerItem key={idx} e={e}/>
                                    <FollowingBtn onClick={()=>{dispatch(userActions.unFollowingDB(e.id))}}>팔로잉</FollowingBtn>
                                  </BoxWrap>
                                : <BoxWrap >
                                    <FollowerItem key={idx} e={e}/>
                                    <FollowBtn onClick={()=>{dispatch(userActions.addFollowingDB(e.user.kakaoId))}}>팔로우</FollowBtn>
                                  </BoxWrap>
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
    gap : 40px;
    min-width : 360px;
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
const FollowingTitle = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #9B9B9B;
    &:hover{
        cursor : pointer;
    }
    `
const BoxWrap = styled.div`
    max-width : 820px;
    height : 120px;
    background-color : #FFFFFF;
    border : 1px solid #DEE3E8;
    margin-top:18px;
    border-radius : 10px;
    position : relative;
    padding : 30px;
    justify-content : space-between;
    display : flex;
`
const FollowingBtn = styled.button`
    color : #6B63F6;
    background-color : #FFFFFF;
    border : 1px solid #6B63F6;
    border-radius : 10px;
    width : 100px;
    height : 42px;
    margin-top:8.5px;
    &:hover{
        background : #EBEBFF;
    }
`
const FollowBtn = styled.button`
    color : #FFFFFF;
    background-color : #6B63F6;
    border :none;
    border-radius : 10px;
    width : 100px;
    height : 42px;
    margin-top:8.5px;
    &:hover{
        background-color : #8983FF;
    }
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
    min-width: 452px;
    max-width: 838px;
    width : 33vw;
    justify-content : center;
    text-align : center;
    margin-left : auto;
    margin-right : auto;
`

export default FollowerList;