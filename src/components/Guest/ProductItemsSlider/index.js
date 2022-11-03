import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import { ArrowNext, ArrowPrev } from './Arrow'

import ProductItem from "../../share/ProductItem";
import React, { useEffect, useState } from "react";

import product_list_ex from '../../../assets/json/list-product-hot.json';

const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 4000,
    //fade: true,
    // cssEase: "linear",
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />
}



export default function ProductItemsSlider({isLoading, productList = [...product_list_ex]}) {
    const [productListRender, setProductListRender] = useState(productList);
    const [isLoadingRender, setIsLoadingRender] =useState (isLoading)   
    useEffect(()=>{
        setProductListRender(productList)
        //console.log("productListRender: ", productListRender)
    },[productList])

    useEffect(()=>{
        setIsLoadingRender(isLoading)
    },[isLoading])

    return (
        <div className="product-item-slider container">
          <Slider {...settings}>
                {
                    isLoadingRender ? <div>Loading...</div> :
                    (
                        productListRender && productListRender.length > 0 ? (
                             
                            productListRender.map((item, index) => 
                                <div key={index}>
                                    <ProductItem 
                                        image={process.env.REACT_APP_API_IMG + item.images[0].path}
                                        //image={item.image}
                                        name = {item.name}
                                        rated= {item.rated}
                                        price = {item.price}
                                        id = {item.id}
                                    />
                                </div> 
                            )
                            
                        ) : <div>Not Have Product</div>
                    )                           
                }
           
            {/* <div>
                <ProductItem image="/assets/images/HomeCategory01.png"
                    name = "Catus Water"
                    price = "380.000"/>
            </div>
            <div>
                <ProductItem image="/assets/images/HomeCategory01.png"
                    name = "Catus Water"
                    price = "380.000"/>
            </div> */}

          </Slider>
        </div>
      );
}