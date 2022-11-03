import HeaderSlider from "../../../components/Guest/HeaderSlider";
import HomeCategory from "../../../components/Guest/HomeCategory";
import BreakSpace from "../../../components/share/BreakSpace";
import ProductItemsSlider from "../../../components/Guest/ProductItemsSlider";
import ProductNewList from "../../../components/Guest/ProductNewList";
import TitleSection from "../../../components/share/TitleSection";
import HomeBanner from "../../../components/Guest/HomeBanner";
import HomePragrances from "../../../components/Guest/HomePragrances";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getListProductsBAsync } from "../../../redux/actions/productAction";

export default function Home(){
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListProductsBAsync());
        //dispatch(getListCategoriesAsync())
    },[]);
    const productListB = useSelector((state) => state.products.productListB);
    const isLoading = useSelector((state) => state.products.isLoading);

    return(
        <div className="home-page-container">
            <HeaderSlider/>

            <BreakSpace h="40px" />
            <HomeCategory/>

            <BreakSpace h="40px" />            
            <TitleSection title="sản phẩm nổi bật"/>
            {
                productListB &&
                <ProductItemsSlider isLoading={isLoading} productList={productListB.filter((item)=>{return item.number > 0}).splice(0,6)}/>
            }
           

            <BreakSpace h="40px" />   
            <HomeBanner/>

            {/* <BreakSpace h="30px" />   
            <TitleSection title="Ưu đãi hôm nay"/>
            <ProductItemsSlider/>
           */}
            <BreakSpace h="60px" /> 
            <HomePragrances/>

            <BreakSpace h="30px" />
            <TitleSection title="Sản phẩm mới"/>
            <ProductNewList/>
            <BreakSpace h="30px" />

        </div>
    )
}