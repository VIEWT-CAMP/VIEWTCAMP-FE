import React, { useState } from 'react';
import styled from "styled-components";
import { actionCreators as profileAction} from "../../redux/modules/profile";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import ProfileEdit from "../../assets/profileEdit.svg"

const MyContents = (props) => {
    
    const dispatch = useDispatch();
    const fileInput = React.useRef();
    const profileList = useSelector((state)=>state.profile.list)
    const [des, setDes] = React.useState(null);
    const [is_edit, setIsEdit] = useState(false);
    const preview = useSelector((state) => state.profile.preview);
    const followerNum = useSelector((state)=>state.user.follower_list)
    const followingNum = useSelector((state)=>state.user.following_list)

    const handleEditProfile = ()=> {
        setIsEdit(true);
    }

    const handleDes = (e) => {
        if(e.target.value.indexOf(' ')===0){
            setDes("")
        }else{
            setDes(e.target.value ? e.target.value : "자기소개서를 작성해 주세요")
        }
    }

    if(des?.length > 50){
        alert("PR작성은 최대 50자까지만 작성 가능합니다.")
    }

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch(profileAction.setPreview(reader.result));
          dispatch(profileAction.editProfileImgDB({file}))
        };
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if(des===""){
            alert('자기소개는 공백으로 시작할 수 없습니다')
        }else{
            dispatch(
                profileAction.editUserPrDB({
                des,
              })
            );
        }
        
        setIsEdit(false);
      };

    const handleCancleProfile = (e) => {
        setIsEdit(false);
    }

        if(is_edit){
            return(
                <ContainerWrap>
                    <ProfileWrap>
                        <ProfileEditWrap>
                        <ProfileImgEdit 
                            id="file"
                            ref={fileInput}
                            src={preview ? preview : profileList.profileImg}
                            type="file"
                            onChange={selectFile}>
                        </ProfileImgEdit>
                        <Svg 
                            src={ProfileEdit}
                        />
                        </ProfileEditWrap>
                        <InfoWrap>
                            <UserName>{profileList.nickname}</UserName>
                            <DivisionLine/>
                            <DescInput placeholder='자기소개서를 작성해 주세요' defaultValue={profileList.userPr} onChange={handleDes}/>
                        </InfoWrap>
                    </ProfileWrap>
                    <BtnWrap>
                    <DeleteBtn onClick={handleCancleProfile}>취소</DeleteBtn>
                    <SaveBtn onClick={handleSaveProfile}>저장</SaveBtn>
                    </BtnWrap>
                </ContainerWrap>
            )
        } else {
            return(
                <ContainerWrap>
                    <ProfileWrap>
                        <ProfileImg src={profileList.profileImg}/>
                        <InfoWrap>
                            <UserName>{profileList.nickname}</UserName>
                            <DivisionLine/>
                            <DescText>{profileList.userPr}</DescText>
                        </InfoWrap>
                    </ProfileWrap>
                   
                    <EditProfileBtn onClick={handleEditProfile}>프로필 수정</EditProfileBtn>
                    <FollowWrap>
                        <FollowListBtn onClick={()=>{history.push('/mypage/follower')}}>팔로워 <span style={{fontFamily: "PretendardSemiBold"}}>{followerNum.length}</span></FollowListBtn>
                        <FollowListBtn><span style={{fontFamily: "PretendardBold"}}>·</span></FollowListBtn>
                        <FollowListBtn onClick={()=>{history.push('/mypage/following')}}>팔로잉 <span style={{fontFamily: "PretendardSemiBold"}}>{followingNum.length}</span></FollowListBtn>
                    </FollowWrap>
                </ContainerWrap>
            )
        }
};


const ContainerWrap = styled.div`
    max-width : 550px;
    min-width : 390px;
    height : 304px;
    width:36vw;
    display : grid;
    border-radius : 15px;
    background-color : white;
    margin-top : 23px;
    padding :40px;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`
const ProfileWrap = styled.div`
    display : flex;
    gap : 18px;
`
const ProfileEditWrap = styled.div`
    width: 104px;
`
const Svg = styled.div`
    width : 24px;
    height : 24px;
    position : absolute;
    margin-left : 80px;
    margin-top : -25px;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    vertical-align: middle;
    color : transparent;
    border:none;
    background-color:transparent;
    &:focus{
        display:none;
    }
`

const ProfileImg = styled.div`
    --size: 104px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
    border:none;
    float : right;
`
const ProfileImgEdit = styled.input`
    position: relative;
    overflow: hidden;
    --size: 104px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image : url("${(props) => props.src}");
    background-size: cover;
    background-position : 20% 70%;
    backgound-image : z-index 1;
    cursor: pointer;
    vertical-align: middle;
    color : transparent;
    &::file-selector-button { 
    display: none;
  }
`

const InfoWrap = styled.div`
`

const UserName = styled.p`
    font-size : 18px;
    font-family: "PretendardBold";
    margin-bottom : 0;
`
const DescText = styled.p`
    margin-bottom : 0;
    max-width : 348px;
    min-width : 166px;
    width:20vw;
    font-family: "PretendardRegular";
`
const DescInput = styled("textarea").attrs({ maxLength: "50"})`
    max-width : 348px;
    min-width : 181px;
    width:20vw;
    height : 48px;
    font-family: "PretendardRegular";
    border : none;
    border-bottom : 1px solid black;
    resize: none;
    &:focus {outline:none;};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    };
`
const DivisionLine = styled.hr`
    max-width : 348px;
    min-width : 181px;
    width : 20vw;
    color : black;
`
const EditProfileBtn = styled.button`
    max-width : 470px;
    min-width : 311px;
    width : 30vw;
    height : 52px;
    background-color : #EBEBFF;
    color : #6B63F6;
    font-family: "PretendardSemiBold";
    border-radius : 10px;
    border:1px solid #6B63F6;
    &:hover{
        background-color : #DCDCFF;
    }
`
const BtnWrap = styled.div`
    display : flex;
    gap : 8px;
    max-width : 470px;
    min-width : 311px;
    width : 31.5vw;
    justify-content : space-between;
`
const DeleteBtn = styled.button`
    width : 100px;
    height : 42px;
    color : #6B63F6;
    background-color : #FFFFFF;
    font-family: "PretendardSemiBold";
    padding-top : 7px;
    padding-bottom : 7px;
    border-radius : 10px;
    border: 1px solid #6B63F6;
    &:hover{
        background-color : #EBEBFF;
    }
`
const SaveBtn = styled.button`
    width : 100px;
    height : 42px;
    color : #FFFFFF;
    background-color : #6B63F6;
    color : white;
    font-family: "PretendardSemiBold";
    padding-top : 7px;
    padding-bottom : 7px;
    border-radius : 10px;
    border:none;
    &:hover{
        background-color : #8983FF;
    }
`

const FollowWrap = styled.div`
    display : flex;
    justify-content : center;
    text-align : center;
    align-items : center;
    gap : 10px;
    max-width : 470px;
    min-width : 311px;
    width : 31.5vw;
    height : 20px;
    padding-left : auto;
    padding-right : auto;

`

const FollowListBtn = styled.p`
    border : none;
    background : transparent;
    height : 20px;
    font-family: "PretendardMedium";
    &:hover{
      cursor : pointer;  
    }
` 

export default MyContents;