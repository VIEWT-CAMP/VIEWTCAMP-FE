import React, { useState } from "react"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import guide from "../../assets/guide.png"
import GuideModal from "./GuideModal"

const Banner = () => {

    const [Modal,setModal] = useState(false);

    const openModal = () =>{
      setModal(true)
    }
    const closeModal = () =>{
      setModal(false)
    }
 
    return (
        <CarouselWrap> 
                    <GuideModalOpen onClick={openModal}>
                      <Guide>가이드 보기</Guide>
                      <BannerImage src={guide} alt="img"/>
                    </GuideModalOpen>

             {
               Modal===true?
               <GuideModal
               close={closeModal}
               />
               :null
             }
            
        </CarouselWrap> 
    );
};

const CarouselWrap = styled.div`
    justify-content : center;
    align-items : center;
    width: 730px;
    height: 362px;
    background :transparent;
    width: 730px;
    height: 362px;
    border-radius :40px;
    box-shadow: 1px 1px 15px 7px rgba(102,96,173,0.34);
`  
const GuideModalOpen = styled.div`
    border : none;
    background :none;
    position :relative;
    cursor: pointer;
`   
const Guide = styled.div`
    width : 125px;
    padding : 6px 10px 6px 10px;
    background :#fff;
    color: #6B63F6;
    border-radius : 10px;
    font-size : 18px;
    font-family: "PretendardSemiBold";
    text-align:center;
    position :absolute;
    top : 234px;
    left : 46px;
    z-index:1;
`   

const BannerImage = styled.div`
    width: 730px;
    height: 362px;
    display: block;
    position: relative;
    overflow: hidden;
    object-fit: cover;
    border-radius :40px;
    background-image: url("${(props) => props.src}");
    background-size: cover;
`

export default Banner;