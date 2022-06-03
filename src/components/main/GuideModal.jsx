import React from 'react'
import styled from "styled-components";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Guide1 from "../../assets/Guide1.png"
import Guide2 from "../../assets/Guide2.png"
import Guide3 from "../../assets/Guide3.png"
import Guide4 from "../../assets/Guide4.png"
import closeicon from '../../assets/closeicon.svg'

function GuideModal(props) {
    const {close} = props;
    const settings = { 
        dots: true, 
        infinite: true, 
        speed: 1000, 
        slidesToShow: 1, 
        slidesToScroll: 1,
    };

  return (
    <Background>
        <ImgWrap onClick={close}>
           <CloseImg src={closeicon}></CloseImg>
        </ImgWrap>
         <SliderWrap>
                <Slider className="carousel" {...settings}> 
                     <BannerImage src={Guide1} alt="img"/>
                     <BannerImage src={Guide2} alt="img"/>
                     <BannerImage src={Guide3} alt="img"/>
                     <BannerImage src={Guide4} alt="img"/>
                   </Slider> 
             </SliderWrap>
    </Background>
  )
}
const Background =styled.div`
   width: 109.3vw;
    max-width: 2098px;
    min-width: 1787px;
    height: 500vh;
    position :fixed;
    top:0px;
    left:0px;
    background: rgba(0,0,0,0.7);
    z-index : 9;
`
const ImgWrap =styled.div`
    width: 20px;
    height: 20px;
    position :absolute;
    top:185px;
    left : 1390px;
    z-index:9;
    cursor: pointer;
`
const CloseImg =styled.img`
    width: 20px;
    height: 20px;
`

const SliderWrap = styled.div`
  width: 989px;
  height: 665px;
  margin: 0 auto;
  border-radius :40px;
  position : fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  box-shadow: 1px 1px 15px 5px rgba(89,89,89,0.37);
  .slick-next{
      position: absolute;
      right : -55px;
      top : 300px;
    &::before{
      font-size : 50px;
      color : rgb(255,255,255,0.0);
      background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23DFDFDF'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='%23454545'/%3E%3C/svg%3E%0A");
    }
    }
    .slick-prev{
      position: fixed;
      left : -80px;
      top : 300px;
      z-index: 9;
    &::before{
      font-size : 50px;
      color : rgb(255,255,255,0.0);
      background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 31 30' fill='none' transform='scale(-1,1)' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23DFDFDF'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='%23454545'/%3E%3C/svg%3E%0A");
    }
  }
    .slick-dots {
        justify-content: center;    
        margin: 0;
        padding: 10px 0;    
        list-style-type: none;  
        position: absolute;
        bottom : 33px;
    }
    .slick-dots li {
                margin: 0 1px;
    }   
    .slick-dots button {
                display: block;
                width: 9px;
                height: 9px;
                padding: 0;         
                border: none;
                border-radius: 100%;
                background-color: #D9D9D9;         
                text-indent: -9999px;
                cursor: pointer;
    }
    .slick-dots li.slick-active button {
                background-color: #6B63F6;
    }   
`    

const BannerImage = styled.div`
    width: 989px;
    height: 665px;
    display: block;
    border-radius :40px;
    background-image: url(${(props) => props.src});
    background-size: cover;
`
export default GuideModal