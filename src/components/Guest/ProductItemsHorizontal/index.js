import ProductItem from '../../share/ProductItem';
import './style.scss'

import React, { useEffect, useState } from "react";

import product_list_ex from '../../../assets/json/list-product-hot.json';

export default function ProductItemsHorizontal({isLoading, productList = [...product_list_ex]}){
    const [productListRender, setProductListRender] = useState(productList);
    const [isLoadingRender, setIsLoadingRender] =useState (isLoading)   
    useEffect(()=>{
        setProductListRender(productList)
        //console.log("productListRender: ", productListRender)
    },[productList])

    useEffect(()=>{
        setIsLoadingRender(isLoading)
    },[isLoading])

    
    return(
        <div className="product-items-horizontal">
              {
                    isLoadingRender ? <div>Loading...</div> :
                    (
                        productListRender && productListRender.length > 0 ? (
                             
                            productListRender.map((item, index) => 
                                <div key={index} className="pi-container">
                                    <ProductItem
                                        image={process.env.REACT_APP_API_IMG + item.images[0].path}
                                        //image={item.image}
                                        isHorizontal = {true}
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
        </div>
    )
}