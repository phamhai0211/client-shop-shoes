import './style.css'
import Table from '../../../../components/Admin/Table/Table'
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';
import list_user_ex from '../../../../assets/json/list_user_ex.json';

import React, {useState} from 'react'
//import { useDispatch, useSelector } from 'react-redux';
//import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
//import { getListUsersAsync, createUserAsync, deleteUserAsync } from '../../../redux/actions/userAction';

//import AddUser from '../../../components/Admin/AddNew/User/AddUser';


export default function User(){

    //let dispatch = useDispatch();

    // const userList = useSelector((state) => state.users.userList);
    const userList = list_user_ex;
    // const isLoading = useSelector(state => state.users.isLoading)
    const isLoading = false;
    // console.log("userList",userList,"isloading", isLoading);

    // useEffect(() => {
    //     dispatch(getListUsersAsync());
    // }, []);

    let history = useHistory();
    const handleDelete = (userId) => {
        if(window.confirm("Are you sure wanted to delete the user?")){
            //dispatch(deleteUserAsync(userId));
        }
    }
    const handleEdit = (userId) => {
        //history.push(`/admin/edituser/${userId}`);
        history.push("/")
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "5%"}}></th>,
        <th style={{width: "15%"}}>Name</th>,
        <th style={{width: "7%"}}>Gender</th>,
        <th style={{width: "15%"}}>Email</th>,
        <th style={{width: "11%"}}>Phone</th>,
        <th style={{width: "15%"}}>Address</th>,
        <th style={{width: "10%"}}>Role</th>,
        <th style={{width: "7%"}}>Active</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item.id}</td> */}
            {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)}
            <td>
                <div className="img-user">
                    {
                        item.image ? <img src = {process.env.REACT_APP_API_IMG + item.image} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td>
            <td>{item.name}</td>
            <td>{item.gender}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            {/* <td>{item.password}</td> */}
            <td>{item.address}</td>
            <td>{item.role}</td>
            <td>{item.isActive.toString()}</td>
            <td>
                <span onClick={()=>handleEdit(item._id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item._id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div className="admin-p">
            <h2 className="page-header">User</h2>
            {/* <AddUser/> */}
            <ToolTable
                linkAdd = "/admin/addUser"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (userList && userList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={userList}
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