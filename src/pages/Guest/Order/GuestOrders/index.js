
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getOrdersByUserIdAsync } from '../../../redux/actions/orderAction';
import './style.scss'
import { getOrdersCustomerAsync } from '../../../../redux/actions/orderAction';



export default function GuestOrders(){
    const demo = {
        code : "DH0001",
        createdAt: "2021-09-07T10:23:45.937+00:00",
        ship: 30000,
        price_total: 300000,
        status: "CHo",
    }
    const OrdersGustItem = (item) => {
        return(
            <div className="order-gust-item-container">
                <div className="row-hh ">
                    <div className="col-1 item-ogit">{item.idorder} </div>
                    <div className="col-2 item-ogit">{item.nameCustomer} </div>
                    <div className="col-2 item-ogit">{item.createdate} </div>
                    {/* <div className="col item-ogit">{(new Date(item.createdAt)).toISOString().slice(0,10)} </div> */}
                    {/* <div className="col item-ogit"><NumberFormat value={item.ship}  displayType={'text'} thousandSeparator={true} /> VND </div>
                    <div className="col item-ogit"><NumberFormat value={item.price_total}  displayType={'text'} thousandSeparator={true} /> VND </div> */}
                    <div className="col-2 item-ogit"><NumberFormat value={item.totalprice}  displayType={'text'} thousandSeparator={true} /> VND</div>
                    <div className="col-2 item-ogit"><span className="">{item.ispaid === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</span></div>
                    <div className="col-2 item-ogit"><span className="done">{item.status === 1 ? "Chưa xác nhận" : item.status === 2 ? "Đã xác nhận" : item.status === 3 ?"Đang giao": item.status === 4? "Thành công": "Đã Xóa"}</span></div>
                    <div className="col-1 item-ogit last" onClick={()=>handleEdit(item.idorder)}><span><i class='bx bx-link-external iconEdit'></i></span></div>   
                       
                </div>
            </div>
        )
    }

    let history = useHistory();
    const handleEdit = (id) => {
        console.log("id:  : ",id)
        history.push(`/orders-/${id}`);
    }

    /////////////
    const ordersOfUser = useSelector((state) => state.orders.ordersOfUser);
    let {customerId} = useParams();
    let dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getOrdersCustomerAsync(customerId));
    },[])

    return(
        <div className="gust-orders-container">
            <h3 className="title">Danh sách đơn hàng</h3>
            <div className="row-hh header-row">
                <div className="col-1">Mã ĐH</div>
                <div className="col-2">Tên Người Nhận</div>
                <div className="col-2">Ngày Đặt</div>
                {/* <div className="col">Phí Giao Hàng</div> */}
                <div className="col-2">Tổng Tiền hàng</div>
                {/* <div className="col">Tổng Hóa Đơn</div> */}
                <div className="col-2">TT Thanh toán</div>
                <div className="col-2">Trạng Thái</div>
                <div className="col-1"></div>
                {/* <div className="col" onClick={()=>handleEdit(item._id)}><span><i class='bx bx-edit-alt iconEdit'> </i></span></div>            */}
            </div>

            <div className="orders-list-container">
                {
                    ordersOfUser ? ordersOfUser.map((item,index) =>
                        OrdersGustItem(item)
                    )
                    : <div></div>
                }
            </div>

        </div>
    )
}