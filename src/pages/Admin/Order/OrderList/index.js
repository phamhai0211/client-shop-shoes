import './style.css'
import Table from '../../../../components/Admin/Table/Table'
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { getListOrdersAsync } from '../../../../redux/actions/orderAction';

export default function Order(){

    let dispatch = useDispatch();

    const orderList = useSelector((state) => state.orders.orderList);
    const isLoading = useSelector(state => state.orders.isLoading)
    console.log("orderList",orderList,"isloading", isLoading);
    

    useEffect(() => {
        dispatch(getListOrdersAsync());
    }, []);

    let history = useHistory();
    const handleDetail = (id) => {
        history.push(`/admin/orders/detail/${id}`);
    }
    const handleEdit = (id) => {
        history.push(`/admin/orders/${id}`);
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        <th style={{width: "7%"}}>Id</th>,
        <th style={{width: "10%"}}>Create Day</th>,
        <th style={{width: "11%"}}>Id Customer</th>,
        <th style={{width: "16%"}}>Email Customer</th>,
        <th style={{width: "12%"}}>Employee</th>,
        <th style={{width: "14%"}}>Total</th>,
        <th style={{width: "6%"}}>Paid</th>,
        <th style={{width: "12%"}}>Status</th>,
        <th style={{width: "8%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item.id}</td> */}
            {/* {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)} */}
            {/* <td>
                <div className="img-user">
                    {
                        item.image ? <img src = {process.env.REACT_APP_API_IMG + item.image} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td> */}
            <td>{item.idorder}</td>
            <td>{item.createdate}</td>
            <td>{item.customer.id}</td>
            <td>{item.customer.email}</td>
            <td>{item.employee ? item.employee.name : ""}</td>
            <td><NumberFormat value={item.totalprice} displayType={'text'} thousandSeparator={true} /> VND</td> 
            <td>{item.ispaid === 1 ? "True" : "False"}</td>
            <td>{item.status === 1 ? "Chưa xác nhận" : item.status === 2 ? "Đã xác nhận" : item.status === 3 ?"Đang giao": item.status === 4? "Thành công": "Đã Xóa"}</td>     
            <td>
                {
                    (item.status < 4  && item.status > 0)?  <span onClick={()=>handleEdit(item.idorder)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                    :  <span > <i class='bx bx-edit-alt iconEdit no'> </i></span>
                }
               
                <span onClick={()=>handleDetail(item.idorder)}> <i class='bx bx-detail iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div className="admin-p">
            <h2 className="page-header">Order</h2>
            {/* <AddUser/> */}
            {/* <ToolTable linkAdd = "/admin/order/new"/> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (orderList && orderList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={orderList}
                                    renderBody={(item, index, currIndexStart) => renderBody(item, index)}
                                    passChildData={setCurrIndexStart}
                                /> 
                                </div>
                                : <div>Data is empty</div>
                            }                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}