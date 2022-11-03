import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'

import vari from '../../../../assets/scss/vari.module.scss';
import Select from 'react-select'
import { getListManufacturesAsync } from '../../../../redux/actions/manufactureAction';
import AddProductSize from '../../../../components/Admin/ImportNoteAddProduct/AddProductIN';
import AddProductIN from '../../../../components/Admin/ImportNoteAddProduct/AddProductIN';
import NumberFormat from 'react-number-format';
import Table from '../../../../components/Admin/Table/Table';
import { getListProductsAsync, getProductByManufactureIdAsync } from '../../../../redux/actions/productAction';
import { createImportNoteAsync } from '../../../../redux/actions/importNoteAction';

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


function AddImportNote() {

    const manufactureList = useSelector((state) => state.manufactures.manufactureList);
    const productList = useSelector((state) => state.products.productList);

    const [manufactureOptions, setManufactureOptions] = useState(null)
    const [productOptions, setProductOptions] = useState(null)

    const [showAddProduct, setShowAddProduct] = useState(false)

    const [selectedManufacture, setSelectedManufacture] = useState(null);
    //product
    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleDeleteProductRender = (index) => {
        const newS = selectedProducts.slice();
        newS.splice(index, 1);
        console.log("splice:", newS)
        setSelectedProducts(newS);
    }

    const renderProducts = (source) => {
        console.log("source size: ", source);
        return source.map((p, index) => {
            return (
                <div className="size-product-item" key={index}>
                    <div>ProductID: {p.productid}</div>
                    <div>Number: <NumberFormat value={p.number} displayType={'text'} thousandSeparator={true} /></div>
                    <div>Cost: <NumberFormat value={p.cost} displayType={'text'} thousandSeparator={true} /> VND</div>
                    <span className="icon-delete-size" onClick={() => handleDeleteProductRender(index)}> <i class='bx bx-x-circle icon-del-size'></i></span>
                </div>
            )
        });
    };

    const handleAddNewProduct = (newProduct) => {
        const newS = selectedProducts.slice();
        newS.push(newProduct);
        setSelectedProducts(newS);

    }
    //end product

    useEffect(() => {
        setFormData({
            ...formData,
            products: selectedProducts
        })
    }, [selectedProducts]);

    //end p

    useEffect(() => {
        dispatch(getListManufacturesAsync());
        setFormData({
            ...formData,
            manufacture: formData.manufacture,
            products: []
        })
    }, []);

    useEffect(() => {
        if(selectedManufacture){
            dispatch(getProductByManufactureIdAsync(selectedManufacture.value));
        }
        console.log("bbbbbbbbbbb: ",selectedManufacture)
        console.log("ccccccccccc: ",productList)
        setSelectedProducts([]);
       
    }, [selectedManufacture]);

    useEffect(() => {
        if(selectedManufacture){
            productList && setProductOptions(productList.map(({ id, name, images }) => ({ value: id, label: id + " - " + name, name: name, images: images})));
            console.log("productOptions: ", productOptions)
        }
        console.log("bbbbbbbbbbb: ",selectedManufacture)
        console.log("ccccccccccc: ",productList)
       
    }, [productList]);

    useEffect(() => {
        manufactureList && setManufactureOptions(manufactureList.map(({ id, name }) => ({ value: id, label: id + " - " + name })));
        console.log("manufactureOptions: ", manufactureOptions)
    }, [manufactureList]);


    //end gett category, manufacture, fragrance >>

    const [formData, setFormData] = useState({
        manufacture: '',
        products: []
    })
    const [formValidError, setFomValidError] = useState({
        manufacture: '',
        products: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

    function handleChangeFormData(key) {
        if (key === 'manufacture') {
            return (value) => {
                setFormData({
                    ...formData,
                    [key]: value
                })
            }
        }

        return (evt) => {
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
            //console.log("Form Data: ", formData); //note
        }
    }

    useEffect(() => {
        console.log("Form Data: ", formData); //note
        setFomValidError(checkValidateInput(formData));
        setSelectedManufacture(formData.manufacture)
    }, [formData]);


    function checkValidateInput(formD) {
        let err = {}
        if (!formD.manufacture) {
            err.manufacture = "Manufacture is required."
        }
        if (formD.products.length <= 0) {
            err.products = "Please add product!"
        }
        console.log("error form: ", err)

        if (err.manufacture) {
            setIsValidForm(false)
            //err.isValidForm = false;
            //console.log("vao falsse")
        } else {
            setIsValidForm(true)
            //err.isValidForm = true;
            //console.log("vao true")
        }

        return err;

    }

    let dispatch = useDispatch();
    const status = "oops something wrong";
    function handleSave(evt) {
        evt.preventDefault();
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid")

        // const data = new FormData();
        // data.append("name", formData.name);
        // data.append("categoryId", formData.category.value);
        // data.append("manufactureId", formData.manufacture.value);
        // data.append("description", formData.description);
        // data.append("capacity", formData.capacity);

        // for (const key of Object.keys(formData.fragrances)) {
        //     data.append("idFragranceList", formData.fragrances[key].value)
        // }
        // for (const key of Object.keys(fileImgPost)) {
        //     data.append("images", fileImgPost[key])
        // }

        console.log("selectedProducts: ",selectedProducts)

        const data = selectedProducts.map((item,index)=>({
            productid: item.productid,
            price: item.cost,
            number: item.number
        }))
        dispatch(createImportNoteAsync(data))
        .then(res => {
            console.log("ok: ",res )
            if (res.ok) {
                // Thành công
                //console.log("errResponse",errResponse)
                //console.log("status",status)
                setFormData({
                    manufacture: '',
                    products: [],
                })
                

            } else {
                // Thất bại
                console.log("status",status)
            }
        });
    }

    let history = useHistory();
    const handleCancel = () => {
        history.push("/admin/import-note");
    }

    //list detail product
    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        <th style={{width: "15%"}}>Image Product</th>,
        <th style={{width: "15%"}}>ID Product</th>,
        <th style={{width: "20%"}}>Name</th>,
        <th style={{width: "15%"}}>Number</th>,
        <th style={{width: "20%"}}>Cost</th>,
        <th style={{width: "9%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    //<span>{detail.id.productid}vvvv{detail.number}vvvv{detail.price}vvv{detail.product.name}</span>
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)} */}
            <td>
                <div className="img-product">
                    {
                        item.images &&
                        (item.images.length > 0) ? <img src = {process.env.REACT_APP_API_IMG + item.images[0].path} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td>
            <td>{item.productid}</td>
            <td>{item.name}</td>
            <td><NumberFormat value={item.number} displayType={'text'} thousandSeparator={true} /></td>
            <td><NumberFormat value={item.cost} displayType={'text'} thousandSeparator={true} /> VND</td>   
              
            <td className="icon-de">
                {/* <span onClick={()=>handleEdit(item.importId)}> <i class='bx bx-edit-alt iconEdit'> </i></span> */}
                <span onClick={()=>handleDeleteProductRender(index)}> <i class='bx bx-trash iconDelete '></i></span>
            </td>
        </tr>
    )

    //end detail product

    return (
        <div>
            <div className="add-product-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Add Import Note</span>
                </h2>
                <div>
                    <form className="add-category-form" onSubmit={handleSave}>
                        {/* <div className="row-hh">
                            <div className="col-8">
                                <div className="form-group">
                                    <label className="label">Name</label>
                                    <input id="name" type="text" className="form-control" placeholder=" "
                                        value={formData.name}
                                        onChange={handleChangeFormData('name')}
                                    />
                                    {formValidError.name && <label className="label-error">{formValidError.name}</label>}
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label">Category</label>
                                    {
                                       categoryOptions &&
                                        <Select options={categoryOptions}
                                            className="select-hh"
                                            defaultValue={categoryOptions[0]}
                                            placeholder="Category..."
                                            menuColor="red"
                                            styles={customStylesSelect}
                                            //value={categoryOptions.find(obj => obj.id === selectItemChoosed.id)}
                                            value={formData.category}
                                            onChange={handleChangeFormData('category')} 
                                        />
                                    }
                                    {formValidError.category && <label className="label-error">{formValidError.category}</label>}
                                </div>
                            </div>
                        </div> */}

                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Choose Manufacture</label>
                                    {
                                        manufactureOptions &&
                                        <Select options={manufactureOptions}
                                            className="select-hh"
                                            defaultValue={manufactureOptions[0]}
                                            placeholder="Manufacture..."
                                            menuColor="red"
                                            styles={customStylesSelect}
                                            value={formData.manufacture}
                                            onChange={handleChangeFormData('manufacture')}
                                        />
                                    }
                                    {formValidError.manufacture && <label className="label-error">{formValidError.manufacture}</label>}
                                </div>
                            </div>
                        </div>

                        <div className="row-hh">    
                            {
                                selectedManufacture && 
                                <div className="col-12">
                                <div className="add-product-buy" onClick={() => setShowAddProduct(showAddProduct => !showAddProduct)}><i class='bx bx-add-to-queue icon-add-product'></i>Choose Product</div>
                                {
                                    showAddProduct && (
                                        <div>
                                            <AddProductIN
                                                addProductOnclick={handleAddNewProduct}
                                                handleCancelOnclick={setShowAddProduct}
                                                productOptions = {productOptions}
                                            />
                                        </div>)
                                }
                                {/* <div className="result-sizes">{renderProducts(selectedProducts)}</div> */}
                                {formValidError.products && <label className="label-error">{formValidError.products}</label>}
                            </div>
                            }
                           
                        </div>

                        <div className="row-hh list-detail-product">
                           <span>List Detail</span>
                           <div className="list-detail-item">
                               {console.log("aaaaa: ", selectedProducts)}
                                {
                                    selectedProducts && selectedProducts.length > 0 &&
                                    <div>
                                        <Table
                                            limit='5'
                                            headData={userTableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={selectedProducts}
                                            renderBody={(item, index, currIndexStart) => renderBody(item, index)}
                                            passChildData={setCurrIndexStart}
                                        /> 
                                    </div>
                                }
                           </div>
                           
                        </div>

                        <div className="col-12">
                            {/* <div className="icon-add-size-container" onClick={() => setShowAddProduct(showAddProduct => !showAddProduct)}>
                                {
                                    showAddProduct ?
                                        <span className="btn-clo-op-add-size "><i class='bx bxs-minus-circle ' ></i> Close Add Size</span> :
                                        <span className="btn-clo-op-add-size"><i class='bx bxs-plus-circle' ></i> Add Size</span>
                                }
                            </div> */}
                            {/* {
                                showAddProduct && (
                                    <div>
                                        <AddProductIN
                                            addProductOnclick={handleAddNewProduct}
                                            handleCancelOnclick={setShowAddProduct}
                                        />
                                    </div>)
                            }
                            <div className="result-sizes">{renderProducts(selectedProducts)}</div>
                            {formValidError.products && <label className="label-error">{formValidError.products}</label>} */}
                        </div>

                        <div className="form-group last">
                            <div className="btn-left"><span onClick={() => handleCancel()}>Cancel</span></div>
                            <div className="btn-right"><button type="submit" className="form-control btn">Save</button></div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddImportNote;