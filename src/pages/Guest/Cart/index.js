import HeaderBar from '../../../components/Guest/HeaderBar';
import HeaderImage from '../../../components/share/HeaderImage';
import BreakSpace from '../../../components/share/BreakSpace';
import ProductItemCart from '../../../components/share/ProductItemCart';
import Button01 from '../../../components/share/Button01';
import "./style.scss";
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import { addProductCartAsync, deleteProductCartAsync, editNumberProductCartAsync, getCartAsync } from '../../../redux/actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';

export  default function Cart(){
    // let listProductCart = JSON.parse(localStorage.getItem("cart"));
    const listProductCart = useSelector((state)=> state.cart.cartCustomer);
    const [totalPriceCart, setTotalPriceCart] = useState(calcTotalPriceCart(listProductCart));
    const [listProductCartA, setListProductCartA] = useState(null)
    
    function calcTotalPriceCart(list){
        let t = 0;
        if(list){
            list.map(function(item,index){
                t = t + item.product.price*item.number
           })
           console.log(t)
        }
        return t;
    }
    
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCartAsync());
    },[])

    // useEffect(()=>{
    //     setListProductCartA(listProductCart)
    // },[listProductCart])

   useEffect(()=>{
    setTotalPriceCart(calcTotalPriceCart(listProductCart))
   },[listProductCart])
   
   
   const handleDeleteProductCart = (productid) => {
        //setTotalPriceCart( calcTotalPriceCart(newP))
        //console.log("productid carttttttttttt: ",productid)
        dispatch(deleteProductCartAsync(productid));
    }
    const handleAddNumberProductCartt = (productid, newnumber) => {
        // const newpadd = {...listProductCartA[index], number: newnumber}
        // const newP = listProductCartA.slice();
        // newP[index] = newpadd;
        // setListProductCartA(newP) ;
        // setTotalPriceCart( calcTotalPriceCart(newP))

        //let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
        //const newCart = newP;
        //localStorage.setItem("cart", JSON.stringify(newCart));
        //dispatch(addProductCartAsync({productid, number: newnumber}))
        dispatch(editNumberProductCartAsync({productid, number: newnumber}))
        
    }
    return(
        listProductCart && listProductCart.length > 0 ?
        <div className="cart-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/HeaderImage.jpg" title="Cart"/>
            <BreakSpace h= "30px"/>
            <div className="container">
                <div className="row-hh title-col">
                    <div className="col-5 name-col">
                        <h3>Sản Phẩm</h3>
                    </div>

                    <div className="col-2 price-col">
                        <h3>Giá</h3>
                    </div>

                    <div className="col-2 quantity-col">
                        <h3>Số Lượng</h3>
                    </div>

                    <div className="col-2 price-total-col">
                        <h3>Tổng Giá</h3>
                    </div>

                    <div className="col-1 button-col">
                        
                    </div>
                </div>

                <div className="list-product-cart">
                    {
                        listProductCart && listProductCart.map(function(item,index){
                            return(
                                <ProductItemCart 
                                    productCart = {item} 
                                    handleDeleteProductCart={handleDeleteProductCart} 
                                    handleAddNumberProductCart = {(productid,newnumber)=>handleAddNumberProductCartt(productid,newnumber)}
                                    index={index} />
                            ) 
                        })
                    }
                  
                </div>

               <div className="row-hh total-price-bill">
                    <div className="bill-border">
                        <span className="bill-title">Tổng : </span>
                        <span className="bill-price"><NumberFormat value={totalPriceCart} displayType={'text'} thousandSeparator={true} /> VND</span>
                    </div>
               </div>

               <div className="row-hh btn">
                   <div className="btn-item btn-sale">
                        <Button01 linkTo="/sale" >Tiếp tục mua hàng</Button01>
                   </div>
                    
                   <div className="btn-item btn-buy">
                        <Button01 linkTo="/buy">Đặt Hàng</Button01>
                   </div>
               </div>


            </div>
            <BreakSpace h= "30px"/>
        </div>
        : <div className="cart-empty">Cart empty</div>
    );
}


//------------------------------

// import HeaderBar from '../../../components/Guest/HeaderBar';
// import HeaderImage from '../../../components/share/HeaderImage';
// import BreakSpace from '../../../components/share/BreakSpace';
// import ProductItemCart from '../../../components/share/ProductItemCart';
// import Button01 from '../../../components/share/Button01';
// import "./style.scss";
// import { useEffect, useState } from "react";
// import NumberFormat from 'react-number-format';
// import { addProductCartAsync, deleteProductCartAsync, editNumberProductCartAsync, getCartAsync } from '../../../redux/actions/cartAction';
// import { useDispatch, useSelector } from 'react-redux';

// export  default function Cart(){
//     // let listProductCart = JSON.parse(localStorage.getItem("cart"));
//     const listProductCart = useSelector((state)=> state.cart.cartCustomer);
//     const [totalPriceCart, setTotalPriceCart] = useState(calcTotalPriceCart(listProductCart));
//     const [listProductCartA, setListProductCartA] = useState(null)
    
//     function calcTotalPriceCart(list){
//         let t = 0;
//         if(list){
//             list.map(function(item,index){
//                 t = t + item.product.price*item.number
//            })
//            console.log(t)
//         }
//         return t;
//     }
    
//     let dispatch = useDispatch();
//     useEffect(()=>{
//         dispatch(getCartAsync());
//     },[])

//     useEffect(()=>{
//         setListProductCartA(listProductCart)
//     },[listProductCart])

//    useEffect(()=>{
//     setTotalPriceCart( calcTotalPriceCart(listProductCart))
//    },[listProductCart])
   
   
//    const handleDeleteProductCart = (index, productid) => {
//         const newP = listProductCartA.slice();
//         newP.splice(index,1);
//         setListProductCartA(newP) ;
//         setTotalPriceCart( calcTotalPriceCart(newP))

//         //let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
//         const newCart = newP;
//         //localStorage.setItem("cart", JSON.stringify(newCart));
//         console.log("productid carttttttttttt: ",productid)
//         dispatch(deleteProductCartAsync(productid));
//     }
//     const handleAddNumberProductCartt = (index, productid, newnumber) => {
//         const newpadd = {...listProductCartA[index], number: newnumber}
//         const newP = listProductCartA.slice();
//         newP[index] = newpadd;
//         setListProductCartA(newP) ;
//         setTotalPriceCart( calcTotalPriceCart(newP))

//         //let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
//         const newCart = newP;
//         //localStorage.setItem("cart", JSON.stringify(newCart));
//         //dispatch(addProductCartAsync({productid, number: newnumber}))
//         dispatch(editNumberProductCartAsync({productid, number: newnumber}))
        
//     }
//     return(
//         listProductCart && listProductCart.length > 0 ?
//         <div className="cart-container">
//             <HeaderBar/>
//             <HeaderImage img= "/assets/images/slider01.jpg" title="Cart"/>
//             <BreakSpace h= "30px"/>
//             <div className="container">
//                 <div className="row-hh title-col">
//                     <div className="col-5 name-col">
//                         <h3>Sản Phẩm</h3>
//                     </div>

//                     <div className="col-2 price-col">
//                         <h3>Giá</h3>
//                     </div>

//                     <div className="col-2 quantity-col">
//                         <h3>Số Lượng</h3>
//                     </div>

//                     <div className="col-2 price-total-col">
//                         <h3>Tổng Giá</h3>
//                     </div>

//                     <div className="col-1 button-col">
                        
//                     </div>
//                 </div>

//                 <div className="list-product-cart">
//                     {
//                         listProductCartA && listProductCartA.map(function(item,index){
//                             //setTotalPriceCart(totalPriceCart + item.price)
//                             return(
//                                 <ProductItemCart 
//                                     productCart = {item} 
//                                     handleDeleteProductCart={handleDeleteProductCart} 
//                                     handleAddNumberProductCart = {(index,productid,n)=>handleAddNumberProductCartt(index,productid,n)}
//                                     index={index} />
//                             ) 
//                         })
//                     }
                  
//                 </div>

//                <div className="row-hh total-price-bill">
//                     <div className="bill-border">
//                         <span className="bill-title">Tổng : </span>
//                         <span className="bill-price"><NumberFormat value={totalPriceCart} displayType={'text'} thousandSeparator={true} /> VND</span>
//                     </div>
//                </div>

//                <div className="row-hh btn">
//                    <div className="btn-item btn-sale">
//                         <Button01 linkTo="/sale" >Tiếp tục mua hàng</Button01>
//                    </div>
                    
//                    <div className="btn-item btn-buy">
//                         <Button01 linkTo="/buy">Đặt Hàng</Button01>
//                    </div>
//                </div>


//             </div>
//             <BreakSpace h= "30px"/>
//         </div>
//         : <div className="cart-empty">Cart empty</div>
//     );
// }