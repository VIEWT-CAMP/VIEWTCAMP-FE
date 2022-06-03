import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import {actionCreators} from "../../redux/modules/studyList"
import Emoge from "../../assets/emoge.svg"
import Personnelicon from "../../assets/Personnelicon.svg"
import Undo from "../../assets/undo.svg"

const StudyRoomMain = (props) => {
    const dispatch = useDispatch();
    const room_list = useSelector((state) => state.studyList.main_list)
    const sesstionStoragetokenCheck = sessionStorage.getItem('Authorization');
    React.useEffect(() => {
        dispatch(actionCreators.getRoomMainDB());
    },[]);
    return (
        <RoomListWrap>
            <TopWrap>
                <DescText>면접 스터디원을 기다리고 있어요</DescText>
                    <Reload onClick={()=>{dispatch(actionCreators.getRoomMainDB())}}>
                        <UndoIcon src={Undo}></UndoIcon>
                        <Text>새로고침</Text>
                    </Reload>
            </TopWrap>
            <ContentWrap>
            {
                (room_list?.length === 0)
                ? <IssuePageWrap>
                    <IssueIcon src={Emoge}/>
                    <IssueMsg>
                        진행중인 스터디가 <span style={{color:"#6B63F6"}}>없습니다.</span>
                    </IssueMsg>
                    <GuideIssue>
                        첫번째 방장이 되어주세요.
                    </GuideIssue>
                  </IssuePageWrap>
                :
                room_list.map((e,i)=>{
                if(sesstionStoragetokenCheck) {
                    if( e.studying === false ){
                    return(
                        <StudyRoom onClick={()=>{
                            history.push(`/videoCheck/${e.roomId}`)
                        }}>
                            <ProfileImg src={e.user.profileImg}/>
                            <TextWrap>
                                    <TitleText>{e.title}</TitleText>
                                    <StudyingWrap>
                                            <StudyingGreen></StudyingGreen>
                                            <StudyingText>모집중</StudyingText>
                                    </StudyingWrap>
                                <StatusWrap>
                                <TagWrap>
                                    <Tag>{e.tag2}</Tag>
                                    <Tag>{e.tag1}</Tag>
                                    <Tag>{e.tag3}</Tag>
                                </TagWrap>
                                <NumWrap>
                                    <PersonIcon src={Personnelicon}></PersonIcon>
                                    <UserNum>{e.userCount}/{e.maxUser}</UserNum>
                                </NumWrap>
                                </StatusWrap>
                            </TextWrap>
                        </StudyRoom>
                        )
                    }else{
                        return(
                            <StudyRoom onClick={()=>{
                                alert("모집이 마감 되었습니다")
                            }}>
                                <ProfileImg src={e.user.profileImg}/>
                                <TextWrap>
                                    <TitleText>{e.title}</TitleText>
                                    <StudyingWrap>
                                            <StudyingRed></StudyingRed>
                                            <StudyingText>모집완료</StudyingText>
                                    </StudyingWrap>
                                    <StatusWrap>
                                    <TagWrap>
                                        <Tag>{e.tag2}</Tag>
                                        <Tag>{e.tag1}</Tag>
                                        <Tag>{e.tag3}</Tag>
                                    </TagWrap>
                                    <NumWrap>
                                        <PersonIcon src={Personnelicon}></PersonIcon>
                                        <UserNum>{e.userCount}/{e.maxUser}</UserNum>
                                    </NumWrap>
                                    </StatusWrap>
                                </TextWrap>
                            </StudyRoom>
                            )
                    }
                } else {
                    if( e.studying === false ){
                    return(
                        <StudyRoom onClick={()=>{
                            history.push('/login/')
                            alert("로그인 후 입장 가능합니다.")
                        }}>
                            <ProfileImg src={e.user.profileImg}/>
                            <TextWrap>
                                <TitleText>{e.title}</TitleText>
                                <StudyingWrap>
                                        <StudyingGreen></StudyingGreen>
                                        <StudyingText>모집중</StudyingText>
                                    </StudyingWrap>
                                <StatusWrap>
                                <TagWrap>
                                    <Tag>{e.tag2}</Tag>
                                    <Tag>{e.tag1}</Tag>
                                    <Tag>{e.tag3}</Tag>
                                </TagWrap>
                                <NumWrap>
                                    <PersonIcon src={Personnelicon}></PersonIcon>
                                    <UserNum>{e.userCount}/{e.maxUser}</UserNum>
                                </NumWrap>
                                </StatusWrap>
                            </TextWrap>
                        </StudyRoom>
                        )
                    }else{
                        return(
                            <StudyRoom onClick={()=>{
                                history.push('/login/')
                                alert("로그인 후 입장 가능합니다.")
                            }}>
                                <ProfileImg src={e.user.profileImg}/>
                                <TextWrap>
                                    <TitleText>{e.title}</TitleText>
                                    <StudyingWrap>
                                            <StudyingRed></StudyingRed>
                                            <StudyingText>모집완료</StudyingText>
                                    </StudyingWrap>
                                    <StatusWrap>
                                    <TagWrap>
                                        <Tag>{e.tag2}</Tag>
                                        <Tag>{e.tag1}</Tag>
                                        <Tag>{e.tag3}</Tag>
                                    </TagWrap>
                                    <NumWrap>
                                        <PersonIcon src={Personnelicon}></PersonIcon>
                                        <UserNum>{e.userCount}/{e.maxUser}</UserNum>
                                    </NumWrap>
                                    </StatusWrap>
                                </TextWrap>
                            </StudyRoom>
                            )
                    }
                }
                })
            }
            </ContentWrap>
        </RoomListWrap>
    );
};
const RoomListWrap = styled.div`
    max-width : 738px;
    min-width : 654px;
    width : 38.5vw;
    border-radius : 15px;
    justify-content : center;
    background-color : white;
    margin-top : 23px;
    padding : 0 50px 52px 50px;
    box-shadow: 1px 1px 15px 5px rgba(102,96,173,0.14);
`
const TopWrap = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : 40px;
`;
const ContentWrap = styled.div`
    display : grid;
    gap : 18px;
    margin-top : 25px;
`
const StudyRoom = styled.div`
    min-width : 555px;
    max-width : 618px;
    width : 32.25vw;
    height : 106px;
    border : 1px soild #DEE3E8;
    border-radius : 10px;
    display:flex;
    background-color: #F9F9FA;
    gap : 5px;
    padding : 27px 20px 27px 20px;
    cursor : pointer;
`
const ProfileImg = styled.div`
    --size: 58px;
    min-width: var(--size);
    min-height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
`
const TextWrap = styled.div`
    display : block;
    width : 694px;
    height : 116px;
    margin-left : 12px;
`
const TitleText = styled.p`
    min-width :365px; 
    max-width :415px; 
    width :21vw; 
    height :24px;
    overflow :hidden;
    font-size : 16px;
    font-family: "PretendardBold";
    margin-bottom : 12px;
    float :left;
`
const StatusWrap = styled.div`
    display : flex;
    justify-content : space-between;
    clear :both;
`
const TagWrap = styled.div`
    display : flex;
    gap : 8px;
    min-width : 300px;
    max-width : 350px;
    width : 18.4vw;
`
const Tag = styled.div`
    min-width : 48px;
    max-width : 200px;
    height : 24px;
    display : flex;
    border-radius : 25px;
    justify-content : center;
    text-align : center;
    padding-left : 5px;
    padding-right : 5px;
    font-size : 12px;
    font-family: "PretendardMedium";
    background-color:#EFEFFB;
    color : #6B63F6;
    line-height : 2;
`
const DescText = styled.p`
    font-family: "PretendardBold";
    font-size : 22px;
    margin-bottom : 0;
`
const Reload = styled.button`
   width :110px;
   height :45px;
   margin-right : 0.7vw;
   border-radius : 10px;
   border : 1px solid #C6C6C6;
   background : none;
   display :flex;
   align-items:center;
   justify-content:center;
   cursor: pointer;
   &:hover{
        background-color : #FBFBFB;
        border: 1px solid #C6C6C6;
    }
`
const UndoIcon = styled.img`
   width : 17px;
   padding-bottom : 2px;
   margin-right : 5px;
`
const Text = styled.div`
   font-size : 16px;
   color: #898989;
   font-family: "PretendardRegular";
   cursor: pointer;
`
const NumWrap = styled.div`
   display :flex;
    vertical-align: bottom;
    align-items : center;
    justify-content: center;
`
const PersonIcon = styled.img`
    vertical-align: bottom;
    width: 14px;
    margin-right :8px;
`
const UserNum = styled.div`
    font-size : 14px;
    font-family: "PretendardMedium";
    color : #6B63F6;
    height : 21px;
    line-height : 1.7;
`
const StudyingWrap = styled.div`
    width : 72px;
    display : flex;
    float :right;
    align-items : center;
    justify-content: right;
`;
const StudyingGreen = styled.div`
    width : 10px;
    height : 10px;
    border-radius : 50px;
    background: #74BE72;
    margin-right : 6px;
    font-size : 16px;
    font-family: "PretendardMedium";
`;
const StudyingRed = styled.div`
    width : 10px;
    height : 10px;
    border-radius : 50px;
    background: #F07474;
    margin-right : 6px;
    font-size : 16px;
    font-family: "PretendardMedium";
`;
const StudyingText = styled.div`
    color : #000;
    font-size : 14px;
`;
const IssuePageWrap = styled.div`
    display : grid;
    width : 32.1vw;
    max-width : 616px;
    min-width : 556px;
    height:991px;
    gap : 18px;
    margin-top : 91px;
    padding: 287px 100px 502px 100px ;
    overflow : hidden;
`
const IssueIcon = styled.img`
    margin-left : auto;
    margin-right : auto;
    margin-bottom : 30px;
`
const IssueMsg = styled.p`
    font-size : 32px;
    font-family: "PretendardSemiBold";
    color: #272727;
    margin-bottom : 0px;
    margin-left : auto;
    margin-right : auto;
`
const GuideIssue = styled.p`
    font-size : 24px;
    font-family: "PretendardRegular";
    color : #7A7A7A;
    margin-left : auto;
    margin-right : auto;
`
export default StudyRoomMain;