import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { actionCreators as questionActions } from "../../redux/modules/question";
import Delete from "../../assets/Delete.svg"

const ExpectQuestions = (props) => {
    const dispatch = useDispatch();
    const QuestionRef = React.useRef();
    const getQuestion = useSelector((state)=>state.question.question_list)
    const [question,setQuestion] = React.useState({message: ""});
    const [questionList, setQuestionList] = React.useState([getQuestion.question]);
    const handleInputQuestion = (e) =>{
        if(e.target.value.indexOf(' ')===0){
            setQuestion({...question,
                message : ""})
        }else{
            setQuestion({...question,
                message : e.target.value});
        }
        
    }

    if(question.message?.length > 25){
        alert("예상질문은 최대 25자까지만 작성 가능합니다.")
    }
    
    const add = (e) => {
        setQuestionList([...questionList, question.message])
        dispatch(questionActions.addQuestionDB(question.message))
        setQuestion({...question,
            message : ''});
    };

    const nonAdd = () => {
        alert('질문을 입력해 주세요')
    }
    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false && question.message !== "") {
          return add();
        }
      };

    return (
        <ContainerWrap>
            <TitleText>연습하고 싶은 예상질문</TitleText>
                    {
                    getQuestion.length <= 9 
                    ?(question.message === "")
                        ?<InputWrap>
                            <QInput 
                            placeholder='예상질문 작성하기' 
                            onChange={handleInputQuestion} 
                            onKeyDown={onEnterPress} 
                            value={question.message} 
                            type="text"></QInput>                            
                            <AddBtn onClick={nonAdd}>추가</AddBtn>                        
                        </InputWrap> 
                        :<InputWrap>
                        <QInput 
                        placeholder='예상질문 작성하기' 
                        onChange={handleInputQuestion} 
                        onKeyDown={onEnterPress} 
                        value={question.message} 
                        type="text"></QInput>                       
                        <AddBtn onClick={add}>추가</AddBtn>                        
                    </InputWrap> 
                    : <InputWrap>
                        <StopInput>모든 질문이 작성되었습니다.</StopInput> 
                        <NonActBtn>추가</NonActBtn>
                    </InputWrap> 
                    }
                    
                
                <QuestionWrap>
                    {   (getQuestion?.length===0)
                        ?<QuestionList >
                            작성된 예상질문이 없습니다.
                        </QuestionList>
                        :getQuestion.map((e,i)=>{
                            return(
                                <QuestionList >
                                    <DeleteBtn src={Delete} key={i} onClick={()=>{
                                        dispatch(questionActions.deleteQuestionDB(e.id))
                                    }}/>
                                    <Question>Q{i+1}. {e.question}</Question>
                                    <div ref={QuestionRef} />
                                </QuestionList>
                            )
                        })
                    }
                
                </QuestionWrap>    
        </ContainerWrap>
    );
};

const ContainerWrap = styled.div`
    max-width : 550px;
    min-width : 390px;
    max-height : 496px;
    min-height : 300px;
    width:36vw;
    overflow : hidden;
    border-radius : 15px;
    background-color : white;
    margin-top : 40px;
    padding :40px;
    box-shadow: 1px 1px 15px 5px rgba(102,96,173,0.14);
`
const TitleText = styled.p`
    font-size : 22px;
    font-family: "PretendardBold";
    margin-bottom : 0;
`
const InputWrap = styled.div`
    display: flex;
    margin-bottom : 40px;
    height : 52px;
    margin-top : 40px;
`

const QInput = styled("input").attrs({ maxLength: "25" })`
    background-color : #EBEBEB;
    height : 60px;
    width : 354px;
    font-family: "PretendardRegular";
    padding:16px;
    border:none;
    border-radius : 10px;
    &::placeholder{
        font-size : 16px;
        font-family: "PretendardRegular";
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

const AddBtn = styled.button`
    background-color : #6B63F6;
    height : 60px;
    width : 100px;
    border:none;
    border-radius : 10px;
    font-size : 18px;
    font-family: "PretendardSemiBold";
    margin-left : 15px;
    color : #FFFFFF;
    &:hover{
        background-color : #8983FF;
        }
`
const NonActBtn = styled.button`
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
    max-height : 230px;
    min-height : 120px;
    overflow : scroll;
    overflow-x : hidden;
    &::-webkit-scrollbar {
        opacity : 100%;
    }
    &:hover{
    &::-webkit-scrollbar {
        width: 6px;
        opacity : 0%;
    }
    &::-webkit-scrollbar-thumb {
        height: 10%;
        background: gray;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transition;
  }
}
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

export default ExpectQuestions;