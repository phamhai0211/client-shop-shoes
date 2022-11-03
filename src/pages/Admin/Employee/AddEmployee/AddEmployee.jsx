import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'
import vari from '../../../../assets/scss/vari.module.scss';
import Select from 'react-select'
import SelectAddress from '../../../../components/share/SelectAddress';

import gender_items from '../../../../assets/json/gender.json';

import { getListRolesAsync } from '../../../../redux/actions/roleAction';
import { createEmployeeAsync } from '../../../../redux/actions/employeeAction';

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


function AddEmployee() {
    const genderOptions = gender_items.map(({ id, name }) => ({ value: id, label: name }));
    //const roleOptions = role_items.map(({ id, name }) => ({ value: id, label: name }));
    const roleList = useSelector((state) => state.roles.roleList);

    const[roleOptions, setRoleOptions] = useState(null)
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListRolesAsync());
        setFormData({
            ...formData,
            role: formData.role,
        })
    }, []);

    useEffect(() => {
        roleList && setRoleOptions(roleList.map( ({role, name}) => ({value: role, label: name})));
        console.log("roleOptions: ", roleOptions)
     }, [roleList]);

    const [formData, setFormData] = useState({
        name: '',
        //gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
        phone: '',
        password: '',
        email: '',
        role: null,
        gender: null,
        addressNo: '',
        cdw: ''
        //image: ''
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        gender: '',
        phone: '',
        password: '',
        email: '',
        role: '',
        active: '',
        addressNo: '',
        //image: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);
    //const [previewImgURL, setPreviewImgURL] = useState('');



    function handleChangeFormData(key) {
        if (key === 'role' || key === 'gender'){
            return (value) =>{
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
            console.log("kkk: ", formData); //note
        }
    }

    useEffect(() => {
        console.log("kkk22: ", formData); //note
        setFomValidError(checkValidateInput(formData));
    }, [formData]);


    //img
    // const handleOnChangeImage = (event) => {
    //     let dataFile = event.target.files;
    //     let file = dataFile[0];
    //     if (file) {
    //         //let objectUrl = URL.createObjectURL(file);
    //         let objectUrl = URL.createObjectURL(file)
    //         setPreviewImgURL(objectUrl);
    //     }
    //     setFormData({
    //         ...formData,
    //         image: file
    //     })

    // }

    //end img

    function checkValidateInput(formD) {
        let err = {}
        if (!formD.name) {
            err.name = "Name is required."
        } else if (formD.name.length < 3) {
            err.name = "Name must be more than 3 characters."
        }
        if (!formD.phone) {
            err.phone = "Phone is required."
        } else if (formD.phone.length < 10) {
            err.phone = "Phone must be more than 10 characters."
        }
        if (!formD.password) {
            err.password = "Password is required."
        } else if (formD.password.length < 6) {
            err.password = "Password must be more than 6 characters."
        }
        if (!formD.email) {
            err.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(formD.email)) {
            err.email = "Email is invalid."
        }
        if (!formD.role) {
            err.role = "Role is required."
        } 
        if (!formD.gender) {
            err.gender = "Gender is required."
        } 
        if (!formD.addressNo) {
            err.addressNo = "Address is required."
        }
        console.log("mmm", err)

        if (err.name || err.phone || err.password || err.email || err.addressNo || err.gender) {
            setIsValidForm(false)
            //err.isValidForm = false;
            console.log("vao falsse")
        } else {
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }

        return err;

    }

    // let dispatch = useDispatch();
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
    //const status = "oops something wrong";
    function handleSaveUser(evt) {
        evt.preventDefault();
        console.log("check save onclick",{...formData, gender: formData.gender.value, role: formData.role.value, address: formData.addressNo + ", "+ formData.cdw} )
        if (!isValidForm) return;

        console.log("check valid")
        //dispatch(createUserAsync(formData));

        // const data = new FormData();
        // data.append("name", formData.name);
        // data.append("email", formData.email);
        // data.append("password", formData.password);
        // data.append("gender", formData.gender);
        // data.append("phone", formData.phone);
        // data.append("role", formData.role);
        // data.append("active", formData.active);
        // data.append("addressNo", formData.addressNo);
        // data.append("image", formData.image);
        //axios.post("https://httpbin.org/anything", data).then(res => console.log(res)).catch(err => console.log(err));


            dispatch(createEmployeeAsync({...formData, gender: formData.gender.value, role: formData.role.value, address: formData.addressNo + ", "+ formData.cdw}))
            .then(res => {
                console.log("ok: ",res.ok )
                if (res.ok) {
                  // Thành công
                    // console.log("errResponse",errResponse)
                    // console.log("status",status)
                    setFormData({
                        name: '',
                        gender: null,
                        phone: '',
                        password: '',
                        email: '',
                        role: null,           
                        addressNo: '',
                        image: ''
                    })
                    //setPreviewImgURL('');

                } else {
                  // Thất bại
                  //console.log("status",status)
                }
            });
    }

    let history = useHistory();  
    const handleCancel = () => {
        history.push("/admin/employees");
    }

    const setAddessChoose = (data)=>{
        console.log("cdw: ",data)
        setFormData({
            ...formData,
            cdw:  data.ward + ", " + data.district + ", " + data.city
        })
    }

    return (
        <div>
            <div className="add-box-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Add Employee</span>
                </h2>
                <div>
                    <form className="register-form" onSubmit={handleSaveUser}>
                        <div className="row-hh">
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
                                    <label className="label">Gender</label>
                                    <Select options={genderOptions}
                                        className="select-hh"
                                        defaultValue={genderOptions[0]}
                                        placeholder="gender..."
                                        menuColor="red"
                                        styles={customStylesSelect}
                                        value={formData.gender} 
                                        onChange={handleChangeFormData('gender')} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-8">
                                <div className="form-group">
                                    <label className="label">Email</label>
                                    <input id="email" type="email" className="form-control" placeholder=""
                                        value={formData.email}
                                        onChange={handleChangeFormData('email')}
                                    />
                                    {formValidError.email && <label className="label-error">{formValidError.email}</label>}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
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
                                    }
                                     {formValidError.role && <label className="label-error">{formValidError.role}</label>}
                                </div>
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Phone Number</label>
                                    <input id="phone" type="text" className="form-control" placeholder=" "
                                        value={formData.phone}
                                        onChange={handleChangeFormData('phone')}
                                    />
                                    {formValidError.phone && <label className="label-error">{formValidError.phone}</label>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Password</label>
                                    <input id="password" type="password" className="form-control" placeholder=" "
                                        value={formData.password}
                                        onChange={handleChangeFormData('password')}
                                    />
                                    {formValidError.password && <label className="label-error">{formValidError.password}</label>}
                                </div>
                            </div>
                        </div>

                        {/* <div className="row-hh">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Role</label>
                                    <Select options={roleOptions}
                                        className="select-hh"
                                        defaultValue={roleOptions[0]}
                                        placeholder="Role"
                                        menuColor="red"
                                        styles={customStylesSelect}
                                    // value={formData.gender} 
                                    // onChange={handleChangeFormData('gender')} 
                                    />
                                </div>
                            </div>
                          
                        </div> */}

                        <div className="">
                            <SelectAddress
                                eng={true}
                                getAddressChoose={setAddessChoose}
                            />
                        </div>

                        <div className="row-hh">
                            <div className="col-12">
                                <div className="form-group ">
                                    <label className="label">No/ hamlet</label>
                                    <textarea type="text" className="form-control addressNo-user" placeholder=" "
                                        value={formData.addressNo}
                                        onChange={handleChangeFormData('addressNo')}
                                    />
                                    {formValidError.addressNo && <label className="label-error">{formValidError.addressNo}</label>}
                                </div>
                            </div>
                            {/* <div className="col-4">
                                <div className="form-group avatar-input">
                                    <label className="label" name="image">Ảnh đại diện</label>
                                    <div className="preview-img"><img src={previewImgURL} alt=""></img></div>
                                    <input id="image" type="file" className="form-control " hidden onChange={(event) => handleOnChangeImage(event)} />
                                    <label className="form-control choose-img" htmlFor="image"><i class='bx bx-image-add icon-choose-img'></i>Chọn ảnh</label>

                                </div>
                            </div> */}
                        </div>

                        <div className="form-group last">
                            <div className="btn-left"><span onClick={() => handleCancel()}>Cancel</span></div>
                            <span className="btn-right"><button type="submit" className="form-control btn">Save</button></span>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;
