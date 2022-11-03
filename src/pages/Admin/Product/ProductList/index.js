import './style.css'
import Table from '../../../../components/Admin/Table/Table'

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { getListProductsAsync } from '../../../../redux/actions/productAction';
import ToolTable from '../../../../components/Admin/ToolTable/ToolTable';
import NumberFormat from 'react-number-format';

export default function Product(){

    let dispatch = useDispatch();

    const productList = useSelector((state) => state.products.productList);
    const isLoading = useSelector(state => state.products.isLoading)

    useEffect(() => {
        dispatch(getListProductsAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (productId) => {
        // if(window.confirm("Are you sure wanted to delete the Product?")){
        //     //dispatch(deleteProductAsync(productId));
        // }
    }
    const handleEdit = (id) => {
        history.push(`/admin/products/${id}`);
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "8%"}}>ID</th>,
        <th style={{width: "16%"}}>Name</th>,
        <th style={{width: "12%"}}>Price</th>,
        <th style={{width: "12%"}}>Cost Price</th>,
        <th style={{width: "8%"}}>Number</th>,
        <th style={{width: "12%"}}>Category</th>,
        <th style={{width: "11%"}}>Manufacture</th>,
        <th style={{width: "8%"}}>Image</th>,
        <th style={{width: "9%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND</td>
            <td><NumberFormat value={item.cost} displayType={'text'} thousandSeparator={true} /> VND</td>
            <td><NumberFormat value={item.number} displayType={'text'} thousandSeparator={true} /></td>
            <td>{item.category.name}</td>
            <td>{item.manufacture.name}</td>
            {/* {console.log("image: ",process.env.REACT_APP_API_IMG,item.images)} */}
             {/* {console.log("imageeeeeeee: ",dispatch(getImagesProductAsync(item.id)))} */}
             {console.log("imageeeeeeee: ", item.fragrances)}
            <td>
                <div className="img-product">
                    {
                        item.images &&
                        (item.images.length > 0) ? <img src = {process.env.REACT_APP_API_IMG + item.images[0].path} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td>
            <td>
                <span className="nnnn" onClick={()=>handleEdit(item.id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                {/* <span onClick={()=>handleDelete(item.id)}> <i class='bx bx-trash iconDelete'></i></span> */}
            </td>
        </tr>
    )

    return(
        <div>
            <h2 className="page-header">Product</h2>
            {/* <AddUser/> */}
            <ToolTable
                linkAdd = "/admin/products/new-product"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        {console.log("aaaaa: ", productList)}
                            {
                                isLoading ? <div>Loading...</div> : 
                                (productList && productList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={productList}
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