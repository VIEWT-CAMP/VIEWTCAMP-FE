import React from 'react';
import styled from "styled-components";

const FollowingItem = (props) => {
    return (
        <TotalWrap>
            <BoxWrap>
                <ProfileImg src = {props?.e?.followingUser?.profileImg} />
                <UserWrap>
                    <UserName>{props?.e?.followingUser?.nickname}</UserName>
                    <UserPr>{props?.e?.followingUser?.userPr}</UserPr>
                </UserWrap>
            </BoxWrap>        
        </TotalWrap>
    );
};
const TotalWrap = styled.div`
    display:grid;
`

const BoxWrap = styled.div`
    display : flex;
`

const ProfileImg = styled.div`
    --size: 60px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
`

const UserWrap = styled.div`
    justify-content : space-between;
`
const UserName = styled.p`
    margin-left : 18px;
    font-size : 16px;
    font-family: "PretendardSemiBold";
    margin-bottom : 12px;
`
const UserPr = styled.p`
    margin-left : 18px;
    font-size : 14px;
    font-family: "PretendardRegular";
    color : #7B7B7B;
`

export default FollowingItem;