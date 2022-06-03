
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import {actionCreators as questionActions} from "../../../redux/modules/question";
import closeBTN from '../../../assets/closeBTN.png'
import Delete from "../../../assets/Delete.svg"

function BanUserModal(props) {

    const {close} = props;

  React.useEffect(() => {
    dispatch(questionActions.getRoomQuestionDB(userReducer.nickname))
    }, []);

  
  const dispatch = useDispatch();
  const getQuestion = useSelector((state)=>state.question.question_list)
  const [questionList, setQuestionList] = React.useState([getQuestion.question]);
  const [question,setQuestion] = React.useState({message: ""});

  const handleInputQuestion = (e) =>{
    if(e.target.value.indexOf(' ')===0){
        setQuestion({...question,
            message : ""})
    }else{
        setQuestion({...question,
            message : e.target.value});
    }
    
}
const userReducer = useSelector((state) => state.profile.list)

if(question.message?.length > 25){
  alert("예상질문은 최대 25자까지만 작성 가능합니다.")
}

const onEnterPress = (e) => {
  if (e.keyCode === 13 && e.shiftKey === false && question.message !== "") {
    return creatQusetion();
  }
};

  const creatQusetion = () => {
    setQuestionList([...questionList, question.message])
    dispatch(questionActions.addQuestionDB(question.message,userReducer.nickname))
    setQuestion({...question,
        message : ''})
  }

  return (
    <>
    <Background>
    </Background> 
    <Wrap>
      <TitleWrap>
        <Title>
          연습해보고 싶은 예상질문을 작성해주세요.
        </Title>
      </TitleWrap>
      <Close onClick={close}><CloseImg src={closeBTN}/></Close>
        {
          getQuestion.length <= 9 
          ?(question.message === "")
              ?<InputWrap>
                  <Input 
                  placeholder='예상질문 작성하기' 
                  onChange={handleInputQuestion} 
                  onKeyDown={onEnterPress} 
                  value={question.message} 
                  type="text"></Input>  
                  <AddBtn onClick={creatQusetion}>추가</AddBtn>                     
              </InputWrap> 
              :<InputWrap>
              <Input 
              placeholder='예상질문 작성하기' 
              onChange={handleInputQuestion} 
              onKeyDown={onEnterPress} 
              value={question.message} 
              type="text"></Input>  
              <AddBtn onClick={creatQusetion}>추가</AddBtn>                     
          </InputWrap> 
          : <InputWrap>
              <StopInput>모든 질문이 작성되었습니다.</StopInput> 
              <NotAddBtn>추가</NotAddBtn>
          </InputWrap> 
          }
        <QuestionWrap>
            {   (getQuestion?.length===0)
                ?<NoneQuestionList>
                    <Emoji>
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="#D1D1FF" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.0001 54.0461C42.3852 54.0461 54.0466 42.3847 54.0466 27.9996C54.0466 13.6145 42.3852 1.95312 28.0001 1.95312C13.615 1.95312 1.95361 13.6145 1.95361 27.9996C1.95361 42.3847 13.615 54.0461 28.0001 54.0461Z" fill="#D1D1FF"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28ZM28 3.90698C14.6938 3.90698 3.90698 14.6938 3.90698 28C3.90698 41.3062 14.6938 52.093 28 52.093C41.3062 52.093 52.093 41.3062 52.093 28C52.093 14.6938 41.3062 3.90698 28 3.90698Z" fill="#D1D1FF"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M37.1161 18.2344C38.195 18.2344 39.0696 19.109 39.0696 20.1879V21.4902C39.0696 22.5691 38.195 23.4437 37.1161 23.4437C36.0372 23.4437 35.1626 22.5691 35.1626 21.4902V20.1879C35.1626 19.109 36.0372 18.2344 37.1161 18.2344Z" fill="#FFFBFF"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.8837 18.2344C19.9625 18.2344 20.8372 19.109 20.8372 20.1879V21.4902C20.8372 22.5691 19.9625 23.4437 18.8837 23.4437C17.8048 23.4437 16.9302 22.5691 16.9302 21.4902V20.1879C16.9302 19.109 17.8048 18.2344 18.8837 18.2344Z" fill="#FFFBFF"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7021 33.0532C21.4481 31.5012 24.1721 29.9551 27.9999 29.9551C31.8277 29.9551 34.5517 31.5012 36.2977 33.0532C37.1625 33.8219 37.7879 34.5908 38.2015 35.1748C38.4091 35.4678 38.5657 35.7176 38.6745 35.9023C38.729 35.9947 38.7717 36.0712 38.803 36.129L38.8415 36.2015L38.8545 36.2267L38.8595 36.2364L38.8616 36.2406L38.8625 36.2425C38.863 36.2434 38.8634 36.2442 37.1517 37.1001L38.8634 36.2442C39.3459 37.2092 38.9548 38.3826 37.9898 38.8651C37.0288 39.3456 35.8612 38.9597 35.375 38.0035L35.3676 37.9898C35.3576 37.9713 35.338 37.9358 35.3085 37.8858C35.2495 37.7856 35.1517 37.6284 35.0133 37.4331C34.7351 37.0403 34.3024 36.5069 33.7021 35.9733C32.5178 34.9206 30.6837 33.8621 27.9999 33.8621C25.316 33.8621 23.4819 34.9206 22.2977 35.9733C21.6974 36.5069 21.2646 37.0403 20.9864 37.4331C20.8481 37.6284 20.7503 37.7856 20.6912 37.8858C20.6618 37.9358 20.6422 37.9713 20.6321 37.9898L20.6248 38.0035C20.1386 38.9597 18.9709 39.3456 18.01 38.8651C17.045 38.3826 16.6539 37.2092 17.1364 36.2442L18.8836 37.1179C17.1364 36.2442 17.1368 36.2434 17.1372 36.2425L17.1382 36.2406L17.1403 36.2364L17.1452 36.2267L17.1582 36.2015L17.1968 36.129C17.2281 36.0712 17.2708 35.9947 17.3252 35.9023C17.434 35.7176 17.5906 35.4678 17.7982 35.1748C18.2119 34.5908 18.8373 33.8219 19.7021 33.0532ZM35.3754 38.0044C35.3755 38.0044 35.3755 38.0044 35.3754 38.0044Z" fill="#FFFBFF"/>
                      </svg>
                    </Emoji>

                    <NoneQuestion >
                        작성하신 예상질문이 없습니다.
                    </NoneQuestion>
                </NoneQuestionList>
                :getQuestion.map((e,i)=>{
                    return(
                        <QuestionList >
                            <DeleteBtn src={Delete} key={i} onClick={()=>{
                                dispatch(questionActions.deleteQuestionDB(e.id))
                            }}/>
                            <Question>Q{i+1}. {e.question}</Question>
                        </QuestionList>
                    )
                })
            }
        
        </QuestionWrap>    
    </Wrap>
    </>
  )
    
}
const Background = styled.div`
    width: 109.3vw;
    max-width: 2098px;
    min-width: 1787px;
    height: 500vh;
    position :fixed;
    top:0px;
    left:0px;
    background: rgba(0,0,0,0.7);
    z-index : 9999;
`;

const Wrap = styled.div`
    width :549px;
    height : 682px;
    background : #fff;
    border : 1px solid #DEE3E8;
    padding : 40px;
    border-radius : 20px;
    position : fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 99999;
`;

const TitleWrap = styled.div`
    width : 470px;
    display :flex;
    margin-bottom : 35px;
`;

const Close = styled.div`
    width : 50px;
    height : 50px;
    border-radius :50px;
    background :#b2b2b2;
    display :flex;
    align-items:center;
    justify-content:center;
    position :absolute;
    top : 0px;
    right :-65px;
`;

const CloseImg = styled.img`
    width : 18px;
    cursor: pointer;
`;

const Title = styled.div`
    font-size:22px;
    font-weight : 600;
    font-family: "PretendardBold";
`;

const InputWrap = styled.div`
    display : flex;
    margin-bottom : 33px;
`;

const Input = styled("input").attrs({ maxLength: "25" })`
    width : 354px;
    height : 60px;
    border-radius : 10px;
    border : 1px solid #DEE3E8;
    font-size : 16px;
    color : #2B303B;
    padding : 20px;
    font-family: "PretendardRegular";
    &:focus{
      outline : 1px solid #6B63F6;
    }
    &::placeholder { 
      font-size: 16px;
      color : #959595;
    }
`;

const AddBtn = styled.button`
    width : 100px;
    height : 60px;
    border-radius : 10px;
    background :#6B63F6;
    border : none;
    color : white;
    font-size : 18px;
    font-weight :500;
    font-family: "PretendardBold";
    margin-left :15px;
    &:hover{
      background :#8983FF;
    }
`;

const NotAddBtn = styled.button`
    background-color : #D1D1D1;
    height : 60px;
    width : 100px;
    border:none;
    border-radius : 10px;
    font-size : 18px;
    font-family: "PretendardSemiBold";
    margin-left : 15px;
    color : #FFFFFF;
`
const QuestionWrap = styled.div`
    width :100%;
`
const NoneQuestionList = styled.div`
    width :100%;
    padding-top : 150px;
`
const Emoji = styled.div`
    margin : 0 auto;
    display :block;
    width :56px;
    margin-bottom : 25px;
`
const NoneQuestion = styled.div`
    width : 216px;
    font-size : 18px;
    color:#2B303B;
    font-family: "PretendardMedium";
    margin : 0 auto;
`
const QuestionList = styled.div`
    display : flex;
    height : 26px;
    margin-bottom : 20px;
`
const Question = styled.p`
    margin-left : 10px;
    vertical-align: top;
    font-family: "PretendardMedium";

`
const DeleteBtn = styled.img`
    background : transparent;
    border : none;
    font-size:26px;
    font-family: "PretendardRegular";
    &:hover{
        cursor : pointer;
    }
`
const StopInput = styled.div`
    background-color : #EBEBEB;
    height : 60px;
    width : 354px;
    color:#2B303B;    
    padding:20px;
    border:none;
    border-radius : 10px;
    &::placeholder{
        font-size : 16px;
        font-family: "PretendardRegular";
    } 

`

export default BanUserModal