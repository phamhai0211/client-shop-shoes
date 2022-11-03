import './style.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PragranceTypeItem from '../PragranceTypeItem';

import React, { useEffect, useState } from "react";

import pragrance_list_ex from '../../../assets/json/list-pragrance.json';

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 850,
    autoplaySpeed: 3000,
    fade: true,
    // cssEase: "linear",
    // nextArrow: <ArrowNext />,
    // prevArrow: <ArrowPrev />
    
}

export default function ProductDetailImageSlider({listImage}){
    const [imageListRender, setImageListRender] = useState(listImage);
    useEffect(()=>{
        setImageListRender(listImage)
        //console.log("productListRender: ", productListRender)
    },[listImage])

    return(
        <div className="product-type-slider-container">
             <Slider {...settings}  
                customPaging={(i) => {
                        return <div><img src={process.env.REACT_APP_API_IMG + imageListRender[i].path}></img></div>;
                }}
                dotsClass="slick-dots custom-indicator">
             {
                   
                        imageListRender && imageListRender.length > 0 ? (
                             
                            imageListRender.map((item, index) => 
                                <div key={index} className="slide-item">
                                   <div><img src={process.env.REACT_APP_API_IMG + item.path}></img></div>
                                </div> 
                            )
                            
                        ) : <div>Not Have Images</div>
                                              
                }

                {/* <div><PragranceTypeItem/></div>
                <div><PragranceTypeItem/></div>
                <div><PragranceTypeItem/></div>
                <div><PragranceTypeItem/></div>
                <div><PragranceTypeItem/></div> */}
             </Slider>
        </div>
    )
}