import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled, {keyframes}from 'styled-components'
import {actionCreators as studyListActions} from "../redux/modules/studyList";
import { actionCreators as userActions } from "../redux/modules/user";
import Gnb from '../components/Gnb.jsx';

import { actionCreators as profileActions } from "../redux/modules/profile";

function CreatRoom() {

    React.useEffect(()=>{
        dispatch(studyListActions.getRoomAllDB());
        dispatch(profileActions.getProfileDB());
  },[]);

    const sessionStoragetokenCheck = sessionStorage.getItem('Authorization');
    const profileList = useSelector((state)=>state.profile.list)
    const dispatch = useDispatch();
    const history = useHistory();
    const [RoomTitle, setRoomTitle] = useState();
    const [NumPeople, setNumPeople] = useState();

    const StudyTitle = (e) => {
        if(e.target.value.indexOf(' ')===0){
            setRoomTitle(" ")
        }else{
            setRoomTitle(e.target.value)            
        }
    }

    if(RoomTitle?.length > 30){
        alert("제목은 최대 30자까지만 작성 가능합니다.")
    }

    const onChangePeople = (e) => {
        setNumPeople(e.currentTarget.value)
    }

    const Options = [
        {
            key: 1,
            value: "인원수를 선택해주세요."
        }, 
         {
            key: 2,
            value: "2명"
        }, {
            key: 3,
            value: "3명"
        }, {
            key: 4,
            value: "4명"
        }, {
            key: 5,
            value: "5명"
        }
    ]

    const [Ability, setAbility] = useState();
    const [Company, setCompany] = useState();
    const [Type, setType] = useState();

    const AbilityList = ["신입", "경력"]
    const CompanyList = [
        "공기업",
        "사기업",
        "공무원",
        "외국계",
        "금융권",
        "기타"
    ]
    const TypeList = ["일대일 면접", "일대다 면접", "그룹 면접", "PT", "1분 자기소개"]

    const [errTitle,setErrTitle] = useState(true);
    const [errNumPeople,setErrNumPeople] = useState(true);
    const [click,setClick] = useState(false);

    const CreatRoom = () => {
        
        setClick(true)

        if (RoomTitle === "" || RoomTitle === undefined) {
            alert("제목을 입력해 주세요.")
            setClick(false)
            setErrTitle(false)
        }else if (NumPeople === undefined || NumPeople === 1) {
            alert("인원수를 선택해 주세요.")
            setClick(false)
            setErrNumPeople(false)
        }else if (Company === undefined) {
            alert("기업을 선택해 주세요.")
            setClick(false)
        }else if (Ability === undefined) {
            alert("경력사항을 선택해 주세요.")
            setClick(false)
        }else if (Type === undefined) {
            alert("유형을 선택해 주세요.")
            setClick(false)
        }else if (RoomTitle===" "){
            alert("제목은 공백으로 시작할 수 없습니다.")
            setClick(false)
        }else{
            if(click===true){
                const target = document.getElementById('enter');
                target.disabled = true;
            }

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    dispatch(studyListActions.createRoomDB(RoomTitle, NumPeople, Ability, Company, Type,"roomId"))
                })
                .catch(function (err0r) {
                    alert("카메라 사용이 가능한 상태에서 방 생성이 가능합니다.");
                    setClick(false)
                });
            }
        }
    }

 
    
    const handleLogout = () => {
        dispatch(userActions.logout());
        history.push("/")
    };

    return (
        <React.Fragment style={{
                wisth: "100%",
                height:"100%",
            }}>
            <div style={{
                    display: "flex"
                }}>
                <Gnb/> 
                <MainWrap>
                <LoginWrap>
                    {!sessionStoragetokenCheck 
                            ? <KakaoLoginBtn onClick={()=>{
                                history.push("/login")
                            }}>로그인
                            </KakaoLoginBtn>
                            : 
                            <ProfileWrap>
                                <MypageWrap onClick={()=>{history.push("/mypage/review")}}>
                                    <ProfileImg src={profileList.profileImg} />
                                    <UserName>
                                        {profileList.nickname}
                                    </UserName>
                                </MypageWrap>
                                <KakaoLogOutBtn onClick={handleLogout}>로그아웃</KakaoLogOutBtn>
                            </ProfileWrap>
                        }
                </LoginWrap>
                <MainTitle>면접 스터디원을 가장 빠르게 구하고, 화상스터디로 함께 성장하세요!</MainTitle>
             <ContentWrap>
                    <ContentLeft>
                        <ArrowBTN onClick={()=>history.push('/studylist')}>←</ArrowBTN>
                        <LeftText>
                            스터디룸 개설하고<br/>
                            면접 스터디 지금 바로 <br/>
                            시작해볼까요?
                        </LeftText>
                    </ContentLeft>
                    <ContentRigth>
                        <ContentRigthInside>
                            <Title>
                                <TitleName>스터디룸 제목</TitleName>
                                {errTitle===false ? 
                                    <TitleInputErr type="text" placeholder='제목을 입력하세요.' onChange={StudyTitle}></TitleInputErr>
                                : <TitleInput type="text" placeholder='제목을 입력하세요.' onChange={StudyTitle}></TitleInput>}
                            </Title>

                            <Title>
                                <TitleName>인원</TitleName>
                                {errNumPeople === false ?
                                <SelectboxErr onChange={onChangePeople} value={NumPeople}>
                                <options selected>인원수를 선택해주세요.</options>
                               {
                                   Options.map(
                                       (item, index) => (<option key={item.key} value={item.key}>{item.value}</option>)
                                   )
                               }
                           </SelectboxErr>

                                :<Selectbox onChange={onChangePeople} value={NumPeople}>
                                     <options selected>인원수를 선택해주세요.</options>
                                    {
                                        Options.map(
                                            (item, index) => (<option key={item.key} value={item.key}>{item.value}</option>)
                                        )
                                    }
                                </Selectbox>}
                            </Title>
                                    <Hr/>

                                    <Title>
                                <TitleName>기업 분류</TitleName>
                                <MapWrap>
                                {
                                    CompanyList.map((a, i) => {
                                        return (
                                            <InputWrap>
                                                <FormCheckLeft
                                                    type="radio"
                                                    id={a + i}
                                                    name="company"
                                                    onClick={() => setCompany(a)}/>
                                                <Label for={a + i}>{a}</Label>
                                            </InputWrap>
                                        )
                                    })
                                }
                                </MapWrap>
                            </Title>

                            <Title>
                                <TitleName>신입/경력</TitleName>
                                <MapWrap>
                                {
                                    AbilityList.map((a, i) => {
                                        return (
                                            <InputWrap>
                                                <FormCheckLeft
                                                    type="radio"
                                                    id={a + i}
                                                    name="ability"
                                                    onClick={() => setAbility(a)}/>
                                                <Label for={a + i}>{a}</Label>
                                            </InputWrap>
                                        )
                                    })
                                }
                                </MapWrap>
                            </Title>

                            <Title>
                                <TitleName>면접 유형</TitleName>
                                <MapWrap>
                                {
                                    TypeList.map((a, i) => {
                                        return (
                                            <InputWrap>
                                                <FormCheckLeft
                                                    type="radio"
                                                    id={a + i}
                                                    name="type"
                                                    onClick={() => setType(a)}/>
                                                <Label for={a + i}>{a}</Label>
                                            </InputWrap>
                                        )
                                    })
                                }
                                </MapWrap>
                            </Title>

                            <ButtomWrap>
                                {
                                click===true?
                                   <WaitRoomButton id="enter">
                                   <Loader class="loader">Loading...</Loader>
                                    <spasn>잠시만 기다려 주세요...</spasn>
                                    </WaitRoomButton>
                                :<RoomButton onClick={CreatRoom}>개설하기</RoomButton>
                                }
                            </ButtomWrap>
                        </ContentRigthInside>
                    </ContentRigth>
                </ContentWrap>
                </MainWrap>
            </div>
        </React.Fragment>
    )
}
const MainWrap = styled.div `
    min-width : 60%;
    max-width : 80%;
    width : 80%;
    height : 100vh;
    position : relative;
    left : 272px;
`;

const MainTitle = styled.div `
    font-size : 1.7vw;
    font-family: "PretendardBold";
    width : 100%;
    margin-left: 4vw;
    margin-top : 11.3vh;
`;
const LoginWrap = styled.div`
    position : relative;
    right : -2.7vw;
`
const MypageWrap = styled.div`
    height :51px;
    display:flex;
    align-items :center;
    justify-content:center;
    cursor: pointer;
`
const KakaoLoginBtn = styled.button`
    width : 9.35vw;
    height : 5vh;
    background-color : #6B63F6;
    float : right;
    border:none;
    border-radius : 10px;
    font-family: "PretendardBold";
    font-size : 0.83vw;
    margin-top: 60px;
    color:#FFFFFF;
    &:hover{
        background-color : #8983FF;
    }
`;
const ProfileWrap = styled.div`
    display : flex;
    float : right;
    margin : 60px 0px 60px 0;
    gap : 15px;
`
const ProfileImg = styled.div`
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
    margin-right :14px;
`
const UserName = styled.p`
    font-size : 20px;
    font-family: "PretendardSemiBold";
    margin-top : 15px;
`
const KakaoLogOutBtn = styled.button`
    width : 9.35vw;
    height : 5vh;
    background-color : #AAAAAA;
    float : right;
    border:none;
    border-radius : 10px;
    font-size : 0.83vw;
    font-family: "PretendardBold";
    margin-left: 25px;
    color:#FFFFFF;
    &:hover{
        background-color : #BEBEBE;        
    }
`

const ContentWrap = styled.div `
  width : 97%;
  overflow-x:hidden; 
  overflow-y:auto; 
  border-radius : 30px;
  float:left;
  display:flex;
  margin : 2vh 6vw 6vh 4vw;
  box-shadow: 1px 1px 15px 5px rgba(0,0,0,0.1);
`;

const ArrowBTN = styled.button `
    position : absolute;
    font-size : 50px;
    font-family: "PretendardLight";
    border : none;
    background : none;
    color : white;
    top : 4.8vh;
    left : 3vw;
`;

const ContentLeft = styled.div `
  position:relative;
  width : 50%;
  background : #6B63F6;
  justify-content :left;
  align-items : center;
  display:flex;
  border-top-left-radius : 30px;
  border-bottom-left-radius : 30px;
`;

const LeftText = styled.div `
  font-size : 1.67vw;
  color : white;
  padding-left : 3.2vw;
  font-family: "PretendardBold";
`;

const ContentRigth = styled.div `
  width : 50%;
  background : #fff;
  padding-top : 5.5vh;
  padding-bottom : 5.5vh;
  border-top-right-radius : 30px;
  border-bottom-right-radius : 30px;
`;
  
const ContentRigthInside = styled.div `
  margin : 0 auto;
  background : #fff;
  padding : 0px 3.2vw 0 3.2vw;
  border-top-right-radius : 30px;
  border-bottom-right-radius : 30px;
  justify-content :center;
  align-items : center;
  margin: 0 auto;
`;
  
const Title = styled.div `
  justify-content :center;
  align-items : center;
  margin: 0 auto;
  clear: both;
`;

const TitleName = styled.div `
  font-size : 0.94vw;
  font-family: "PretendardBold";
  margin-bottom : 1vh;
`;

const MapWrap = styled.div`
  display:block;
  clear: both;
`;

const TitleInputErr = styled("input").attrs({ maxLength: "30"})`
  width : 32.2vw;
  height : 4.8vh;
  padding-left : 0.8vw;
  padding-bottom : 0.3vh;
  border-radius : 0.5vw;
  border : 1px solid #CC3939;
  display:block;
  margin-bottom : 2.5vh;
  &:focus{
  outline : 1px solid #CC3939;
  }
  &::placeholder { 
  font-size: 0.8vw;
  color : #CC3939;
  }
`;
const TitleInput = styled("input").attrs({ maxLength: "30"})`
  width : 32.2vw;
  height : 4.8vh;
  padding-left : 0.8vw;
  padding-bottom : 0.3vh;
  border-radius : 0.5vw;
  border : 1px solid #CCD1D7;
  display:block;
  margin-bottom : 2.5vh;
  &:focus{
  outline : 1px solid #6B63F6;
  }
  &::placeholder { 
  font-size: 0.8vw;
  color : #CCD1D7;
  }
`;

const SelectboxErr = styled.select `
  width : 32.2vw;
  height : 4.8vh;
  font-size: 0.73vw;
  font-family: "PretendardRegular";
  border-radius :0.5vw;
  border : 1px solid #CC3939;
  padding-left : 0.6vw;
  padding-right : 0.6vw;
  margin-bottom : 1.8vh;
  &:focus{
  outline : 1px solid #CC3939;
  }
`;
const Selectbox = styled.select `
  width : 32.2vw;
  height : 4.8vh;
  font-size: 0.73vw;
  font-family: "PretendardRegular";
  color : #555;
  border-radius :0.5vw;
  border : 1px solid #CCD1D7;
  padding-left : 0.6vw;
  padding-right : 0.6vw; 
  margin-bottom : 1.8vh;
  &:focus{
    outline : 1px solid #6B63F6;
  }
`;

const Hr = styled.hr `
  margin-bottom : 2.9vh;
`;

const InputWrap = styled.label `
  float:left;
  margin-right : 0.5vw;
  margin-bottom : 2.8vh;
  &:last-child {
  margin-right : 0px;
  }
`;

const Label = styled.label `
  font-size: 0.73vw;
  font-family: "PretendardRegular";
  width: 100%;
  border-radius: 10px;
  padding: 0.9vh 1.1vw;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #666C78;
&:hover { 
    border : 1px solid #6B63F6;
    color : #6B63F6;
}
`;

const FormCheckLeft = styled
  .input
  .attrs({type: 'radio'})`
  &:checked + ${Label} {
    background: #6B63F6;
    color: #fff;
  }
  display: none;
`;

const ButtomWrap = styled.div `
  width : 32.2vw;
  height : 5.5vh;
  display : flex;
  justify-content :center;
  align-items : center;
`;

//로딩 애니메이션
const load4 = keyframes`
  0%,
  100% {box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;}
  12.5% {box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;}
  25% {box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;}
  37.5% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;}
  50% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;}
  62.5% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em; }
  75% {box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;}
  87.5% {box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;}
`;

const load3 = keyframes`
  0%,
  100% {box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;}
  12.5% {box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;}
  25% {box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;}
  37.5% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;}
  50% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;}
  62.5% {box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;}
  75% {box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;}
  87.5% {box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;}
`;

const Loader = styled.div `
  color: #6B63F6;
  font-size: 4px;
  margin-right: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: ${load3} 1.3s infinite linear;
  animation: ${load4} 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  `;

const WaitRoomButton = styled.button `
  width : 32.2vw;
  height : 5.5vh;
  margin-top : 2vh;
  border-radius : 0.5vw;
  cursor: pointer;
  display :flex;
  align-items :center;
  justify-content:center;
  font-size : 1.05vw;
  color :  #6B63F6;  
  font-family: "PretendardBold";
  border : 1px solid #6B63F6;
  background : none;
`;
const RoomButton = styled.button `
  width : 32.2vw;
  height : 5.5vh;
  margin-top : 2vh;
  border : none;
  border-radius : 0.5vw;
  cursor: pointer;
  font-size : 1.05vw;
  font-family: "PretendardBold";
  color : white;
  background : #6B63F6;
  &:hover{
    background-color : #8983FF;
    }
`;
export default CreatRoom