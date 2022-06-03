import React from 'react';
import styled from "styled-components";
import Personnelicon from "../../assets/Personnelicon.svg";

const Room = (props) => {
    return (
             <>
            <ProfileImg src={props.e.user.profileImg}/>
            <TextWrap>
                <TitleDiv>
                    <TitleText>{props.e.title}</TitleText>
                    {props.e.studying === false ?
                        <StudyingWrap>
                            <StudyingGreen></StudyingGreen>
                            <StudyingText>모집중</StudyingText>
                        </StudyingWrap>
                        :
                        <StudyingWrap>
                            <StudyingRed></StudyingRed>
                            <StudyingText>모집완료</StudyingText>
                        </StudyingWrap>
                    }
                </TitleDiv>
                <StatusWrap>
                <TagWrap>
                    <Tag>{props.e.tag2}</Tag>
                    <Tag>{props.e.tag1}</Tag>
                    <Tag>{props.e.tag3}</Tag>
                </TagWrap> 
                    <NumDiv>
                    <PersonIcon src={Personnelicon}></PersonIcon>
                    <UserNum>{props.e.userCount}/{props.e.maxUser}</UserNum>
                    </NumDiv>
                </StatusWrap>
            </TextWrap>
            </>
    );
};


const ProfileImg = styled.div`
    --size: 70px;
    min-width: var(--size);
    min-height: var(--size);
    border-radius: var(--size);
    border : 1px soild #DEE3E8;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin-right: 20px;
    background-position : 20% 70%;
`
const TextWrap = styled.div`
    width : 50vw;
    height : 70px;
`
const TitleDiv = styled.div`
    min-width:440px;
    font-size : 16px;
    font-family: "PretendardBold";
    margin-bottom : 15px;
    display:flex;
    justify-content : space-between;
`
const TitleText = styled.p`
    display : flex;
    gap : 5px;
    margin-bottom :0px;
`

const StatusWrap = styled.div`
    display : flex;
    justify-content : space-between;
`
const TagWrap = styled.div`
    display : flex;
    gap : 5px;
    min-width : 396px;
`
const Tag = styled.div`
    min-width : 48px;
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
const NumDiv = styled.div`
    display:flex;
`

const PersonIcon = styled.img`
    line-height : 1;
    vertical-align: bottom;
    width : 14px;
`
const UserNum = styled.div`
    font-size : 14px;
    font-family: "PretendardMedium";
    color : #6b63f6;
    margin-left : 7px;
    height : 21px;
    line-height : 1.7;
`
const StudyingWrap = styled.div`
    width : 65px;
    display : flex;
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


export default Room;