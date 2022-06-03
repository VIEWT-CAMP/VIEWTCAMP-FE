import React from 'react';
import styled from "styled-components";
import Gnb from '../components/Gnb';
import Footer from '../components/Footer';
import StudyRoomMain from '../components/main/StudyRoomMain';
import YoutubeSlider from '../components/main/YoutubeSlider'
import AdBanner from '../components/main/AdBanner'
import Banner from '../components/main/Banner'
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";

const Main = (props) => {
    const dispatch = useDispatch();
    const sessionStoragetokenCheck = sessionStorage.getItem('Authorization');
    const profileList = useSelector((state)=>state.profile.list)
   
    React.useEffect(()=>{
        console.log(" ______  ______  ______  ______  ______  ______  ______  ______  ______")
        console.log("||V   ||||I   ||||E   ||||W   ||||T   ||||C   ||||A   ||||M   ||||P   ||")
        console.log("||____||||____||||____||||____||||____||||____||||____||||____||||____||")
        console.log("|/____\\||/____\\||/____\\||/____\\||/____\\||/____\\||/____\\||/____\\||/____\\|")        
        dispatch(profileActions.getProfileDB());
    },[])

    const handleLogout = () => {
        dispatch(userActions.logout());
        history.push("/")
    };

    return (
        <div>
            <ContainerWrap>  
                <Gnb/>
                <ContentWrap>
                    <LoginWrap>
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
                    </LoginWrap>
                    <DescText>
                        당신의 면접을 응원합니다.              
                    </DescText>
                    <BoxWrap>
                        <StudyRoomMain/>
                        <SlideWrap>
                            <YoutubeSlider></YoutubeSlider>
                            <Banner></Banner>
                            <AdBanner></AdBanner>
                        </SlideWrap> 
                    </BoxWrap>
                    <Footer/>       

                </ContentWrap> 
            </ContainerWrap>
        </div>
    );
};

const ContainerWrap = styled.div`
    display : flex;
    gap : 60px;
    justify-content : start;
    text-align : start;
    border-radius : 15px;
    background : #F5F5FB;
`
const ContentWrap = styled.div`
    display : gird;
    margin-left : 332px;
`
const BoxWrap = styled.div`
    display : flex;
    gap : 60px;
`

const SlideWrap = styled.div`
    width :100px;
    display : grid;
    gap : 60px;
`
const LoginWrap = styled.div`
   position :absolute;
   right :43px;
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

const DescText = styled.p`
    font-size : 32px;
    font-family: "PretendardBold";
    color:#2B303B;
    margin-top: 110px;
`


export default Main;