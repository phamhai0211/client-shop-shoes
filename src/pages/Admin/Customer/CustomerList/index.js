import './style.css'
import Table from '../../../../components/Admin/Table/Table'
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getListCustomersAsync} from '../../../../redux/actions/customerAction';

//import AddUser from '../../../components/Admin/AddNew/User/AddUser';


export default function Customer(){

    let dispatch = useDispatch();

    const customerList = useSelector((state) => state.customers.customerList);
    const isLoading = useSelector(state => state.customers.isLoading)
    console.log("customerList",customerList,"isloading", isLoading);
    

    useEffect(() => {
        dispatch(getListCustomersAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (userId) => {
        // if(window.confirm("Are you sure wanted to delete the user?")){
        //     //dispatch(deleteUserAsync(userId));
        // }
    }
    const handleEdit = (id) => {
        //history.push(`/admin/customers/${id}`);
        //history.push("/")
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        //<th style={{width: "5%"}}></th>,
        <th style={{width: "16%"}}>Name</th>,
        <th style={{width: "8%"}}>Gender</th>,
        <th style={{width: "24%"}}>Email</th>,
        <th style={{width: "11%"}}>Phone</th>,
        <th style={{width: "26%"}}>Address</th>,
        <th style={{width: "10%"}}>Role</th>,
        // <th style={{width: "12%"}}>Action</th>,
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
            <td>{item.name}</td>
            <td>{item.gender ? "Nam" : "Nữ"}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            {/* <td>{item.password}</td> */}
            <td>{item.address}</td>
            <td>{item.account.role.name}</td>
            {/* <td>
                <span onClick={()=>handleEdit(item.id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item.id)}> <i class='bx bx-trash iconDelete no'></i></span>
            </td> */}
        </tr>
    )

    return(
        <div className="admin-p">
            <h2 className="page-header">Customer</h2>
            {/* <AddUser/> */}
            {/* <ToolTable
                linkAdd = "/admin/customers/new-customer"
            /> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (customerList && customerList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={customerList}
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