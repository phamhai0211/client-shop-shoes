import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import Table from '../../../../components/Admin/Table/Table'
import './style.scss'
import vari from '../../../../assets/scss/vari.module.scss';
import Select from 'react-select'
import NumberFormat from 'react-number-format';

//import { getListRolesAsync } from '../../../../redux/actions/roleAction';
import { getSingleImportNoteAsync, getSingleImportNoteDetailAsync } from '../../../../redux/actions/importNoteAction';
//import status_items from '../../../assets/json/status_import_note.json';

//const genderOptions = status_items.map(({ id, name }) => ({ value: id, label: name }));
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

export function detailItem(detail){
 return <div className="detail-item">
     <div>
        <span>{detail.id.productid}vvvv{detail.number}vvvv{detail.price}vvv{detail.product.name}</span>
     </div>
 </div>
}


function ImportNoteDetail() {
    //const roleList = useSelector((state) => state.roles.roleList);
    const importNoteSingle = useSelector((state) => state.importNote.importNoteSingle)
    const importNoteDetail = useSelector((state) => state.importNote.importNoteSingleDetail)

    const [formData, setFormData] = useState({
        importId: '',
        createday: '',
        nameManufacture: '',
        nameEmployee: '',
        totalprice: null,
        status: null,        
    })
    const [formValidError, setFomValidError] = useState({
        importId: '',
        createday: '',
        nameManufacture: '',
        nameEmployee: '',
        totalprice: '',
        status: '',    
       
    })
    const [isValidForm, setIsValidForm] = useState(false);

    //const[roleOptions, setRoleOptions] = useState(null)
    let dispatch = useDispatch();
    let {id} = useParams();
    useEffect(() => {
        dispatch(getSingleImportNoteAsync(id));
        dispatch(getSingleImportNoteDetailAsync(id));
        // setFormData({
        //     ...formData,
        //     role: formData.role,
        // })
        
    }, []);


    useEffect(() => {
        if(importNoteSingle){
            setFormData({
                importId: importNoteSingle.importId,
                createday: importNoteSingle.createday,
                nameEmployee: importNoteSingle.nameEmployee,
                nameManufacture: importNoteSingle.nameManufacture,
                totalprice: importNoteSingle.totalprice,
                //status: statusOptions.find(obj => obj.value === importNoteSingle.status),
                status: importNoteSingle.status,
                
            })
        }
        }, [importNoteSingle]);



    function handleChangeFormData(key) {
        if (key === 'role'){
            return (value) =>{
                setFormData({
                    ...formData,
                    [key]: value
                })
            }
        }

        // return (evt) => {
        //     setFormData({
        //         ...formData,
        //         [key]: evt.target.value
        //     })
        //     console.log("kkk: ", formData); //note
        // }
    }

    // useEffect(() => {
    //     console.log("kkk22: ", formData); //note
    //     setFomValidError(checkValidateInput(formData));
    // }, [formData]);

    // function checkValidateInput(formD) {
    //     let err = {}
    //     if (!formD.name) {
    //         err.name = "Name is required."
    //     } else if (formD.name.length < 3) {
    //         err.name = "Name must be more than 3 characters."
    //     }
    //     if (!formD.phone) {
    //         err.phone = "Phone is required."
    //     } else if (formD.phone.length < 10) {
    //         err.phone = "Phone must be more than 10 characters."
    //     }
    //     if (!formD.password) {
    //         err.password = "Password is required."
    //     } else if (formD.password.length < 6) {
    //         err.password = "Password must be more than 6 characters."
    //     }
    //     if (!formD.email) {
    //         err.email = "Email is required."
    //     } else if (!/\S+@\S+\.\S+/.test(formD.email)) {
    //         err.email = "Email is invalid."
    //     }
    //     if (!formD.role) {
    //         err.role = "Role is required."
    //     } 
    //     if (!formD.gender) {
    //         err.gender = "Gender is required."
    //     } 
    //     if (!formD.addressNo) {
    //         err.addressNo = "Address is required."
    //     }
    //     console.log("mmm", err)

    //     if (err.name || err.phone || err.password || err.email || err.addressNo) {
    //         setIsValidForm(false)
    //         //err.isValidForm = false;
    //         console.log("vao falsse")
    //     } else {
    //         setIsValidForm(true)
    //         //err.isValidForm = true;
    //         console.log("vao true")
    //     }

    //     return err;

    // }

    // let dispatch = useDispatch();
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
    //const status = "oops something wrong";
    function handleSaveUser(evt) {
        // evt.preventDefault();
        // console.log("check save onclick",{...formData, gender: formData.gender.value, role: formData.role.value, address: formData.addressNo + ", "+ formData.cdw} )
        // //if (!isValidForm) return;

        // console.log("check valid")
        //     const roleNew = {
        //         role: formData.role.value, 
        //         name: formData.role.label
        //     }
        //     // const Account = {
        //     //     email: employeeEdit.email,
        //     //     password: employeeEdit.password,
        //     //     role: roleNew
        //     // }
        //     dispatch(editRoleEmployeeAsync({...employeeEdit.account, role: roleNew}))
        //     .then(res => {
        //         console.log("ok 1: ",{...employeeEdit.account, role: roleNew} )
        //         console.log("ok: ",res.ok )
        //         if (res.ok) {
        //           // Thành công
        //             // console.log("errResponse",errResponse)
        //             // console.log("status",status)
        //             // setFormData({
        //             //     name: '',
        //             //     gender: null,
        //             //     phone: '',
        //             //     password: '',
        //             //     email: '',
        //             //     role: null,           
        //             //     addressNo: '',
        //             //     image: ''
        //             // })
                   
        //         } else {
        //           // Thất bại
        //           //console.log("status",status)
        //         }
        //     });
    }

    let history = useHistory();  
    const handleCancel = () => {
        history.push("/admin/import-note");
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        <th style={{width: "16%"}}>Image Product</th>,
        <th style={{width: "15%"}}>ID Product</th>,
        <th style={{width: "20%"}}>Name Product</th>,
        <th style={{width: "11%"}}>Number</th>,
        <th style={{width: "17%"}}>Cost Now</th>,
        <th style={{width: "17%"}}>Cost AVG</th>,
        // <th style={{width: "12%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    //<span>{detail.id.productid}vvvv{detail.number}vvvv{detail.price}vvv{detail.product.name}</span>
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)}
            <td>
                <div className="img-product">
                    {
                        item.product.images &&
                        (item.product.images.length > 0) ? <img src = {process.env.REACT_APP_API_IMG + item.product.images[0].path} alt=""></img> :
                        <img src = "/assets/images/avatarDefault.png" alt=""></img>
                    }     
                </div>
            </td>
            <td>{item.id.productid}</td>
            <td>{item.product.name}</td>
            <td><NumberFormat value={item.number} displayType={'text'} thousandSeparator={true} /></td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND</td>   
            <td><NumberFormat value={item.product.cost} displayType={'text'} thousandSeparator={true} /> VND</td>   
            {/* <td>
                <span onClick={()=>handleEdit(item.importId)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item.importId)}> <i class='bx bx-trash iconDelete no'></i></span>
            </td> */}
        </tr>
    )


    return (
        <div>
            <div className="import-note-detail-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>ImportNote Detail</span>
                </h2>
                <div>
                    <form className="register-form" onSubmit={handleSaveUser}>
                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">ID ImportNote</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={formData.importId}
                                        //onChange={handleChangeFormData('name')}
                                    />
                                    {/* {formValidError.name && <label className="label-error">{formValidError.name}</label>} */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">CreateDay</label>
                                    <input id="email" type="email" className="form-control" placeholder=" " readonly
                                        value={formData.createday}
                                        //onChange={handleChangeFormData('email')}
                                    />
                                    {/* {formValidError.email && <label className="label-error">{formValidError.email}</label>} */}
                                </div>
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Employee</label>
                                    <input id="email" type="email" className="form-control" placeholder=" " readonly
                                        value={formData.nameEmployee}
                                        //onChange={handleChangeFormData('email')}
                                    />
                                    {/* {formValidError.email && <label className="label-error">{formValidError.email}</label>} */}
                                </div>
                            </div>
                            <div className="col-6">
                            <div className="form-group">
                                    <label className="label">Manufacture</label>
                                    <input id="email" type="email" className="form-control" placeholder=" " readonly
                                        value={formData.nameManufacture}
                                        //onChange={handleChangeFormData('email')}
                                    />
                                    {/* {formValidError.email && <label className="label-error">{formValidError.email}</label>} */}
                                </div>
                                
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Total Price</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={formData.totalprice}
                                        //onChange={handleChangeFormData('name')}
                                    />
                                    {/* <NumberFormat value={formData.totalprice} displayType={'text'} thousandSeparator={true} /> VND */}
                                    {/* {formValidError.name && <label className="label-error">{formValidError.name}</label>} */}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Status</label>
                                    <input id="name" type="text" className="form-control" placeholder=" " readonly
                                        value={formData.status === 0 ? "Đã Xóa" : formData.status === 1 ? "Đang Xử Lý" : "Nhập Thành Công"}
                                        //onChange={handleChangeFormData('name')}
                                    />
                                    {/* <Select options={genderOptions}
                                        className="select-hh"
                                        defaultValue={genderOptions[0]}
                                        placeholder="gender..."
                                        menuColor="red"
                                        styles={customStylesSelect}
                                        value={formData.gender} 
                                        onChange={handleChangeFormData('gender')} 
                                    /> */}
                                </div>
                            </div>
                        </div>

                       
                        {/* <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <div>
                                        <label className="label">Role</label>
                                        {
                                            roleOptions && 
                                            <Select options={roleOptions}
                                                className="select-hh"
                                                defaultValue={roleOptions[0]}
                                                placeholder="role..."
                                                menuColor="red"
                                                styles={customStylesSelect}
                                                value={formData.role} 
                                                onChange={handleChangeFormData('role')} 
                                            />
                                        } */}
                                        {/* {formValidError.role && <label className="label-error">{formValidError.role}</label>} */}
                                     {/* </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="row-hh list-detail-product">
                           <span>List Detail</span>
                           <div className="list-detail-item">
                                {
                                    importNoteDetail &&
                                    <div>
                                        <Table
                                            limit='5'
                                            headData={userTableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={importNoteDetail}
                                            renderBody={(item, index, currIndexStart) => renderBody(item, index)}
                                            passChildData={setCurrIndexStart}
                                        /> 
                                    </div>
                                }
                           </div>
                           
                        </div>

                        <div className="form-group last">
                            {/* <div className="btn-left"><span onClick={() => handleCancel()}>Cancel</span></div> */}
                            <span className="btn-right"><button onClick={() => handleCancel()} className="form-control btn">Cancel</button></span>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImportNoteDetail;
