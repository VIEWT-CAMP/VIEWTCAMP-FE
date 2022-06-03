import React, { useState } from 'react';
import styled from "styled-components";
import Gnb from '../components/Gnb';
import MyReview from '../components/mypage/MyReview';
import MyProfile from '../components/mypage/MyProfile'
import Footer from '../components/Footer';
import ExpectQuestions from '../components/mypage/ExpectQuestions';
import {useDispatch, useSelector } from 'react-redux';
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as questionActions } from "../redux/modules/question";
import { actionCreators as  profileActions } from "../redux/modules/profile";
import { actionCreators as  userActions } from "../redux/modules/user";
import { Redirect, useParams } from 'react-router-dom';
import FollowerList from '../components/mypage/FollowerList';
import FollowingList from '../components/mypage/FollowingList';
import { history } from "../redux/configureStore";


const Mypage = (props) => {
    const dispatch = useDispatch();
    const profileList = useSelector((state)=>state.profile.list)
    const sessionStoragetokenCheck = sessionStorage.getItem('Authorization');
    const param = useParams();

    React.useEffect(()=>{
        dispatch(profileActions.getProfileDB());
        dispatch(reviewActions.getReviewDB());
        dispatch(questionActions.getQuestionDB());
        dispatch(userActions.getFollowingDB());
        dispatch(userActions.getFollowerDB());
    },[])
    
    const handleLogout = () => {
        dispatch(userActions.logout());
        history.push("/")
    };

    if(!sessionStoragetokenCheck){
        return (
            alert('로그인 후 입장가능합니다.'),
            <Redirect to ={'/login'}/>
        )
    } else if (param.id === "review") {
        
        return (
            <div>
                <ContainerWrap>  
                    <Gnb/>
                    <ContentWrap>
                        <ProfileWrap>
                        <MypageWrap>
                            <ProfileImg src={profileList.profileImg} />
                            <UserName>
                                {profileList.nickname}
                            </UserName>
                        </MypageWrap>
                            <KakaoLogOutBtn onClick={handleLogout}>로그아웃</KakaoLogOutBtn>
                        </ProfileWrap>
                        
                        <DescText>
                            {profileList.nickname}님의 마이페이지
                        </DescText>
                        <BoxWrap>
                            <MyReview/>
                            <InfoWrap>
                                <MyProfile/> 
                                <ExpectQuestions/>  
                            </InfoWrap>
                        </BoxWrap>
                        <Footer/>
                    </ContentWrap>        
                </ContainerWrap>
            </div>
        );

    } else if (param.id === "follower") {
        return (
            <div>
                <ContainerWrap>  
                    <Gnb/>
                    <ContentWrap>
                        <ProfileWrap>
                        <MypageWrap>
                            <ProfileImg src={profileList.profileImg} />
                            <UserName>
                                {profileList.nickname}
                            </UserName>
                        </MypageWrap>
                            <KakaoLogOutBtn onClick={handleLogout}>로그아웃</KakaoLogOutBtn>
                        
                        </ProfileWrap>
                        
                        <DescText>
                            {profileList.nickname}님의 마이페이지
                        </DescText>
                        <BoxWrap>
                            <FollowerList/>
                            <InfoWrap>
                                <MyProfile/> 
                                <ExpectQuestions/>  
                            </InfoWrap>
                        </BoxWrap>
                        <Footer/>
                    </ContentWrap>        
                </ContainerWrap>
            </div>
        );
    } else if (param.id === "following"){
        return (
            <div>
                <ContainerWrap>  
                    <Gnb/>
                    <ContentWrap>
                        <ProfileWrap>
                        <MypageWrap>
                            <ProfileImg src={profileList.profileImg} />
                            <UserName>
                                {profileList.nickname}
                            </UserName>
                            </MypageWrap>
                            <KakaoLogOutBtn onClick={handleLogout}>로그아웃</KakaoLogOutBtn>

                        </ProfileWrap>
                        <DescText>
                            {profileList.nickname}님의 마이페이지
                        </DescText>
                        <BoxWrap>
                            <FollowingList/>
                            <InfoWrap>
                                <MyProfile/> 
                                <ExpectQuestions/>  
                            </InfoWrap>
                        </BoxWrap>
                        <Footer/>
                    </ContentWrap>  
                </ContainerWrap>
            </div>
        );
    }
    
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
    margin-left : 332px;
    width : 85vw;
    max-width:1526;
    min-width : 1250px;
`
const BoxWrap = styled.div`
    display : flex;
    max-width : 1528px;
    min-width : 1150px;
    width:80vw;
    gap : 3vw;
`
const InfoWrap = styled.div`
    display : grid;
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
const DescText = styled.p`
    font-size : 32px;
    font-family: "PretendardBold";
    margin-top: 108px;
`
const UserName = styled.p`
    font-size : 20px;
    font-family: "PretendardSemiBold";
    margin-top : 15px;
`

export default Mypage;