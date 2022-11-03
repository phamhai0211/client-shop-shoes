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
    speed: 1000,
    autoplaySpeed: 3000,
    fade: true,
    // cssEase: "linear",
    // nextArrow: <ArrowNext />,
    // prevArrow: <ArrowPrev />
    
}

export default function PragranceTypeSlider({isLoading, listP = [...pragrance_list_ex]}){
    const [pragranceListRender, setPragranceListRender] = useState(listP);
    const [isLoadingRender, setIsLoadingRender] =useState(isLoading)   
    useEffect(()=>{
        setPragranceListRender(listP)
        //console.log("productListRender: ", productListRender)
    },[listP])

    useEffect(()=>{
        setIsLoadingRender(isLoading)
    },[isLoading])

    return(
        <div className="pragrance-type-slider-container">
             <Slider {...settings}  
                customPaging={(i) => {
                        return <div>{pragranceListRender[i].name}</div>;
                }}
                dotsClass="slick-dots custom-indicator">
             {
                    isLoadingRender ? <div>Loading...</div> :
                    (
                        pragranceListRender && pragranceListRender.length > 0 ? (
                             
                            pragranceListRender.map((item, index) => 
                                <div key={index} className="slide-item">
                                    <PragranceTypeItem
                                        //image={process.env.REACT_APP_API_IMG + item.images[0]}
                                        img = {item.img}
                                        name = {item.name}
                                        desc = {item.description}
                                        id = {item.id}
                                    />
                                </div> 
                            )
                            
                        ) : <div>Not Have Pragrance</div>
                    )                           
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