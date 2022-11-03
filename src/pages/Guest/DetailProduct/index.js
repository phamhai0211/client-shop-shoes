import './style.scss'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import NumberFormat from 'react-number-format';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ArrowNext from './ArrowNext'
// import ArrowPrev from './ArrowPrev'
// import { toast } from "react-toastify";

import { getSingleProductAsync } from '../../../redux/actions/productAction'
import ProductDetailImageSlider from '../../../components/share/ProductDetailImageSlider';
import { addProductCartAsync } from '../../../redux/actions/cartAction';
import { toast } from 'react-toastify';

// const settings = {
//     // dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     //autoplay: true,
//     speed: 500,
//     // autoplaySpeed: 3000,
//     //fade: true,
//     // cssEase: "linear",
//     nextArrow: <ArrowNext />,
//     prevArrow: <ArrowPrev />

// }

export default function DetailProduct() {
    const [isOpenDesc, setOpenDesc] = useState(false);

    let dispatch = useDispatch();

    const product = useSelector((state) => state.products.productSingle);
    console.log("product now mmmmmmmmmmm: ", product)

    //const [colorsObject, setColorsObject] = useState([]);
    //console.log("colorsObject: ", colorsObject);
    //const [colorUserChoosed, setColorUserChoosed] = useState({color: "", sizes: []});
    //const [sizeUserChoosed, setSizeUserChoosed] = useState({name: "", number: 0})
    const [numberUserChoosed, setNumberUserChoosed] = useState(0);

    let { id } = useParams();
    useEffect(() => {
        dispatch(getSingleProductAsync(id))
            // .then(res => {
            //     // console.log("okkkkkkkkk: ", res.ok)
            //     if (res.ok) {
            //         // setColorsObject(JSON.parse(res.productCurrent.colors))
            //         // setColorUserChoosed(JSON.parse(res.productCurrent.colors)[0])
            //         // setSizeUserChoosed(JSON.parse(res.productCurrent.colors)[0].sizes[0])
            //         //console.log("okkkkkkkkk: ",JSON.parse(res.productCurrent.colors)[0].sizes[0])
            //     }
            // })
    }, []);

    const handleAddCart = (id) => {
        if(numberUserChoosed > 0){
            dispatch(addProductCartAsync({productid: id, number: numberUserChoosed}))
        }
        else{
            toast.error("PLEASE CHOOSE NUMBER")
        }
       
    }

    return (
        <div className="details-product-container">
            {
                product ?
                   <div className="container">
                        <div className="row-hh">
                            <div className="col-6 details-product-left">
                                {
                                    product.images && product.images.length > 0 ?
                                        <ProductDetailImageSlider listImage = {product.images}/> : ''
                                }
                        
                            </div>

                            <div className="col-6 details-product-right">
                                <h3 className="title-dp">Thông tin sản phẩm</h3>
                                <p className="name-product-dp">{product.name}</p>
                                <p className="code-product-dp">code {product.id}</p>
                                <p className="price-dp"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} /> VND</p>
                                <p className="capacity-product-dp">Size: {product.capacity} </p>
                               
                                {/* <div className="color-dp">
                                <p>Màu</p>
                                {
                                     colorsObject && colorsObject.map(function(color, index){
                                        if(color.color === colorUserChoosed.color){
                                            return(
                                                <div className="color-item-dp choosed"
                                                    style={{ backgroundColor: `${color.color}` }} 
                                                    key={index}
                                                    onClick={()=>{
                                                        setColorUserChoosed(color);
                                                    }}
                                                ></div> 
                                            )
                                        } 
                                        else{
                                            return(
                                                <div className="color-item-dp"
                                                    style={{ backgroundColor: `${color.color}` }} 
                                                    key={index}
                                                    onClick={()=>{
                                                        setColorUserChoosed(color);
                                                    }}
                                                 ></div> 
                                            )
                                        }
                                    }) 
                                }  
                            
                                </div>  */} 
                                {/*  <div className="size-dp">
                                    <p>Kích thước</p>
                                    <div>
                                {
                                     colorsObject && colorUserChoosed && colorUserChoosed.sizes.map(function(size, index){
                                        if(size.name === sizeUserChoosed.name){
                                            return(
                                                <div className="size-item-dp choose-size"  
                                                    key={index}
                                                    onClick={()=>{
                                                        setSizeUserChoosed(size)
                                                    }}
                                                >{size.name}</div> 
                                            )
                                        } else{
                                            return(
                                                <div className="size-item-dp"  
                                                    key={index}
                                                    onClick={()=>{
                                                        setSizeUserChoosed(size)
                                                    }}
                                                >{size.name}</div> 
                                            )
                                        }
                                    })    
                                }  
                                </div>
                                </div> */}
                                <div className="fragrances-dp">
                                    <p>Nhãn hiệu</p>
                                    <div className="list-f-dp">
                                        {
                                            product.fragrances && product.fragrances.length > 0 ?
                                            product.fragrances.map((item, index) => 
                                                <div className="fragrance-item">
                                                    {item.name}
                                                </div>
                                            )
                                            : ''
                                        }
                                    </div>
                                </div>

                                <div className="nsx-dp">
                                    Nhà sản xuất :  {product.manufacture.name}
                                    {/* <i class='bx bx-chevron-down icon-read-more'></i> */}
                                </div>
                                <p className="desc-dp">
                                    <div className="desc-dp-t">Mô tả </div>
                                    {
                                        isOpenDesc ? <i class='bx bx-chevron-up icon-read-more' onClick={() => setOpenDesc(!isOpenDesc)}></i>
                                            : <i class='bx bx-chevron-down icon-read-more' onClick={() => setOpenDesc(!isOpenDesc)}></i>
                                    }
                                </p>
                                {
                                    isOpenDesc && <div className="desc-more">{product.description}</div>
                                }

                                <p className="k-product-dp">Tồn kho: <NumberFormat value={product.number} displayType={'text'} thousandSeparator={true} /></p>

                                <div className="quantity-dp">
                                    <p>Số lượng</p>
                                    <div className="quantity-btn-dp">
                                        <span onClick={() => { setNumberUserChoosed(numberUserChoosed === 0 ? 0 : numberUserChoosed - 1) }}><i class='bx bx-minus icon-minus' ></i></span>
                                        <span className="quantity">{numberUserChoosed}</span>
                                        <span onClick={() => { setNumberUserChoosed(numberUserChoosed == product.number ? numberUserChoosed : numberUserChoosed + 1) }}><i class='bx bx-plus icon-plus'></i></span>
                                    </div>
                                </div>

                                <div className="btn-dp">
                                    <div onClick={() => { handleAddCart(product.id)}} className="button-themgh">Thêm Vào Giỏ Hàng</div>
                                    {/* <Button nameButton="Thêm Vào Giỏ Hàng" onClick={(event)=>{handleAddCart()}}/>
                                    <Button nameButton="Mua Hàng"/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>Loading...</div>
            }
        </div>
    )
}