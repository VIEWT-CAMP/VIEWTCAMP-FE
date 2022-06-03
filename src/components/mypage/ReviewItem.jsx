import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { actionCreators as reviewActions } from "../../redux/modules/review";
import Unfold from "../../assets/Unfold.svg"
import Fold from "../../assets/Fold.svg"

const RoomItem = (props) => {
    
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(reviewActions.getReviewDB());
    },[]);

    const [isOpen, setMenu] = useState(false);  
    const [edits, setEdits] = useState(false);  
    const [editSend, setEditSend] = useState(false);  

    if(editSend?.length > 2000){
        alert("소감수정은 최대 2000자까지만 작성 가능합니다.")
    }

    const toggleMenu = () => {
        setMenu(isOpen === false ? true : false);
    }

    const edit = () => {
        setEdits(edits === false ? true : false);
    }

    const postId = props.e.id

    const editSave = () => {
        dispatch(reviewActions.editReviewDB(editSend,postId))
        setEdits(edits === false ? true : false);
    }

    const DeleteReview = () => {
        dispatch(reviewActions.deleteReviewDB(postId))
    }

    return (
        <div>
            {isOpen === false
                ? <FoldBtn src={Fold} onClick={toggleMenu}></FoldBtn>
                : <UnFoldBtn src={Unfold} onClick={toggleMenu}></UnFoldBtn>
            }
                <div>
                    <RoomTitle>{props.e.title}</RoomTitle>

                    <Day>{props.e.createdAt}</Day>
                {isOpen ? edits === false 
                ?
                <Show> 
                    <Text>
                        {props.e.review}
                    </Text>
                        <BTNwrap1>
                            <EditBTN onClick={edit}>수정</EditBTN>
                            <DeleteBTN onClick={DeleteReview}>삭제</DeleteBTN>
                        </BTNwrap1>
                 </Show>
                 :<><EditInput onChange={(e)=> setEditSend(e.target.value)} defaultValue={props.e.review}/> 
                    <TextLength>{editSend ? editSend.length : props.e.review.length + 0}/2000</TextLength>
                <BTNwrap>
                    <CancelBTN onClick={edit}>취소</CancelBTN>  
                    <SaveBTN onClick={editSave}>저장</SaveBTN>
                 </BTNwrap>
                 </>             
                 :false
                }
                </div>
        </div>

    );
};

const FoldBtn = styled.img`
    width : 30px;
    height : 30px;
    font-size : 12px;
    text-align:center;
    background-color : #dfdfdf;
    border : none;
    border-radius : 50px;
    position :absolute;
    top : 20px;
    left : 24px;
`
const UnFoldBtn = styled.img`
    width : 30px;
    height : 30px;
    font-size : 12px;
    text-align:center;
    background-color : #dfdfdf;
    border : none;
    border-radius : 50px;
    position :absolute;
    top : 20px;
    left : 24px;
`
const RoomTitle = styled.div`

    margin-left : 63px;
    font-size : 16px;
    font-family: "PretendardSemiBold";
    margin-bottom : 3px;
`
const Day = styled.div`
    font-size : 12px;
    font-family: "PretendardRegular";
    color : #7b7b7b;
    margin-bottom : 11px;
    margin-left : 63px;
`

const Show = styled.div`
    max-width: 60%;
    min-width: 94%;
    margin : 0 auto;
`
const Text = styled.div` 
    transition: 1s;
    border : 1px solid #dadada;
    background : #fff;
    border-radius : 10px;
    padding : 22px;
    font-size : 14px;
    font-family: "PretendardRegular";
`
const BTNwrap = styled.div`
    font-size : 16px;
    position:relative;
    left : 86%;
    transform : translate(-14%);
`
const BTNwrap1 = styled.div`
    font-size : 16px;
    font-family: "PretendardMedium";
    position:relative;
`

const EditBTN = styled.button`
    font-size : 16px;
    font-family: "PretendardMedium";
    color : #6B63F6;
    width : 82px;
    padding-top : 10px;
    padding-bottom : 10px;
    background : #EBEBFF;
    border : 1px solid #6B63F6;
    border-radius : 10px;
    margin-top : 16px;
    position:relative;
    left : 89%;
    &:hover{
        background : #DCDCFF;
    }
`
const SaveBTN = styled.button`
    font-size : 16px;
    font-family: "PretendardMedium";
    color : #FFFFFF;
    width : 82px;
    padding-top : 10px;
    padding-bottom : 10px;
    margin-right : 10px;
    background : #6B63F6;
    border : none;
    border-radius : 10px;
    margin-top : 16px;
    &:hover{
        background-color : #8983FF;
    }
`

const DeleteBTN = styled.button`
    font-size : 16px;
    font-family: "PretendardMedium";
    color : #666C78;
    width : 82px;
    padding-top : 10px;
    padding-bottom : 10px;
    background : #FFFFFF;
    border : 1px solid #666C78;
    border-radius : 10px;
    margin-top : 16px;
    position:relative;
    left : -10.6%;
    &:hover{
        background : #F0F0F0;
    }
`

const CancelBTN = styled.button`
    font-size : 16px;
    font-family: "PretendardMedium";
    color : #6B63F6;
    width : 82px;
    padding-top : 10px;
    padding-bottom : 10px;
    margin-right : 10px;
    background : #FFFFFF;
    border : 1px solid #6B63F6;
    border-radius : 10px;
    margin-top : 16px;
    &:hover{
        background : #EBEBFF;
    }
`
const EditInput = styled("textarea").attrs({ maxLength: "2000"})`
    max-width: 60%;
    min-width: 94%;
    height : 200px;
    margin : 0 auto;
    display : block;
    transition: 1s;
    border : 1px solid #dadada;
    background : #fff;
    border-radius : 10px;
    padding : 22px;
    font-size : 14px;
    font-family: "PretendardMedium";
    resize : none;
    :focus{
        outline: none;
        }
`
const TextLength = styled.div`
    font-size :12px;
    font-family: "PretendardRegular";
    color : #C9C9C9;
    position : absolute;
    bottom : 10vh;
    right : 2.5vw;
`;

export default RoomItem;