import React, { Component } from "react"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import errtip from "../../assets/errtip.png"
import notice2 from "../../assets/notice2.png"



const AdBanner = () => {

    const settings = { 
        dots: true, 
        infinite: true, 
        speed: 2000, 
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay : Boolean,
        autoplaySpeed : 4000
    };
 
    return (
        <CarouselWrap> 
             <SliderWrap>
                <Slider className="carousel" {...settings}> 
                    <LinkA href="https://docs.google.com/forms/d/1MdGxuARjSuADGBcVJpeebAkiPKrnSsI26nGlcb-1IVc/viewform?edit_requested=true" target="blank">
                      <BannerImage src={errtip} alt="img"/>
                    </LinkA>
                    <LinkA href="https://docs.google.com/forms/d/e/1FAIpQLSdQCqXZvUOIztH0jERgXMGxupZnuU_OmOXwJZKXB44aHdY9pQ/viewform" target="blank">
                      <BannerImage src={notice2} alt="img"/>
                    </LinkA>
                </Slider> 
             </SliderWrap>
            
        </CarouselWrap> 
    );
};

const CarouselWrap = styled.div`
  justify-content : center;
  align-items : center;
  background :transparent;
  border-radius :40px;
  width: 730px;
  height: 260px;
  box-shadow: 1px 1px 15px 5px rgba(102,96,173,0.14);
   
`
const SliderWrap = styled.div`
  width: 730px;
  height: 260px;
  margin: 0 auto;
  border-radius :40px;
  overflow: hidden;

`  
const LinkA = styled.a`
  width: 730px;
  height: 260px;
  display :block;
  box-shadow: 1px 1px 15px 5px rgba(0,0,0,0.1);
  border-radius :40px;
  text-decoration: none; 
  outline: none;
`  

const BannerImage = styled.div`
  width: 730px;
  height: 260px;
  display: block;
  background-image: url(${(props) => props.src});
  background-size: cover;
`

export default AdBanner;