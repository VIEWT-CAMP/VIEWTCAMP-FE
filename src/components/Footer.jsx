import React from 'react';
import styled from "styled-components";
import footerLogo from "../assets/FOOTERLOGO.svg"
import { history } from "../redux/configureStore";
import instagram from "../assets/instagram_back_none.png"
import github from "../assets/github_back_none.png"
import youtube from "../assets/youtube_back_none.png"


const Footer = (props) => {
    return (
        <FooterWrap>
            <LogoNCopyRight>
                <img src={footerLogo}></img>
                <CopyRight>Copyright @2022 VIEWTCAMP.All rights reserved.</CopyRight>
                <InfoBtnWrap>
                    <InfoBtn onClick={()=>{history.push('/privacy')}}>개인정보보호</InfoBtn>
                    <InfoBtn onClick={()=>{window.open('https://docs.google.com/forms/d/e/1FAIpQLSfHwATscVu_nd9Bbl2zxJJoJScIUbGLswwY_Vm-TU0jBd8IkA/viewform?usp=sf_link')}}>오류제보</InfoBtn>
                    <InfoBtn onClick={()=>{window.open('https://docs.google.com/forms/d/e/1FAIpQLSdQCqXZvUOIztH0jERgXMGxupZnuU_OmOXwJZKXB44aHdY9pQ/viewform?usp=sf_link')}}>만족도평가</InfoBtn>
                </InfoBtnWrap>
            </LogoNCopyRight>
            <InfoWrap>
                <Teammate>Teammate</Teammate>
                <Line/>
            <RoleWrap>
                <InfoCateWrap>
                    <RoleTitle>대표자 : 김원희</RoleTitle>
                    <ContactText>E-mail : cheeky4@naver.com</ContactText>
                    <SnsWrap>
                        <Contact onClick={() => window.open('https://www.instagram.com/viewtcamp/', '_blank')}>
                            <ContactInsta src={instagram}></ContactInsta>
                        </Contact>
                        <Contact onClick={() => window.open('https://github.com/VIEWT-CAMP', '_blank')}>
                             <ContactGit src={github}></ContactGit>
                        </Contact>
                        <Contact onClick={() => window.open('https://youtu.be/-W7iHffknfM', '_blank')}>
                             <ContactYoutube src={youtube}></ContactYoutube>
                        </Contact>
                    </SnsWrap>

                    
                </InfoCateWrap>
                <RoleCateWrap>
                    <RoleTitle>Developer</RoleTitle>
                    <FEBEWrap>
                        <NameText>김원희</NameText>
                        <NameText>김태현</NameText>
                    </FEBEWrap>
                    <FEBEWrap>
                        <NameText>김현진</NameText>
                        <NameText>조병윤</NameText>
                    </FEBEWrap>                    
                </RoleCateWrap>
                <RoleCateWrap>
                    <RoleTitle>Designer</RoleTitle>
                    <NameText>박유림</NameText>
                    <NameText>홍지윤</NameText>
                </RoleCateWrap>
            </RoleWrap>
            </InfoWrap>
            
        </FooterWrap>
    );
};

const FooterWrap = styled.div`
    height : 330px;
    max-width : 1648px;
    min-width : 1400px;
    width :86vw;
    padding : 70px 212px 70px 10.9vw;
    background-color : #3C4145;
    margin : 60px -60px 0 -120px;
    display : flex;
`
const LogoNCopyRight = styled.div`
`

const CopyRight = styled.p`
    font-size : 14px;
    font-family: "PretendardRegular";
    width:315px;
    color : #FFFFFF;
    margin-top : 15px;
    margin-bottom: 0px;
`

const InfoBtnWrap = styled.div`
    display : flex;
    gap : 13px;
    margin-top : 70px;

`
const InfoBtn = styled.p`
    font-size : 14px;
    font-family: "PretendardMedium";
    border : none;
    background-color : transparent;
    color : white;
    text-align : left;
    cursor:pointer;
`

const InfoWrap = styled.div`
    display : grid;
    width : 705px;
    color : #FFFFFF;
    margin-left : 117px;
`
const Teammate = styled.p`
    font-size : 20px;
    font-family: "PretendardSemiBold";
    color : #FFFFFF;
    margin-bottom:0;
`

const Line = styled.hr`
    width : 43vw;
    color : #777A7D;
    margin-top : 0px;
    margin-bottom : 0px;
`
const RoleWrap = styled.div`
    display:flex;
`

const InfoCateWrap = styled.div`
    display : grid;
    width : 21.4vw;
    min-width:300px;
`
const RoleCateWrap = styled.div`
    display:grid;
    width : 13.2vw;
    min-width : 165px;

`
const RoleTitle = styled.p`
    color : #FFFFFF;
    font-size : 18px;
    font-family: "PretendardSemiBold";
    margin-bottom : 13px;
`

const FEBEWrap = styled.div`
    display : flex;
`
const NameText = styled.p`
    color : #FFFFFF;
    font-size : 16px;
    font-family: "PretendardMedium";
    margin-bottom : 8px;
    margin-right : 2vw;
`
const ContactText = styled.p`
    color : #FFFFFF;
    font-size : 16px;
    font-family: "PretendardLight";
    margin-bottom : 8px;

`
const SnsWrap = styled.div`
    width : 120px;
    display :flex;
`
const Contact = styled.div`
    color : #FFFFFF;
    font-size : 16px;
    font-family: "PretendardLight";
    margin-bottom : 8px;
    margin-right : 12px;
    &:hover{
        cursor : pointer;
    }
`
const ContactInsta = styled.img`
   width : 23px;
    height: 23px;
`
const ContactGit = styled.img`
   width : 25px;
    height: 25px;
`
const ContactYoutube = styled.img`
   width : 25px;
    height: 25px;
`

export default Footer;