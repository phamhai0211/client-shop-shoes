import './style.css'
import Table from '../../../../components/Admin/Table/Table'
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getListImportNotesAsync } from '../../../../redux/actions/importNoteAction';
import NumberFormat from 'react-number-format';
//import AddUser from '../../../components/Admin/AddNew/User/AddUser';


export default function ImportNote(){

    let dispatch = useDispatch();

    const employeeList = useSelector((state) => state.importNote.importNoteList);
    const isLoading = useSelector(state => state.importNote.isLoading)
    console.log("employeeList",employeeList,"isloading", isLoading);
    

    useEffect(() => {
        dispatch(getListImportNotesAsync());
    }, []);

    let history = useHistory();
    const handleDetail = (id) => {
        history.push(`/admin/import-note/detail/${id}`);
    }
    const handleEdit = (id) => {
        history.push(`/admin/import-note/${id}`);
        //history.push("/")
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        //<th style={{width: "5%"}}></th>,
        <th style={{width: "9%"}}>Id</th>,
        <th style={{width: "10%"}}>Create Day</th>,
        // <th style={{width: "20%"}}>Id Employee</th>,
        <th style={{width: "20%"}}>Employee</th>,
        <th style={{width: "14%"}}>Manufacture</th>,
        <th style={{width: "16%"}}>Total</th>,
        <th style={{width: "14%"}}>Status</th>,
        //<th style={{width: "7%"}}>Active</th>,
        <th style={{width: "12%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item.id}</td> */}
            {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)}
            {/* <td>
                <div className="img-user">
                    {
                        item.image ? <img src = {process.env.REACT_APP_API_IMG + item.image} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td> */}
            <td>{item.importId}</td>
            {/* <td>{item.gender ? "Nam" : "Nữ"}</td> */}
            <td>{item.createday}</td>
            {/* <td>{item.employee.id}</td> */}
            <td>{item.nameEmployee}</td>
            <td>{item.nameManufacture}</td>
            <td><NumberFormat value={item.totalprice} displayType={'text'} thousandSeparator={true} /> VND</td> 
            <td>{item.status === 2 ? "Nhập Thành Công" : item.status === 1 ? "Đang Xử Lý" : "Đã Xóa"}</td>     
            <td>
                {
                    item.status === 1 ?  <span onClick={()=>handleEdit(item.importId)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                    :  <span > <i class='bx bx-edit-alt iconEdit no'> </i></span>
                }
               
                <span onClick={()=>handleDetail(item.importId)}> <i class='bx bx-detail iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div className="admin-p">
            <h2 className="page-header">Import Note</h2>
            {/* <AddUser/> */}
            <ToolTable
                linkAdd = "/admin/import-note/new-import-note"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (employeeList && employeeList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={employeeList}
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