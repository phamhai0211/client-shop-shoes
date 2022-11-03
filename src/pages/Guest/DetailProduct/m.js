import ImageProductSlider from "../../components/ImageProductSlider"
import './style.scss'
import Button from "../../components/MyButton"
import { getSingleProductAsync } from "../../redux/actions/productAction";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import NumberFormat from 'react-number-format';


export default function DetailsProduct(){
    const [isOpenDesc, setOpenDesc] = useState(false);

    let dispatch = useDispatch();

    let {id} = useParams();
    useEffect(() => {
        dispatch(getSingleProductAsync(id));
    }, []);

    const product = useSelector((state) => state.products.productSingle);
    console.log("product now mmmmmmmmmmm: ",product)

    const [colorsObject, setColorsObject] = useState(product ? JSON.parse(product.colors) : [])
    console.log("colorsObject: ", colorsObject);
    const [colorUserChoosed, setColorUserChoosed] = useState(colorsObject[0]);
    const [sizeUserChoosed, setSizeUserChoosed] = useState(colorUserChoosed && colorUserChoosed.length > 0 ? colorUserChoosed.sizes[0] : {})
    const [numberUserChoosed, setNumberUserChoosed] = useState(1);
    //useState(colorUserChoosed && colorUserChoosed.sizes ? colorUserChoosed.sizes[0] : {})
    
    useEffect(() => {
        setColorsObject(product ? JSON.parse(product.colors) : [])
        setColorUserChoosed(colorsObject[0])
    }, [product]);
    useEffect(() => {
        setSizeUserChoosed(colorUserChoosed && colorUserChoosed.length > 0 ? colorUserChoosed.sizes[0] : {})
    }, [colorUserChoosed]);
    
    // useEffect(() => {
    //   if(categoryEdit){
    //       setFormData({
    //           name: categoryEdit.name,
    //           description: categoryEdit.description
    //       })
    //   }
    // }, [categoryEdit]);

    const handleAddCart = ()=>{
       
        console.log("user choose: ", colorUserChoosed, sizeUserChoosed)
    }

    return(
        <div className="details-product-container">
            {
                product ? 
        
            <div className="container">
                <div className="row">
                    <div className="col-6 details-product-left">
                        <ImageProductSlider/>
                    </div>
                    <div className="col-6 details-product-right">
                        <h3 className="title-dp">Thông tin sản phẩm</h3>
                        <p className="name-product-dp">{product.name}</p>
                        <p className="code-product-dp">{product.sku}</p>
                        <p className="price-dp"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} /> VND</p>
                        <div className="color-dp">
                            <p>Màu</p>
                                {
                                     colorsObject && colorsObject.map((color, index) =>
                                        <div className="color-item-dp"
                                             style={{ backgroundColor: `${color.color}` }} 
                                             key={index}
                                             onClick={()=>{
                                                 setColorUserChoosed(color);
                                             }}
                                        ></div> 
                                    ) 
                                }    
                            
                        </div>
                        <div className="size-dp">
                            <p>Kích thước</p>
                            <div>
                                {
                                     colorsObject && colorUserChoosed && colorUserChoosed.sizes.map((size, index) =>
                                        <div className="size-item-dp"  
                                            key={index}
                                            onClick={()=>{
                                                setSizeUserChoosed(size)
                                            }}
                                        >{size.name}</div> 
                                    ) 
                                }  
                                {/* <div className="size-item-dp choose-size">S</div> */}
                            </div>
                        </div>

                        <div className="quantity-dp">
                            <p>Số lượng</p>
                            <div className="quantity-btn-dp">
                                <span onClick={()=>{setNumberUserChoosed( numberUserChoosed === 1 ? 1 : numberUserChoosed - 1)}}><i class='bx bx-minus icon-minus' ></i></span>
                                <span className="quantity">{numberUserChoosed}</span>
                                <span onClick={()=>{setNumberUserChoosed(numberUserChoosed + 1)}}><i class='bx bx-plus icon-plus'></i></span>
                            </div>
                        </div>
                        
                        <div className="nsx-dp">
                            Nhà sản xuất :  {product.manufacture}
                            <i class='bx bx-chevron-down icon-read-more'></i>
                        </div>
                        <p className="desc-dp">
                            <div className="desc-dp-t">Mô tả </div>
                            {
                                isOpenDesc ? <i class='bx bx-chevron-up icon-read-more' onClick={()=>setOpenDesc(!isOpenDesc)}></i>
                                : <i class='bx bx-chevron-down icon-read-more' onClick={()=>setOpenDesc(!isOpenDesc)}></i>
                            }
                            
                        </p>
                            {
                                isOpenDesc && <div className="desc-more">{product.description}</div>
                            }

                        <div className="btn-dp">
                        <div onClick={()=>{handleAddCart()}}>Thêm Vào Giỏ Hàng</div>
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