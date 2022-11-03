import './style.css'
import Table from '../../../../components/Admin/Table/Table'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getListCategoriesAsync, deleteCategoryAsync } from '../../../../redux/actions/categoryAction';
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';

//import AddCategory from '../../../components/Admin/AddNew/Category/AddCategory';


export default function Category(){

    let dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categories.categoryList);
    const isLoading = useSelector(state => state.categories.isLoading)
    //const categoryList = useSelector(state => state.categories.categoryList);;
    console.log("categoryList",categoryList,"isloading", isLoading);

    
    useEffect(() => {
        dispatch(getListCategoriesAsync());
        
    },[]);

    let history = useHistory();
    const handleDelete = (categoryId) => {
        if(window.confirm("Are you sure wanted to delete the category?")){
            dispatch(deleteCategoryAsync(categoryId));
        }
    }
    const handleEdit = (categoryId) => {
        history.push(`/admin/categories/${categoryId}`);
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
            <h2 className="page-header">Category</h2>
            {/* <AddCategory/> */}
            <ToolTable 
                linkAdd = "/admin/categories/new-category"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">                    
                            {
                                isLoading ? <div>Loading...</div> : 
                                (categoryList && categoryList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={categoryList}
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