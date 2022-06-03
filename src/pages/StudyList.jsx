import React from 'react';
import styled from "styled-components";
import Gnb from '../components/Gnb';
import StudyClassify from '../components/studyList/StudyClassify';
import StudyRoomList from '../components/studyList/StudyRoomList';
import Footer from '../components/Footer';
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import {actionCreators as studyListAction} from "../redux/modules/studyList"
import {actionCreators as profileAction} from "../redux/modules/profile"


const StudyList = (props) => {
    const dispatch = useDispatch();
    const profileList = useSelector((state)=>state.profile.list)

    React.useEffect(() => {
        dispatch(studyListAction.getRoomAllDB(1));   
        dispatch(profileAction.getProfileDB());
        dispatch(studyListAction.getStudyListDB(1,"null","null","null","null","null"));   
    },[]);

    const sessionStoragetokenCheck = sessionStorage.getItem('Authorization');
    const handleLogout = () => {
        dispatch(userActions.logout());
        history.push("/")
    };

    return (
            <ContainerWrap>  
                <Gnb/>
                <ContentWrap>
                    {!sessionStoragetokenCheck 
                        ? <KakaoLoginBtn onClick={()=>{
                            history.push("/login")
                        }}>로그인
                        </KakaoLoginBtn>
                        : 
                        <ProfileWrap>
                             <MypageWrap onClick={()=>{history.push("/mypage/review")}}>
                                <ProfileImg src={profileList.profileImg} />
                                <UserName>
                                    {profileList.nickname}
                                </UserName>
                            </MypageWrap>
                            <KakaoLogOutBtn onClick={handleLogout}>로그아웃</KakaoLogOutBtn>
                        </ProfileWrap>
                    }
                    <PaddingDiv>
                    <TitleDiv>    
                    <DescText>
                        면접 스터디원을 가장 빠르게 구하고, 화상스터디로 함께 성장하세요!
                    </DescText>
                    </TitleDiv>
                    <BoxWrap>
                        <StudyClassify/>
                        <StudyRoomList/> 
                    </BoxWrap>
                    <Footer/>
                    </PaddingDiv>
                </ContentWrap>        
            </ContainerWrap>
    );
};


const ContainerWrap = styled.div`
    display : flex;
    justify-content : start;
    text-align : start;
    border-radius : 15px;
    background : #F5F5FB;
    padding-right:60px;
    min-width : 1290x;
    width : 100vw;
`
const ContentWrap = styled.div`
    display : gird;
    margin-left : 272px;
    width : 85vw;
    max-width:1526;
    min-width : 1310px;
`
const PaddingDiv = styled.div`
    padding-left : 60px;
    display : gird;
    width : 78vw;
    min-width : 1300px;
`
const BoxWrap = styled.div`
    display : flex;
    max-width : 1528px;
    min-width : 1150px;
    width:80vw;
    gap : 3vw;
`
const KakaoLoginBtn = styled.button`
    width : 180px;
    height : 48px;
    background-color : #6B63F6;
    float : right;
    border:none;
    border-radius : 10px;
    font-family: "PretendardBold";
    margin-top: 60px;
    color:#FFFFFF;
    &:hover{
        background-color : #8983FF;
    }

`

const ProfileWrap = styled.div`
    display : flex;
    float : right;
    margin : 60px 0px 60px 0;
    gap : 15px;
`
const MypageWrap = styled.div`
    height :51px;
    display:flex;
    align-items :center;
    justify-content:center;
    cursor: pointer;
`
const ProfileImg = styled.div`
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
    margin-right :14px;

`
const KakaoLogOutBtn = styled.button`
    width : 180px;
    height : 48px;
    background-color : #AAAAAA;
    float : right;
    border:none;
    border-radius : 10px;
    font-family: "PretendardBold";
    margin-left: 25px;
    color:#FFFFFF;
    &:hover{
        background-color : #BEBEBE;        
    }
`
const UserName = styled.p`
    font-size : 20px;
    font-family: "PretendardSemiBold";
    margin-top : 15px;
`

const TitleDiv = styled.div`
`
const DescText = styled.div`
    font-size : 32px;
    font-family: "PretendardBold";
    display:grid;
    margin-top: 108px;
    min-width : 871px;
`



export default StudyList;