import React from "react"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";


const Carousel = () => {

    const settings = { 
        dots: false, 
        infinite: true, 
        speed: 1000, 
        slidesToShow: 1, 
        slidesToScroll: 1 
    };
 
    return (
        <CarouselWrap> 
             <SliderWrap>
                <Slider className="carousel" {...settings}> 
            <YoutubeVideo src="https://www.youtube.com/embed/DSBJXuDyDOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></YoutubeVideo>
                    <YoutubeVideo src="https://www.youtube.com/embed/N_sSVyOCdXA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></YoutubeVideo>
                    <YoutubeVideo src="https://www.youtube.com/embed/SpITJ2YlLKY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></YoutubeVideo>
                    <YoutubeVideo src="https://www.youtube.com/embed/OYihc7_4j5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></YoutubeVideo>
                </Slider> 
             </SliderWrap>  
        </CarouselWrap> 
    );
};

const CarouselWrap = styled.div`
  justify-content : center;
  align-items : center;
  margin-top : 23px;
  border-radius :15px;
  width: 730px;
  height: 430px;
  box-shadow: 1px 1px 15px 6px rgba(102,96,173,0.34);
`
const SliderWrap = styled.div`
  width: 730px;
  height: 430px;
  margin: 0 auto;
  background-color : transparent;
  border-radius :15px;
  overflow: hidden;
  margin-bottom : 0px;
  z-index:1;
  .slick-next{
    position: absolute;
    right : 58px;
    top : 183px;
  &::before{
    font-size : 50px;
    color : rgb(255,255,255,0.0);
    background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23111200'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='white'/%3E%3C/svg%3E%0A");
  }
  }
  .slick-prev{
    position: absolute;
    left : 28px;
    top : 183px;
    z-index: 9;
  &::before{
    font-size : 50px;
    color : rgb(255,255,255,0.0);
    background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 31 30' fill='none' transform='scale(-1,1)' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='15.5' cy='15' rx='15.5' ry='15' fill='%23111200'/%3E%3Cpath d='M13.5185 21.0926C13.422 21.093 13.3264 21.0754 13.2371 21.0409C13.1479 21.0064 13.0668 20.9557 12.9986 20.8917C12.8619 20.7619 12.7852 20.5869 12.7852 20.4046C12.7852 20.2223 12.8619 20.0473 12.9986 19.9175L18.3657 14.9003L12.9986 9.88307C12.8607 9.75388 12.7832 9.57865 12.7832 9.39594C12.7832 9.21323 12.8607 9.038 12.9986 8.90881C13.1365 8.77961 13.3235 8.70703 13.5185 8.70703C13.7136 8.70703 13.9006 8.77961 14.0385 8.90881L19.9139 14.4131C20.0506 14.5429 20.1272 14.7179 20.1272 14.9003C20.1272 15.0826 20.0506 15.2576 19.9139 15.3874L14.0385 20.8917C13.9703 20.9557 13.8892 21.0064 13.8 21.0409C13.7107 21.0754 13.6151 21.093 13.5185 21.0926V21.0926Z' fill='white'/%3E%3C/svg%3E%0A");
  }
  }
`;

const YoutubeVideo = styled.iframe`
  width: 730px;
  height: 430px;
  display: block;
  position: relative;
  overflow: hidden;
  object-fit: cover;
  background-size : cover;
  vertical-align: middle;
  z-index:1;
`

export default Carousel;