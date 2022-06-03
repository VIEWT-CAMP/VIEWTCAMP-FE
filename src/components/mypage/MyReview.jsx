import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
import { actionCreators as reviewActions } from "../../redux/modules/review";
import ReviewItem from "./ReviewItem";
import { history } from "../../redux/configureStore";
import Emoge from "../../assets/emoge.svg"

const MyReview = (props) => {
    const dispatch = useDispatch();

     React.useEffect(()=>{
        dispatch(reviewActions.getReviewDB());
    },[]);

  const reviewList = useSelector((state) => state.review.list)


    return (
        <ContainerWrap>
            <TitleWrap>
                <TitleText onClick={()=>{history.push('/mypage/review')}}>나의 소감</TitleText>
                <FollowerTitle onClick={()=>{history.push('/mypage/follower')}}>팔로워</FollowerTitle>
                <FollowingTitle onClick={()=>{history.push('/mypage/following')}}>팔로잉</FollowingTitle>
            </TitleWrap>  
            <ListWrap>      
            {
                (reviewList?.length===0)
                ?<IssuePageWrap>
                    <IssueIcon src={Emoge}/>
                    <IssueMsg>
                        작성된 소감이 <span style={{color:"#6B63F6"}}>없습니다.</span>
                    </IssueMsg>
                    <GuideIssue>
                        스터디를 진행하고 소감을 남겨보세요.
                    </GuideIssue>
                </IssuePageWrap>
                :reviewList&&reviewList.map((e, idx)=>{
                        return(
                            <BoxWrap >
                                 <ReviewItem key={idx} e={e}/>
                            </BoxWrap>
                        )
                    })   
            }
            </ListWrap>
        </ContainerWrap>
    );
};

const ContainerWrap = styled.div`
    max-width : 918px;
    min-width : 600px;
    max-height : 840px;
    min-height : 564px;
    width : 50vw;
    display : grid-row-end;
    border-radius : 15px;
    background-color : white;
    margin-top : 23px;
    padding : 40px;
    overflow-x : hidden;
    box-shadow: 1px 1px 15px 5px  rgba(102,96,173,0.14);
`
const ListWrap = styled.div`
    height : 700px;
    border-radius : 15px;
    background-color : white;
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

const TitleWrap = styled.div`
    display : flex;
    gap : 40px;
    min-width : 500px;
`
const TitleText = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #2B303B;
    border-bottom : 2px solid #2B303B;
    &:hover{
        cursor : pointer;
    }
    `
const FollowerTitle = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #9B9B9B;
    &:hover{
        cursor : pointer;
    }
    `
const FollowingTitle = styled.p`
    font-size : 20px;
    font-family: "PretendardBold";
    color : #9B9B9B;
    &:hover{
        cursor : pointer;
    }
    `
const BoxWrap = styled.div`
    width : 820px;
    background-color : #F9F9FA;
    margin-top:18px;
    border : 1px solid #DEE3D8;
    border-radius : 10px;
    position : relative;
    padding-top : 17px;
    padding-bottom : 17px; 
`
const IssuePageWrap = styled.div`
    max-width : 819px;
    max-height:400px;
    gap : 18px;
    margin-top : 91px;
    justify-content : center;
    text-align : center;
    align-items:center;
`
const IssueIcon = styled.img`
    margin-bottom : 30px;
    margin-top : 107px;
`
const IssueMsg = styled.p`
    font-size : 2em;
    font-family: "PretendardSemiBold";
    color: #272727;
    min-width: 520px;
    max-width: 560px;
    justify-content : center;
    text-align : center;
    margin-left : auto;
    margin-right : auto;
`
const GuideIssue = styled.p`
    font-size : 1.5em;
    font-family: "PretendardRegular";
    color : #7A7A7A;
    min-width: 520px;
    max-width: 838px;
    width : 30vw;
    justify-content : center;
    text-align : center;
    margin-left : auto;
    margin-right : auto;
`
export default MyReview;