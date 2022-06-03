import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as studyListAction} from "../../redux/modules/studyList"
import Undo from "../../assets/undo.svg"
import SearchEnter from "../../assets/searchEnter.svg"


const StudyClassify = (props) => {
    
    const dispatch = useDispatch();
    const recruit = useSelector((state)=>state.studyList.recruit)

    const [companyType, setCompanyType] = useState([
        "공기업",
        "사기업",
        "공무원",
        "외국계",
        "금융권",
        "기타",
    ]);
    const [career, setCareer] = useState([
        "신입",
        "경력",
    ]);
    const [interviewType, setInterviewType] = useState([
        "일대일 면접",
        "일대다 면접",
        "그룹 면접",
        "PT",
        "1분 자기소개",
    ]);
    const [selectCompany, setSelectCompany] = useState("null");
    const [selectCareer, setSelectCareer] = useState("null");
    const [selectInterview, setSelectInterview] = useState("null");

    const CompanyHandle = (e) => {
        if(e === selectCompany){
            setSelectCompany("null")   
        } else {
            setSelectCompany(e)
        }
    }
    const CareerHandle = (e) => {
        if(e === selectCareer){
            setSelectCareer("null")  
        } else {
            setSelectCareer(e)
        } 
    }
    const InterviewHandle = (e) => {
        if(e === selectInterview){
            setSelectInterview("null")
        }else {
            setSelectInterview(e)
        }   
    }
    const resethandle = () =>{
        dispatch(studyListAction.clearTagList()); 
        dispatch(studyListAction.clearSearchList());
        setSelectInterview("null")
        setSelectCareer("null")
        setSelectCompany("null")
    }

    //서치부분
    const [search,setSearch] = React.useState({message: ""});

    const handleInputSearch = (e) =>{
        if(e.target.value.indexOf(' ')===0){
            setSearch({...search, message : ""})
        }else{
            setSearch({...search, message : e.target.value});
            
        }
        
    }
    if(search.message?.length > 30){
        alert('검색 가능한 글자수는 총 30글자 입니다.')
    }

    const SearchHandle = (e) => {
        dispatch(studyListAction.getStudyListDB(1, recruit, selectCareer, selectCompany, selectInterview ,search.message))
    };


    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false && search.message !== "") {
          return SearchHandle();
        }
    };
    //서치부분

    return (
        <StudyClassifyWrap>

        {/* 서치있쥬? */}
        <SearchInputWarp >
            <SearchInput 
                placeholder='키워드로 검색하기' 
                onChange={handleInputSearch} 
                onKeyDown={onEnterPress} 
                value={search.message} 
                type="text"></SearchInput>                 
            <Svg src={SearchEnter} onClick={SearchHandle}></Svg>
        </SearchInputWarp>


            <TypeWrap>

                <CompanyWrap>
                    <TextType>기업분류</TextType>
                    {
                        companyType.map((company, idx)=>{
                            return(
                                <InputWrap>
                                <ComTag 
                                type="radio"
                                id={company + idx}
                                name="company"
                                selectCompany={selectCompany}
                                onClick={() => CompanyHandle(company)}/>
                                <Label for={company + idx}>{company}</Label>
                                </InputWrap>
                                
                            )
                        })
                    }
                </CompanyWrap>
                <DivisionLine></DivisionLine>
                <CareerWrap>
                    <TextType>신입/경력</TextType>
                    {
                        career.map((career, idx)=>{
                            return(
                                <InputWrap>
                                <ComTag 
                                type="radio"
                                id={career + idx}
                                name="career"
                                selectCareer={selectCareer}
                                onClick={() => CareerHandle(career)}/>
                                <Label for={career + idx}>{career}</Label>
                                </InputWrap>
                            )
                        })
                    }
                    
                </CareerWrap>
                <DivisionLine></DivisionLine>
                <InterviewWrap>
                    <TextType>면접 유형</TextType>
                    {
                        interviewType.map((interview, idx)=>{
                            return(
                                <InputWrap>
                                <ComTag 
                                type="radio"
                                id={interview + idx}
                                name="interview"
                                selectInterview={selectInterview}
                                onClick={() => InterviewHandle(interview)}
                                />
                                {selectInterview===null
                                    ?<Label for={undefined}/>
                                    :<Label for={interview + idx}>{interview}</Label>            
                                }
                                </InputWrap>
                            )
                        })
                    }
                </InterviewWrap>
            </TypeWrap>
            <BtnWrap>
            <ReloadBtn 
            type='reset'
                onClick={() => {
                    window.location.reload();
                    //resethandle()
                }}
            >
                <UndoIcon src={Undo}></UndoIcon>
                <p>초기화</p>
            </ReloadBtn>
            <SendCategoryBtn 
                onClick={() => {
                    dispatch(studyListAction.getStudyListDB(1, recruit, selectCareer, selectCompany, selectInterview ,(search.message ? search.message : "null" )))
                 }}
            >
                적용하기
            </SendCategoryBtn>
         </BtnWrap>
        </StudyClassifyWrap>
        
    );
};

const StudyClassifyWrap = styled.div`
    max-width : 541px;
    min-width : 420px;
    height : 816px;
    border-radius : 15px;
    margin-top : 23px;
    justify-content : center;
    align-items : center;
    background-color : #FFFFFF;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
    padding-left : 40px;
    padding-right : 40px;
`


//서치가지고오기

const SearchInputWarp = styled.div`    
    height : 54px;
    display:flex;
    justify-content: space-between;    
    background-color : #F5F5FB;
    border:none;
    color : #C2C2C2;
    border-radius : 10px;
    padding-right:18px;
    padding-left:18px;
    margin-top:36px;
`
const SearchInput = styled("input").attrs({ maxLength: "30"})`
    width : 420px;
    height : 54px;
    border-radius : 10px;
    border:none;
    background-color : #F5F5FB;
    &::placeholder{
        color : #BCBCBC;
    }
    font-family: "PretendardMedium";
    &:focus{
        outline: none;
        caret-color:#6B63F6;
        size : 100px;
    }   
`

const Svg = styled.img`
    width : 24px;
    height : 24px;
    margin-top: 15px;
    &:hover{
        cursor : pointer;
    } 
`
//서치가지고오기
const TypeWrap = styled.div`
    margin-top: 51px;
    gap:60px;
`
const CompanyWrap = styled.div`
    margin-top: 38px;
    margin-bottom: 50px;    
    min-width : 340px;
    height : 117px;
`
const CareerWrap = styled.div`
    margin-bottom: 50px;
    min-width : 340px;
    height : 73px;
`

const InterviewWrap = styled.div`
    margin-bottom: 50px;
    min-width : 340px;
    height : 117px;
`
const TextType = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #2B303B;
`
const Label = styled.label `
  font-size: 14px;
  font-family: "PretendardRegular";
  width: 100%;
  height: 35px;
  background-color : #FFFFFF;
  border-radius: 10px;
  padding: 13px 25px;
  border: 1.5px solid #CCD1C7;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #666C78;
  &:hover{
    border: 1.5px solid #6B63F6;
    color: #6B63F6;
  }
`;

const InputWrap = styled.label `
    float:left;
    margin-right : 9px;
    margin-bottom : 10px;
    min-width : 66px;
    height : 37px;
    &:last-child {
    margin-right : 0px;
    font-size : 14px;
    }
`;
const ComTag = styled.input.attrs({type: 'radio'})`
    &:checked {
    display: block;
    background: none;
    padding: 13px 25px;
    text-align: center;
    line-height: 33px;
    font-family: "PretendardRegular";
    display: none;
    }
    &:checked + ${Label} {    
     ${(props) => props.selectCompany === "null" ? `background:#FFFFFF` : props.selectCareer === "null" ? `background:#FFFFFF` : props.selectInterview === "null" ? `background:#FFFFFF` : `background : #6B63F6`  };
     ${(props) => props.selectCompany === "null" ? `color:#666C78` : props.selectCareer === "null" ? `color:#666C78` : props.selectInterview === "null" ? `color:#666C78` : `color : #FFFFFF`  };
    }
    min-width : 70px;
    height : 35px;
    margin-right : 6px;
    margin-bottom : 6px;
    display: none;
`;
const DivisionLine = styled.hr`
    width : 100%;
    color : #E9ECEF;
`
const BtnWrap = styled.div`
    display : flex;
    gap : 12px;
    max-width : 541px;
    min-width : 340px;
`

const ReloadBtn = styled.button`
    max-width : 124px;
    min-width : 121px;
    width : 30vw;
    height : 60px;
    display : flex;
    padding : 20px 26px 22px 26px;
    gap : 7px;
    background-color : #EEEEEE;
    color : #898989;
    margin-top : 60px;
    border : none;
    border-radius : 10px;
    font-size : 16px;
    font-family: "PretendardRegular";
    &:hover{
        background-color : #DBDBDB;
}`

const UndoIcon = styled.img`
    margin-top : 2px; 
`

const SendCategoryBtn = styled.button`
    max-width : 325px;
    width : 70vw;
    height : 60px;
    background-color : #6B63F6;
    color : #ffffff;
    margin-top : 60px;
    border : none;
    border-radius : 10px;
    font-size : 18px;
    font-family: "PretendardBold";
    &:hover{
        background-color : #8983FF;
    }
    `

export default StudyClassify;