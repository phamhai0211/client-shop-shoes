import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import './style.scss'
import vari from '../../../../assets/scss/vari.module.scss';
import NumberFormat from 'react-number-format';

import { getSingleOrderAsync, updateOrderStatusAsync } from '../../../../redux/actions/orderAction'
import ProductItemBuy from '../../../../components/share/ProductItemBuy';

import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';

const customStylesSelect = {
    option: (provided, state) => ({
        ...provided,
        //borderBottom: '1px dotted pink',
        //color: state.isSelected ? 'red' : 'blue',s
        //backgroundColor: state.isSelected ? 'red' : 'white',

        backgroundColor: state.isDisabled
            ? undefined
            : state.isSelected
                ? vari.selectItemChoosed
                : state.isFocused
                    ? vari.selectItemHover
                    : undefined,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition, fontSize: "20px" };
    }
}

export function detailItem(detail) {
    return <div className="detail-item">
        <div>
            <span>{detail.id.productid}vvvv{detail.number}vvvv{detail.price}vvv{detail.product.name}</span>
        </div>
    </div>
}

const shipBill = 0;

function GuestOrderDetail() {
    //const roleList = useSelector((state) => state.roles.roleList);
    const orderSingle = useSelector((state) => state.orders.orderSingle)
    //const orderDetail = useSelector((state) => state.orders.orderSingleDetail)

    const [formData, setFormData] = useState({
        importId: '',
        createday: '',
        nameEmployee: '',
        totalprice: null,
        status: null,
    })
    const [formValidError, setFomValidError] = useState({
        importId: '',
        createday: '',
        nameEmployee: '',
        totalprice: '',
        status: '',

    })
    const [isValidForm, setIsValidForm] = useState(false);
    const [startStep, setStartStep] = useState(null);

    //const[roleOptions, setRoleOptions] = useState(null)
    let dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        dispatch(getSingleOrderAsync(id))
        .then(res =>{
            if(res.ok == true){
                setStartStep(res.status)
                setStatusNow(res.status)
            }
        }
        )

    }, []);


    useEffect(() => {
        if (orderSingle) {
            setFormData({
                //importId: importNoteSingle.importId,
                createday: orderSingle.createday,
                nameEmployee: orderSingle.nameEmployee,
                nameManufacture: orderSingle.nameManufacture,
                totalprice: orderSingle.totalprice,
                //status: statusOptions.find(obj => obj.value === orderSingle.status),
                status: orderSingle.status,

            })
        }
    }, [orderSingle]);



    function handleChangeFormData(key) {
        if (key === 'role') {
            return (value) => {
                setFormData({
                    ...formData,
                    [key]: value
                })
            }
        }

        // return (evt) => {
        //     setFormData({
        //         ...formData,
        //         [key]: evt.target.value
        //     })
        //     console.log("kkk: ", formData); //note
        // }
    }


    //procces bar
    //setup the step content
    // const step1Content = <h1>Step 1 Content</h1>;
    // const step2Content = <h1>Step 2 Content</h1>;
    // const step3Content = <h1>Step 3 Content</h1>;

    const [statusNow, setStatusNow] = useState(null); 

    // setup step validators, will be called before proceeding to the next step
    function step2Validator() {
        // return a boolean
        //setStatusNow(2)
        console.log("step2Validator")
        dispatch(updateOrderStatusAsync(id,2))
        .then(res => {
            // console.log("ok: ",res.ok )
            if (res.ok) {
                setStatusNow(2);
               
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
        return true
    }
    
    function step3Validator() {
        // return a boolean
        //setStatusNow(3)
        console.log("step3Validator")
        dispatch(updateOrderStatusAsync(id,3))
        .then(res => {
            // console.log("ok: ",res.ok )
            if (res.ok) {
                setStatusNow(3);
               
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
        return true;
    }
    function step4Validator() {
        // return a boolean
        //setStatusNow(4)
        console.log("step4Validator")
        dispatch(updateOrderStatusAsync(id,4))
        .then(res => {
            // console.log("ok: ",res.ok )
            if (res.ok) {
                setStatusNow(4);
               
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
        return true;
    }
    
    function onFormSubmit() {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed4
        console.log("onFormSubmit")

    }

    function handleCancelOrder(){
        //console.log("step5Validator")
        dispatch(updateOrderStatusAsync(id,0))
        .then(res => {
            // console.log("ok: ",res.ok )
            if (res.ok) {
                setStatusNow(0);
               
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
    }

    const steps=[
        {
        label: 'Chưa xác nhận',
        //subtitle: '10%',
        name: 'step 1',
        //content: step1Content,
        in: 1
        },
        {
        label: 'Đã xác nhận',
        //subtitle: '50%',
        name: 'step 2',
        //content: step2Content,
        validator: step2Validator,
        in: 2
        },
        {
        label: 'Đang giao',
        //subtitle: '100%',
        name: 'step 3',
        //content: step3Content,
        validator: step3Validator,
        in:3
        },
        {
            label: 'Thành công',
            //subtitle: '100%',
            name: 'step 4',
            //content: step3Content,
            validator: step4Validator,
            in:4
            },
        {
            label: 'Cancel',
            //subtitle: '100%',
            name: 'step 0',
            //content: step3Content,
            //validator: step4Validator
        }
    ]
    ////////////////////end procces bar

    // let dispatch = useDispatch();
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
    //const status = "oops something wrong";
    function handleSaveUser(evt) {
        // evt.preventDefault();
       
        //     dispatch(updateOrderStatusAsync({
        //         id: id,
        //         status: statusNow
        //     }))
        //     .then(res => {
        //         if (res.ok) {
        //           // Thành công
        //             // console.log("errResponse",errResponse)

        //         } else {
        //           // Thất bại
        //           //console.log("status",status)
        //         }
        //     });
    }

    let history = useHistory();
    const handleCancel = () => {
        history.push("/sale");
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        <th style={{ width: "15%" }}>Image Product</th>,
        <th style={{ width: "15%" }}>ID Product</th>,
        <th style={{ width: "21%" }}>Name Product</th>,
        <th style={{ width: "12%" }}>Number</th>,
        <th style={{ width: "15%" }}>Price</th>,
        <th style={{ width: "18%" }}>Cost</th>,
        // <th style={{width: "12%"}}>Action</th>,
    ]
    const renderHead = (item, index) => item;

    //<span>{detail.id.productid}vvvv{detail.number}vvvv{detail.price}vvv{detail.product.name}</span>
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {console.log("image: ", process.env.REACT_APP_API_IMG, item.image)}
            <td>
                <div className="img-product">
                    {
                        item.product.images &&
                            (item.product.images.length > 0) ? <img src={process.env.REACT_APP_API_IMG + item.product.images[0].path} alt=""></img> :
                            <img src="/assets/images/avatarDefault.png" alt=""></img>
                    }
                </div>
            </td>
            <td>{item.id.productid}</td>
            <td>{item.product.name}</td>
            <td><NumberFormat value={item.number} displayType={'text'} thousandSeparator={true} /></td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND</td>
            <td><NumberFormat value={item.product.cost} displayType={'text'} thousandSeparator={true} /> VND</td>
            {/* <td>
                <span onClick={()=>handleEdit(item.importId)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item.importId)}> <i class='bx bx-trash iconDelete no'></i></span>
            </td> */}
        </tr>
    )


    return (
        orderSingle && (statusNow || statusNow === 0) && 
        <div>
            <div className="customer-order-detail-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>CHI TIẾT ĐƠN HÀNG</span>
                </h2>
                <div>
                    <form className="register-form" onSubmit={handleSaveUser}>
                        {
                            orderSingle.status == 0? '' : orderSingle.ispaid == 1 ? <div className="ispaid-true"><span>ĐÃ THANH TOÁN</span></div>
                            : <div className="ispaid-false"><span>CHƯA THANH TOÁN</span></div>
                        }

                        {
                            orderSingle.status ==  0?
                            <div className="order-cancel ispaid-false"><span>ĐƠN HÀNG ĐÃ HỦY</span></div> :
                            <div className="process-b-c">                         
                                <StepProgressBar
                                    wrapperClass='normal-process-edit'
                                    buttonWrapperClass={statusNow == 4 ? 'btn-process-step-bar no' : 'btn-process-step-bar'}
                                    nextBtnName="NEXT"
                                    startingStep={orderSingle.status}
                                    onSubmit={onFormSubmit}
                                    steps={steps}
                                /> 
                            
                                {
                                    statusNow < 3 ?
                                    <div className="container-btn-cancel" onClick={handleCancelOrder}><div className="btn-cancel">CANCEL</div></div> : ''
                                }         
                                
                            </div>
                        }

                       

                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">ID Order</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={orderSingle.idorder}
                                    //onChange={handleChangeFormData('name')}
                                    />
                                    {/* {formValidError.name && <label className="label-error">{formValidError.name}</label>} */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">CreateDay</label>
                                    <input id="email" type="text" className="form-control" placeholder=" " readonly
                                        value={orderSingle.createdate}
                                    //onChange={handleChangeFormData('email')}
                                    />
                                    {/* {formValidError.email && <label className="label-error">{formValidError.email}</label>} */}
                                </div>
                            </div>
                        </div>

                        
                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Total Price</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={orderSingle.totalprice}
                                    //onChange={handleChangeFormData('name')}
                                    />
                                    {/* <NumberFormat value={formData.totalprice} displayType={'text'} thousandSeparator={true} /> VND */}
                                    {/* {formValidError.name && <label className="label-error">{formValidError.name}</label>} */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Paid</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={orderSingle.ispaid == 0 ? "Chưa thanh toán" : "Đã thanh toán"}
                                        //onChange={handleChangeFormData('name')}
                                    />
                                    {/* <Select options={genderOptions}
                                        className="select-hh"
                                        defaultValue={genderOptions[0]}
                                        placeholder="gender..."
                                        menuColor="red"
                                        styles={customStylesSelect}
                                        value={formData.gender} 
                                        onChange={handleChangeFormData('gender')} 
                                    /> */}
                                </div>
                            </div>
                        </div>

                   
                        <div className="buy-container">
                            <span>List Detail</span>
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
                                        {orderSingle && orderSingle.product &&
                                            orderSingle.product.map(function (item, index) {
                                                return (
                                                    <ProductItemBuy
                                                        img={process.env.REACT_APP_API_IMG + item.listimages[0].path}
                                                        name={item.productName}
                                                        price={item.price}
                                                        quantity={item.number}
                                                        priceTotal={item.price * item.number}
                                                    //capacity ={item.product.capacity}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="row-hh total-price-bill">
                                        <div className="bill-border">
                                            <span className="bill-title">Tổng :  </span>
                                            <span className="bill-price"><NumberFormat value={orderSingle.totalprice} displayType={'text'} thousandSeparator={true} /> VND</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="container-right col-5">
                                    <h3 className="title-cr">Địa chỉ giao hàng</h3>
                                    <form className="form-buy-info">
                                        <div className="form-group">
                                            <label className="label">Tên người nhận hàng<span className="icon-s">*</span></label>
                                            <input id="name" type="text" className="form-control bac" placeholder=""
                                                value={orderSingle.nameCustomer}
                                                onChange={handleChangeFormData('name')}
                                            />
                                            {formValidError.name && <label className="label-error">{formValidError.name}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Địa chỉ nhận hàng<span className="icon-s">*</span></label>
                                            <input id="name" type="text" className="form-control bac" placeholder=""
                                                value={orderSingle.address}
                                                onChange={handleChangeFormData('address')}
                                            />
                                            {formValidError.address && <label className="label-error">{formValidError.address}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Số điện thoại liên lạc<span className="icon-s">*</span></label>
                                            <input id="name" type="text" className="form-control bac" placeholder=""
                                                value={orderSingle.phone}
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
                                        <div className="col-6 number"><NumberFormat value={orderSingle.totalprice} displayType={'text'} thousandSeparator={true} /> VND</div>
                                    </div>
                                    <div className="row-hh total-bill">
                                        <div className="col-6 type">Tổng cộng: </div>
                                        <div className="col-6 number"><NumberFormat value={orderSingle.totalprice + shipBill} displayType={'text'} thousandSeparator={true} /> VND</div>
                                    </div>

                                    <div className="row-hh btn-dat-hang">
                                        {/* <div onClick={()=>handleDatHang()} className="button-dathang">XÁC NHẬN ĐẶT HÀNG</div> */}
                                        {/* <Button  nameButton="Đặt Hàng"/> */}
                                    </div>
                                </div >

                            </div>
                        </div>

                        <div className="form-group last">
                            {/* <div className="btn-left"><span onClick={() => handleCancel()}>Cancel</span></div> */}
                            <span className="btn-right"><button onClick={() => handleCancel()} className="form-control btn">Cancel</button></span>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GuestOrderDetail;
