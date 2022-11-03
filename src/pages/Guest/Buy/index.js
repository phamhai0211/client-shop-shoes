import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import HeaderBar from "../../../components/Guest/HeaderBar";
import BreakSpace from "../../../components/share/BreakSpace";
import HeaderImage from "../../../components/share/HeaderImage";
import ProductItemBuy from "../../../components/share/ProductItemBuy";
import { getCartAsync } from "../../../redux/actions/cartAction";
import { getCustomerByEmailAsync } from "../../../redux/actions/customerAction";
import { createOrderAsync } from "../../../redux/actions/orderAction";
import PayPal from "./paypal";
//import ItemProductBuy from "../../components/ItemProductBuy";
import "./style.scss";



export default function Buy() {
    //San Pham
    //let listProductCart = JSON.parse(localStorage.getItem("cart"));
    const listProductCart = useSelector((state) => state.cart.cartCustomer);
    const [totalPriceCart, setTotalPriceCart] = useState(calcTotalPriceCart(listProductCart));
    const [totalPriceBill, setTotalPriceBill] = useState(0);
    
    const [showPaypal, setShowPaypal] = useState(false);

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartAsync());
    }, [])

    function calcTotalPriceCart(list) {
        let t = 0;
        if (list) {
            list.map(function (item, index) {
                t = t + item.product.price * item.number
            })
            //console.log(t)
        }
        return t;
    }

    useEffect(() => {
        dispatch(getCartAsync());
    }, [])

    useEffect(() => {
        if (listProductCart) {
            setTotalPriceCart(calcTotalPriceCart(listProductCart))
        }
    }, [listProductCart])

    const shipBill = 0;
    useEffect(() => {
        setTotalPriceBill(totalPriceCart + shipBill)
    }, [totalPriceCart])
    

    //Nguoi Dat
    const userCurrent = useSelector((state) => state.customers.customerSingle);
    //const infoUserOder = {...userCurrent};
    const [infoUserOder, setInfoUserOder] = useState({ name: '', phone: '', address: '', note: '' });
    //console.log("gggggg", userCurrent)
    const decoded = jwt_decode(Cookies.get('X-Auth-Token'));
    useEffect(() => {
        dispatch(getCustomerByEmailAsync(decoded.sub))
    }, [])

    // useEffect(()=>{
    //     if(userCurrent){
    //         setInfoUserOder({...infoUserOder,
    //             name: userCurrent.name,
    //             phone: userCurrent.phone,
    //             address: userCurrent.address,
    //             note: ""
    //         })
    //     }
    //   },[userCurrent])

    // const [formData, setFormData] = useState({
    //     name: infoUserOder.name,
    //     phone: infoUserOder.phone,
    //     address: infoUserOder.address,
    //     note: ""
    // })

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        note: ""
    })
    useEffect(() => {
        if (userCurrent) {
            setFormData({
                ...formData,
                name: userCurrent.name,
                phone: userCurrent.phone,
                address: userCurrent.address,
                note: userCurrent.note
            })
        }
    }, [userCurrent])

    const [formValidError, setFomValidError] = useState({
        name: '',
        phone: '',
        address: '',
        note: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

    function handleChangeFormData(key) {
        return (evt) => {
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
            //console.log("kkk: ",formData); //note
        }
    }

    useEffect(() => {
        //console.log("kkk22: ",formData); //note
        setFomValidError(checkValidateInput(formData));
    }, [formData]);

    function checkValidateInput(formD) {
        let err = {}
        if (!formD.name) {
            err.name = "Bạn chưa điền tên người nhận hàng!"
        }
        if (!formD.phone) {
            err.phone = "Bạn chưa điền số điện thoại!"
        } else if (formD.phone.length < 10) {
            err.phone = "Số điện thoại chưa hợp lệ."
        }
        if (!formD.address) {
            err.address = "Bạn chưa điền địa chỉ!"
        }
        //console.log("error form: ",err)

        if (err.name || err.phone || err.address) {
            setIsValidForm(false)
            console.log("vao falsse")
        } else {
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }

        return err;
    }
    ////end form

    //dat hang
    let history = useHistory();
    const handleDatHangOnline = () => {


        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid true")
        // console.log("product choose: ", listProductCart);
        console.log("formData: ", formData);

        setShowPaypal(!showPaypal);
        // dispatch(createOrderAsync({
        //     nameCustomer: formData.name,
        //     address: formData.address,
        //     phoneNumber: formData.phone,
        //     isPaid: 1
        // }))
        // .then(
        //     history.push("/")
        // )

    }

    const handleDatHangOnlinePaypal = () => {
        dispatch(createOrderAsync({
            nameCustomer: formData.name,
            address: formData.address,
            phoneNumber: formData.phone,
            ispaid: 1
        }))
        .then(
            history.push("/")
        )

    }

    const handleDatHangOffline = () => {
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid true")
        // console.log("product choose: ", listProductCart);
        console.log("formData: ", formData);

        dispatch(createOrderAsync({
            nameCustomer: formData.name,
            address: formData.address,
            phoneNumber: formData.phone,
            ispaid: 0
        }))
            .then(
                history.push("/")
            )

    }


    return (
        <div className="buy-container">
            <HeaderBar />
            <HeaderImage img="/assets/images/HeaderImage.jpg" title="Buy" />
            <BreakSpace h="30px" />
            <div className="row-hh wrap">
                <div className="container-left col-7">
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
                        {listProductCart &&
                            listProductCart.map(function (item, index) {
                                return (
                                    <ProductItemBuy
                                        img={process.env.REACT_APP_API_IMG + item.product.images[0].path}
                                        name={item.product.name}
                                        price={item.product.price}
                                        quantity={item.number}
                                        priceTotal={item.price * item.number}
                                        capacity={item.product.capacity}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="row-hh total-price-bill">
                        <div className="bill-border">
                            <span className="bill-title">Tổng :  </span>
                            <span className="bill-price"><NumberFormat value={totalPriceBill} displayType={'text'} thousandSeparator={true} /> VND</span>
                        </div>
                    </div>

                    {/* <div className="row btn">
                   <div className="btn-item">
                        <Button nameButton="Tiếp tục mua hàng"/>
                   </div>
                    
                   <div className="btn-item">
                        <Button nameButton="Đặt Hàng"/>
                   </div>
               </div> */}
                </div>

                <div className="container-right col-5">
                    <h3 className="title-cr">Địa chỉ giao hàng</h3>
                    <form className="form-buy-info">
                        <div className="form-group">
                            <label className="label">Tên người nhận hàng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder=""
                                value={formData.name}
                                onChange={handleChangeFormData('name')}
                            />
                            {formValidError.name && <label className="label-error">{formValidError.name}</label>}
                        </div>
                        <div className="form-group">
                            <label className="label">Địa chỉ nhận hàng<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder=""
                                value={formData.address}
                                onChange={handleChangeFormData('address')}
                            />
                            {formValidError.address && <label className="label-error">{formValidError.address}</label>}
                        </div>
                        <div className="form-group">
                            <label className="label">Số điện thoại liên lạc<span className="icon-s">*</span></label>
                            <input id="name" type="text" className="form-control bac" placeholder=""
                                value={formData.phone}
                                onChange={handleChangeFormData('phone')}
                            />
                            {formValidError.phone && <label className="label-error">{formValidError.phone}</label>}
                        </div>
                        {/* <div className="form-group">
                        <label className="label">Lưu ý với người bán</label>
                        <input id="name" type="text" className="form-control bac" placeholder=""
                            value={formData.note} 
                            onChange={handleChangeFormData('note')}
                        />   
                        
                    </div> */}
                    </form>
                    <h3 className="title-cr">Thông tin đơn hàng</h3>
                    <div className="row-hh">
                        <div className="col-6 type">Phí giao hàng: </div>
                        <div className="col-6 number"><NumberFormat value={shipBill} displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row-hh">
                        <div className="col-6 type">Tổng tiền hàng: </div>
                        <div className="col-6 number"><NumberFormat value={totalPriceBill} displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>
                    <div className="row-hh total-bill">
                        <div className="col-6 type">Tổng cộng: </div>
                        <div className="col-6 number"><NumberFormat value={totalPriceBill} displayType={'text'} thousandSeparator={true} /> VND</div>
                    </div>

                    {
                        showPaypal && <PayPal total={totalPriceBill} d={{
                            nameCustomer: formData.name,
                            address: formData.address,
                            phoneNumber: formData.phone,
                            ispaid: 1
                        }} ></PayPal>
                             
                    }

                    <div className="row-hh btn-dat-hang">
                        {
                            showPaypal ? <div onClick={() => handleDatHangOnline()} className="button-dathang">CLOSE</div>
                            : <div onClick={() => handleDatHangOnline()} className="button-dathang">THANH TOÁN ONLINE</div>
                        }
                            
                    </div>
                    <div className="row-hh btn-dat-hang">
                        <div onClick={() => handleDatHangOffline()} className="button-dathang">THANH TOÁN OFLINE</div>
                        {/* <Button  nameButton="Đặt Hàng"/> */}
                    </div>
                </div >

            </div>

            <BreakSpace h="30px" />
        </div>
    );
}