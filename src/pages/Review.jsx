import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { actionCreators as reviewActions } from "../redux/modules/review";
import { actionCreators as studyListActions } from "../redux/modules/studyList";
import jwtDecode from "jwt-decode";

function Review() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(()=>{
          dispatch(studyListActions.getRoomAllDB());
    },[]);

    const token = sessionStorage.getItem("Authorization");
    const BanUserName = jwtDecode(token).USER_NAME;

const Myinfo = useSelector((state) => state.profile.list);
const roomTitle = params.title
const username = Myinfo.username
const [review,setSeview] = useState();

const changeContent = (e) => {
    if(e.target.value.indexOf(' ')===0){
        setSeview(" ")
    }else{
        setSeview(e.target.value)
    }
}

if(review?.length > 2000){
    alert("소감작성은 최대 2000자까지만 작성 가능합니다.")
}

const send = () => {
        if (review === "" || review === undefined) {
            alert("내용을 입력해 주세요.")
        }else if (review===" "){
            alert("내용은 공백으로 시작할 수 없습니다.")
        }else{
            dispatch(reviewActions.createReviewDB(review,roomTitle))
            history.push('/mypage/review')
        }
}

  return (
    <Wrap>
        <ContentWrap>
            {
                username ?
                <ConTitle>
                    {username}님,<br/>
                    오늘 스터디에서 배운 점이 있으신가요?
                </ConTitle>
                :<ConTitle>
                    {BanUserName}님,<br/>
                    오늘 스터디에서 배운 점이 있으신가요?
                 </ConTitle>
            }
                <ReviewWrap>
                    <ConReview 
                    type="textarea" 
                    placeholder="내용을 적어주세요."
                    onChange={changeContent}
                    ></ConReview>
                    <TextLength>{review ? review.length : 0}/2000</TextLength>
                </ReviewWrap>
                <BtnWrap>
                    <ButtonClose onClick={()=>history.push('/')}>다음에 작성할래요</ButtonClose>
                    <ButtonSave onClick={send}>저장하기</ButtonSave>
                </BtnWrap>
        </ContentWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
    margin : 0 auto;
    width : 100%;
    height : 100vh;
    padding : 5vh 3vw;
    background : #F5F5FB;
`;

const ContentWrap = styled.div`
    margin : 0 auto;
    width: 100%;
    height: 100%;
    background : #fff;
    border-radius : 30px;
    padding : 16vh 11.5vw;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`;

const ConTitle = styled.div`
    font-size :30px;
    font-family: "PretendardBold";
    margin-bottom : 3.7vh;
`;

const ReviewWrap = styled.div`
    position : relative;
    margin-bottom : 2.6vh;
`;

const ConReview = styled("textarea").attrs({ maxLength: "2000"})`
    width : 100%;
    font-size :18px;
    font-family: "PretendardRegular";
    height : 33.7vh;
    background : #f6f6f6;
    padding : 1.56vw;
    resize: none;
    border-radius : 17px;
    border : none;
    &:focus{
        outline: none;
        }
`;
const TextLength = styled.div`
    font-size :14px;
    font-family: "PretendardRegular";
    color : #A9A9A9;
    position : absolute;
    bottom : 3.3vh;
    right : 2.1vw;
`;

const BtnWrap = styled.div`
    width : 100%;
    display : flex;
`;

const ButtonClose = styled.button`
    width : 50%;
    height : 5.8vh;
    background : #A5A5A5;
    font-size : 16px;
    font-family: "PretendardRegular";
    color : white;
    border-radius : 10px;
    text-align : center;
    border : none;
    margin-right : 0.83vw;
    &:hover {
        background : #787878;
    }
`;
const ButtonSave = styled.button`
    width : 50%;
    height : 5.8vh; 
    background : #6B63F6;
    font-size : 16px;
    font-family: "PretendardRegular";
    color : white;
    border-radius : 10px;
    text-align : center;
    border : none;
    &:hover {
        background : #8983FF;
    }
`;



export default Review