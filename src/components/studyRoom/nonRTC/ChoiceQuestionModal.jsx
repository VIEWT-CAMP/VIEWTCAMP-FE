import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import {actionCreators as questionActions} from "../../../redux/modules/question";
import QuestionModal from '../nonRTC/QuestionModal'
import closeBTN from '../../../assets/closeBTN.png'

function ChoiceQuestionModal(props) {
    const {close} =props;
    const userReducer = useSelector((state) => state.profile.list)
    const dispatch = useDispatch();

    const [modal,setModal] = React.useState(false);

    const mine = () => {
         dispatch(questionActions.getRoomQuestionDB(userReducer.nickname))
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

  return (
    <Wrap>
        <TitleWrap>
            <Title>나의 예상질문</Title>
            <Exit onClick={close}><Img src={closeBTN}/></Exit>
        </TitleWrap>
         <MyButton onClick={mine}>보기</MyButton>
         <MyWriteButton  onClick={openModal}>작성하기</MyWriteButton>
    
    {
        modal ===true ?
                <QuestionModal
                close={closeModal}
                />
                :null
    }
</Wrap>
  )
}

const Wrap = styled.div `
  width : 270px;
  height:170px;
  padding : 20px;
  background : #fff;
  border : 1px solid #6B63F6;
  border-radius : 20px;
  position :absolute;
  bottom:13.5vh;
  right: 20px;
  z-index:8;
`;
const TitleWrap = styled.div `
  width : 100%;
  margin-bottom : 13px;
  display : flex;
  align-items :center;
  justify-content:center;
`;

const Title = styled.div `
  font-family: "PretendardSemibold";
  font-size : 20px;
  color : #2B303B;
`;

const Exit = styled.button `
  width : 20px;
  margin-left : 99px;
  border :none;
  background : none;
`;
const Img = styled.img `
  width : 17px;
  height :17px;
  margin-bottom : 5px;
`;

const MyButton = styled.button `
  width : 230px;
  height : 40px;
  background : #6B63F6;
  border-radius : 10px;
  color : #fff;
  font-size:16px;
  font-family: "PretendardMedium";
  border : none;
  justify-content :center;
  align-items : center;
  margin-bottom : 8px;
  &:hover{
      background : #8983ff;
  }
`;
const MyWriteButton = styled.button `
  width : 230px;
  height : 40px;
  background : #EBEBFF;
  border-radius : 10px;
  color : #6b63f6;
  font-size:16px;
  font-family: "PretendardMedium";
  border : 1px solid #6b63f6;
  justify-content :center;
  align-items : center;
  &:hover{
      background : #D7D7FF;
  }
`;
export default ChoiceQuestionModal