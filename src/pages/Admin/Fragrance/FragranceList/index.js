import './style.css'
import Table from '../../../../components/Admin/Table/Table'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getListFragrancesAsync, deleteFragranceAsync } from '../../../../redux/actions/fragranceAction';
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

//import AddCategory from '../../../components/Admin/AddNew/Category/AddCategory';


export default function Fragrance(){

    let dispatch = useDispatch();

    const fragranceList = useSelector((state) => state.fragrances.fragranceList);
    const isLoading = useSelector(state => state.fragrances.isLoading)
    //const fragranceList = useSelector(state => state.fragrances.fragranceList);;
    console.log("fragranceList",fragranceList,"isloading", isLoading);

    
    useEffect(() => {
        dispatch(getListFragrancesAsync());
        
    },[]);

    let history = useHistory();
    const handleDelete = (fragranceId) => {
        if(window.confirm("Are you sure wanted to delete the fragrance?")){
            dispatch(deleteFragranceAsync(fragranceId));
        }
    }
    const handleEdit = (fragranceId) => {
        history.push(`/admin/fragrances/${fragranceId}`);
    }


    // eslint-disable-next-line
    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "25%"}}>Name</th>,
        <th style={{width: "60%"}}>Description</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item._id}</td> */}
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
                <span onClick={()=>handleEdit(item.id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item.id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div>
            <h2 className="page-header">Fragrance</h2>
            {/* <AddCategory/> */}
            <ToolTable 
                linkAdd = "/admin/fragrances/new-fragrance"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">                    
                            {
                                isLoading ? <div>Loading...</div> : 
                                (fragranceList && fragranceList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={fragranceList}
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