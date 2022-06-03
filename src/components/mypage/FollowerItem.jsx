import React, { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import styled from "styled-components";
import { actionCreators as reviewActions } from "../../redux/modules/review";

const FollowerItem = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(reviewActions.getReviewDB());
    },[]);

    return (
        <TotalWrap>
            <ProfileImg src = {props.e.user.profileImg} />
            <UserWrap>
                <UserName>{props.e.user.nickname}</UserName>
                <UserPr>{props.e.user.userPr}</UserPr>
            </UserWrap>
        </TotalWrap>
    );
};

const TotalWrap = styled.div`
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

export default FollowerItem;