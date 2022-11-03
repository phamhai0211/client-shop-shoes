import './style.css'
import Table from '../../../../components/Admin/Table/Table'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getListManufacturesAsync, deleteManufactureAsync } from '../../../../redux/actions/manufactureAction';
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

//import AddCategory from '../../../components/Admin/AddNew/Category/AddCategory';


export default function Manufacture(){

    let dispatch = useDispatch();

    const manufactureList = useSelector((state) => state.manufactures.manufactureList);
    const isLoading = useSelector(state => state.manufactures.isLoading)
    //const manufactureList = useSelector(state => state.manufactures.manufactureList);;
    console.log("manufactureList",manufactureList,"isloading", isLoading);

    
    useEffect(() => {
        dispatch(getListManufacturesAsync());
        
    },[]);

    let history = useHistory();
    const handleDelete = (manufactureId) => {
        if(window.confirm("Are you sure wanted to delete the manufacture?")){
            dispatch(deleteManufactureAsync(manufactureId));
        }
    }
    const handleEdit = (manufactureId) => {
        history.push(`/admin/manufactures/${manufactureId}`);
    }


    // eslint-disable-next-line
    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "20%"}}>Name</th>,
        <th style={{width: "20%"}}>Email</th>,
        <th style={{width: "11%"}}>Phone</th>,
        <th style={{width: "22%"}}>Address</th>,
        <th style={{width: "12%"}}>Description</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item._id}</td> */}
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{item.description}</td>
            <td>
                <span onClick={()=>handleEdit(item.id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item.id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div>
            <h2 className="page-header">Manufacture</h2>
            {/* <AddCategory/> */}
            <ToolTable 
                linkAdd = "/admin/manufactures/new-manufacture"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">                    
                            {
                                isLoading ? <div>Loading...</div> : 
                                (manufactureList && manufactureList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={manufactureList}
                                    renderBody={(item, index) => renderBody(item, index)}
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