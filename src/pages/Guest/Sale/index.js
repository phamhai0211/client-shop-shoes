import HeaderBar from "../../../components/Guest/HeaderBar";
import HeaderImage from "../../../components/share/HeaderImage";
import BreakSpace from "../../../components/share/BreakSpace";
import "./style.scss";
//import { SearchOutline } from 'react-ionicons'
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
//import { getListCategoriesNameAsync } from "../../redux/actions/categoryAction";
import { getListProductsAsync, getProductByCategoryIdAsync } from "../../../redux/actions/productAction";
import { getListCategoriesAsync } from "../../../redux/actions/categoryAction";
import ProductItem from "../../../components/share/ProductItem";

export  default function Sale(){
    //let history = useHistory();
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListProductsAsync());
        dispatch(getListCategoriesAsync())
    },[]);
   
    const productList = useSelector((state) => state.products.productList);
    const isLoading = useSelector((state) => state.products.isLoading);
    const categoryList = useSelector((state) => state.categories.categoryList);
    // const handleOpenDetailProduct = (idP) => {
    //     console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm",idP)
    //     history.push(`/detailsProduct/${idP}`)
    // }
    const [productListRender, setProductListRender] = useState(productList);
    useEffect(() => {
        setProductListRender(productList)
    },[productList]);

    const handleFilterProduct = (categoryId) =>{
        dispatch(getProductByCategoryIdAsync(categoryId))
        // .then(res => {
        //     if (res.ok) {
        //         // Thành công
        //         setProductListRender(res.productFilterByCategory)   
        //     } else {
        //         // Thất bại
        //         //console.log("status",status)
        //         setProductListRender([]) 
        //     }
        // // });
        
    }

    
    const handleGetAllProduct = () =>{
        dispatch(getListProductsAsync())
        //setProductListRender(productList)
    }

    return(
        <div className="sale-page-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/headerimg.jpg" title="Shop"/>
            <BreakSpace h="30px"/>
            <div className="container">
                <div className="row-hh">
                    <div className="col-3 left-bar">
                        <div className="categories">
                            <h3 className="title">Danh mục</h3>
                            <ul className="list-categories">
                                <li onClick={()=>handleGetAllProduct()}>Tất cả</li>
                                {
                                    categoryList && categoryList.length > 0 ? (
                                        categoryList.map((item, index) => 
                                           <li key={index} onClick={()=>handleFilterProduct(item.id)}>{item.name}</li>
                                        )
                                   ) : ''  
                                }
                            </ul>
                        </div>

                        <div className="search-product">
                            <input type="text" placeholder="Tên sản phẩm..."></input>
                            <button><i class='bx bx-search icon-search'></i></button>
                        </div>  
                    </div>
                  
                    <div className="col-9 list-product">
                        {
                            isLoading ? <div>Loading...</div> :
                            (
                                productListRender && productListRender.length > 0 ? (
                                       
                                    productListRender.map((item, index) => 
                                                                           
                                        item.number == 0 ? '':
                                        <div className="col-4">
                                            <ProductItem image = {process.env.REACT_APP_API_IMG + item.images[0].path}
                                                name = {item.name}
                                                price = {item.price}
                                                id = {item.id}
                                                // handleOnclickProduct = {(idP) => handleOpenDetailProduct(idP)}
                                                />
                                        </div>                                        
                                    )
                                    
                               ) : <div>Not Have Product</div>
                            )                           
                        }

                    </div>

                </div>

            </div>
            <BreakSpace h="30px"/> 
        </div>
    );
}