import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import {actionCreators as studyListAction} from "../../redux/modules/studyList"
import Videocam from "../../assets/videocam.svg"
import Warning from "../../assets/warning.svg"
import Emoge from "../../assets/emoge.svg"
import Room from './Room';
import Checked from '../../assets/Checked.svg';
import BeforeCheck from '../../assets/beforeCheck.svg';
import Undo from "../../assets/undo.svg"

const StudyRoomList = (props) => {
    
    const dispatch = useDispatch(); 
    const sesstionStoragetokenCheck = sessionStorage.getItem('Authorization');
    const room_list = useSelector((state)=>state.studyList.room_list)
    const totalPageAll = room_list.totalPages;
    const tag_list = useSelector((state)=>state.studyList.tag_list)
    const totalPageTag = tag_list.totalPages;
    const search_list = useSelector((state)=>state.studyList.search_list)
    const study_list = useSelector((state)=>state.studyList.study_list)
    const totalPageStudy = study_list.totalPages;

    const totalPageSearch = search_list.totalPages;
    const tag1 = useSelector((state)=>state.studyList.tag1)
    const tag2 = useSelector((state)=>state.studyList.tag2)
    const tag3 = useSelector((state)=>state.studyList.tag3)
    const keyword = useSelector((state)=>state.studyList.keyword)
    const [recruit, setRecurit] = useState("null")
    const [check, setCheck] = useState(false)
    const checkHandle = () => {
        setCheck(!check)        
    }
    const checkListHandle = () => {
        if(recruit==="null"){
            setRecurit('recruiting')
        }else if(recruit==="recruiting"){
            setRecurit('null')
        }

    }
    React.useEffect(() => {
        dispatch(studyListAction.getStudyListDB(1,recruit,tag1,tag2,tag3,keyword));
    },[recruit,tag1,tag2,tag3,keyword]);

    const [page, setPage] = useState(1);

    const pageNumbersAll = [];
    for (let i = 1; i <= totalPageAll; i++) {
        pageNumbersAll.push(i);
    }

    const pageNumbersTag = [];
    for (let i = 1; i <= totalPageTag; i++) {
        pageNumbersTag.push(i);
    }

    const pageNumbersSearch = [];
    for (let i = 1; i <= totalPageSearch; i++) {
        pageNumbersSearch.push(i);
    }
    const pageNumbersStudy = [];
    for (let i = 1; i <= totalPageStudy; i++) {
        pageNumbersStudy.push(i);
    }
        return (
        <RoomListWrap>
            <TopWrap>
                {
                    check === false
                    ?<CheckWrap>
                    <Checkbox src={BeforeCheck} onClick={()=>{
                        checkHandle();
                        checkListHandle();
                    }}/>
                    <BeforeCheckText>모집중인 방만 보기</BeforeCheckText>
                    </CheckWrap>
                    :<CheckWrap>
                    <Checkbox src={Checked} onClick={()=>{
                        checkHandle();
                        checkListHandle();
                    }}/>
                    <CheckedText>모집중인 방만 보기</CheckedText>
                    </CheckWrap>
                }
                <BtnWrap>
                <ReloadBtn 
                    type='reset'
                        onClick={() => {
                            dispatch(studyListAction.getStudyListDB(1,recruit,tag1,tag2,tag3,keyword));
                        }}
                    >
                <UndoIcon src={Undo}></UndoIcon>
                <p>새로고침</p>
                </ReloadBtn>

                <AddRoomBtn onClick={()=>{
                    if(sesstionStoragetokenCheck){
                       history.push("/creatroom")  
                    }else{
                        history.push('/login')
                        alert("로그인 후 방생성이 가능합니다.")
                    }
                     
                }}>
                    <Svg src={Videocam}/>
                    <BtnText>스터디룸 개설하기</BtnText>
                </AddRoomBtn>
                </BtnWrap>
            </TopWrap>
                {
                    (room_list.content?.length === 0)
                    ? <IssuePageWrap>
                        <IssueIcon src={Emoge}/>
                        <IssueMsg>
                            진행중인 스터디가 <span style={{color:"#6B63F6"}}>없습니다.</span>
                        </IssueMsg>
                        <GuideIssue>
                            첫번째 방장이 되어주세요.
                        </GuideIssue>
                      </IssuePageWrap> 
                    : keyword?.length === 0
                        ? <ContentWrap>
                            {
                            room_list.content?.map((e,i)=>{
                                if(sesstionStoragetokenCheck){
                                    if( e.studying === false ){
                                        return(
                                            <StudyRoom onClick={()=>{history.push(`/videoCheck/${e.roomId}`)}}>
                                            <Room key={i} e={e}/>
                                            </StudyRoom>
                                        )
                                    }else {
                                        return(
                                            <StudyRoom onClick={()=>{alert("모집이 마감 되었습니다")}}>
                                                <Room key={i} e={e}/>
                                            </StudyRoom>
                                        )
                                    }
                                }else{
                                        return(
                                            <StudyRoom onClick={()=>{
                                                history.push('/login')
                                                alert("로그인 후 입장 가능합니다.")
                                            }}>
                                            <Room key={i} e={e}/>
                                            
                                            </StudyRoom>
                                        )
                                }})
                            } 
                            <PageNumberWrap>
                                <Nav>
                                    <PrevButton onClick={() => {setPage(page - 1); dispatch(studyListAction.getRoomAllDB(page - 1))}} disabled={page === 1}>
                                    &lt;
                                    </PrevButton>
                                    {pageNumbersAll                    
                                    .map((e, i) => (
                                        <Button
                                        key={i + 1}
                                        onClick={() => {setPage(i + 1); dispatch(studyListAction.getRoomAllDB(e))}}
                                        aria-current={page === i + 1 ? "page" : null}
                                        >
                                        {i + 1}
                                        </Button>
                                    ))}
                                    <NextButton onClick={() => {setPage(page + 1); dispatch(studyListAction.getRoomAllDB(page + 1))}} disabled={page === pageNumbersAll.length}>
                                    &gt;
                                    </NextButton>
                                </Nav>
                            </PageNumberWrap>
                        </ContentWrap>    
                        : study_list.content.length === 0
                            ?<IssuePageWrap>
                                <IssueIcon src={Warning}/>
                                <IssueMsg>
                                    해당하는 스터디룸이 <span style={{color:"#6B63F6"}}>존재하지 않습니다!</span>
                                </IssueMsg>
                                <GuideIssue>
                                    다른 스터디룸을 검색해주세요.
                                </GuideIssue>
                            </IssuePageWrap>  
                            :<ContentWrap>
                            {
                                study_list.content?.map((e,i)=>{
                                    if(sesstionStoragetokenCheck){
                                        if( e.studying === false ){
                                            return(
                                                <StudyRoom onClick={()=>{history.push(`/videoCheck/${e.roomId}`)}}>
                                                <Room key={i} e={e}/>
                                                </StudyRoom>
                                            )
                                        }else {
                                            return(
                                                <StudyRoom onClick={()=>{alert("모집이 마감 되었습니다")}}>
                                                    <Room key={i} e={e}/>
                                                </StudyRoom>
                                            )
                                        }
                                    }else{
                                            return(
                                                <StudyRoom onClick={()=>{
                                                    history.push('/login')
                                                    alert("로그인 후 입장 가능합니다.")
                                                }}>
                                                <Room key={i} e={e}/>
                                                   
                                                </StudyRoom>
                                            )
                                    }})
                            } 
                                <PageNumberWrap>
                                    <Nav>
                                        <PrevButton onClick={() => {setPage(page - 1); dispatch(studyListAction.getStudyListDB(page - 1, recruit, tag1, tag2, tag3, keyword))}} disabled={page === 1}>
                                        &lt;
                                        </PrevButton>
                                        {pageNumbersStudy                    
                                        .map((e, i) => (
                                            <Button
                                            key={i + 1}
                                            onClick={() => {setPage(i + 1); dispatch(studyListAction.getStudyListDB(e, recruit, tag1, tag2, tag3, keyword))}}
                                            aria-current={page === i + 1 ? "page" : null}
                                            >
                                            {i + 1}
                                            </Button>
                                        ))}
                                        <NextButton onClick={() => {setPage(page + 1); dispatch(studyListAction.getStudyListDB(page + 1, recruit, tag1, tag2, tag3, keyword))}} disabled={page === pageNumbersStudy.length}>
                                        &gt;
                                        </NextButton>
                                    </Nav>
                                </PageNumberWrap>
                            </ContentWrap>
                }
        </RoomListWrap>
    );
};

const RoomListWrap = styled.div`
    max-width : 927px;
    min-width : 740px;
    width   : 100vw;
    height : 1123px;
    border-radius : 15px;
    justify-content : center;
    align-items:center;
    background-color : white;
    margin-top : 23px;
    padding : 40px;
    box-shadow: 1px 1px 15px 5px rgba(102,96,173,0.14);
    margin-right : 0;
`
const TopWrap = styled.div`
    display : flex;
    justify-content : space-between;
    max-width : 847px;
`

const ContentWrap = styled.div`
    min-width : 610px;
    height: 991px;
    gap : 18px;
    margin-top : 43px;
    overflow : hidden;
`
const IssuePageWrap = styled.div`
    max-width : 927px;
    max-height:400px;
    gap : 18px;
    margin-top : 91px;
    padding: 20vh auto 502px auto ;
    overflow : hidden;
    justify-content : center;
    text-align : center;
    align-item:center;
`
const IssueIcon = styled.img`
    margin-bottom : 30px;
    margin-top : 20vh;
`
const IssueMsg = styled.p`
    font-size : 32px;
    font-family: "PretendardSemiBold";
    color: #272727;
    min-width : 350px;
    margin-bottom : 0px;
    margin-left : auto;
    margin-right : auto;
`
const GuideIssue = styled.p`
    font-size : 24px;
    font-family: "PretendardRegular";
    color : #7A7A7A;
    margin-left : auto;
    margin-right : auto;
`
const StudyRoom = styled.div`
    height : 130px;
    border-radius : 10px;
    display:flex;
    border : 1px soild #DEE3E8;
    background-color: #F9F9FA;
    padding : 30px 40px 40px 40px;
    margin-bottom : 18px;
    cursor: pointer;
`
const BtnWrap = styled.div`
    float: right;
    display:flex;
    gap : 24px;
`
const AddRoomBtn = styled.div`
    min-width : 232px;
    height : 54px;
    border : none;
    gap : 10px;
    display : flex;
    border-radius : 10px;
    background-color : #6B63F6;
    justify-content : space-between;
    color : #000000;
    padding-left : 30px;
    padding-right : 30px;
    padding-top: 2px;
    float: right;
    &:hover{
        background-color : #8983FF;
    }
`
const BtnText = styled.p`
    font-size : 18px;
    font-family: "PretendardBold";
    color : #FFFFFF;
    margin-top : 11px;;
    margin-bottom : 16px;
    cursor: pointer;
`
const CheckWrap = styled.div`
    display : flex;
`
const Checkbox = styled.img`
    width : 24px;
    height : 24px;
    margin-top : 16px;
    margin-bottom : 16px;
    margin-right : 3px;

`

const BeforeCheckText = styled.p`
    font-family: "PretendardMedium";
    font-size : 18px;
    color : #2B303B;
    margin-bottom : 0;
    justify-content : center;
    align-items : center;
    margin-top : 13.5px;
    margin-left : 10px;

`
const CheckedText = styled.p`
    font-family: "PretendardMedium";
    font-size : 18px;
    color : #6B63F6;
    margin-bottom : 0;
    justify-content : center;
    align-items : center;
    margin-top : 13.5px;
    margin-left : 10px;
`
const ReloadBtn = styled.button`
    max-width : 124px;
    min-width : 121px;
    width : 120vw;
    height : 54px;
    display : flex;
    padding : 15px 15px 22px 18px;
    gap : 7px;
    background-color : #FFFFFF;
    color : #898989;
    border: 1px solid #C6C6C6;    
    border-radius : 10px;
    font-size : 16px;
    font-family: "PretendardRegular";
    &:hover{
        background-color : #FBFBFB;
        border: 1px solid #C6C6C6;
    }
`
const UndoIcon = styled.img`
    margin-top : 2px; 
`

const Svg = styled.img`
    width : 27px;
    height : 17px;
    margin-top : 16px;
    margin-bottom : 16px;
    margin-right : 3px;
`

const PageNumberWrap = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    text-align: center;
    z-index :9999;
    padding-left:auto;
    padding-right:auto;
    max-width:807px;
`
const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`;

const Button = styled.button`
    border: none;
    border-radius: 8px;
    margin: 0;
    background: #FFFFFF;
    color: #011F3B;
    font-size: 1rem;
    height : 32px;
    justify-content:center;
    align-items:center;
    text-align : center;
    font-family: "PretendardMedium";
    &:hover {
        background-color: #EBEBFF;
        border: 1px solid #6B63F6;
        cursor: pointer;
    }
    &[disabled] {
        background: transprent;
        color : transparent;
        cursor: revert;
        transform: revert;
    }
    &[aria-current] {
        background: transprent;
        border: 1px solid #6B63F6;
        font-weight: bold;
        color: #6B63F6;
        cursor: revert;
        transform: revert;
    }
`;
const PrevButton = styled.button`
        border: none;
        border-radius: 8px;
        margin: 0;
        width : 32px;
        height : 32px;
        background: #6B63F6;
        color: #FFFFFF;
        font-size: 1rem;
        font-family: "PretendardMedium";
        &:hover {
            border: 1px solid #6B63F6;
            background-color : #8983FF;
            cursor: pointer;
        }
        &[aria-current] {
            background: transprent;
            border: 1px solid #6B63F6;
            font-weight: bold;
            cursor: revert;
            transform: revert;
        }
`;
const NextButton = styled.button`
        border: none;
        border-radius: 8px;
        margin: 0;
        width : 32px;
        height : 32px;
        background: #6B63F6;
        color: #FFFFFF;
        font-size: 1rem;
        font-family: "PretendardMedium";
        &:hover {
            background-color : #8983FF;
            border: 1px solid #6B63F6;
            cursor: pointer;
        }
        &[aria-current] {
            background: transprent;
            border: 1px solid #6B63F6;
            font-weight: bold;
            color: #6B63F6;
            cursor: revert;
            transform: revert;
        }
`;


export default StudyRoomList;