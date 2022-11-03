import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'
import vari from '../../../assets/scss/vari.module.scss';
import Select from 'react-select'
//import Lightbox from 'react-image-lightbox';
//import 'react-image-lightbox/style.css';

import gender_items from '../../../assets/json/gender.json';

import LogResBgPage from '../../../components/share/LogResBgPage';
import SelectAddress from '../../../components/share/SelectAddress';
import { registerAsync } from '../../../redux/actions/authAction';

const customStylesSelect = {
    option: (provided, state) => ({
      ...provided,
      //borderBottom: '1px dotted pink',
      //color: state.isSelected ? 'red' : 'blue',
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
  
      return { ...provided, opacity, transition, fontSize:"20px" };
    }
  }

export default function Register(){
    const genderOptions = gender_items.map(({ id, name }) => ({ value: id, label: name }));
      
    const [formData, setFormData] = useState({
        name: '',
        //gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
        phone: '',
        password: '',
        email: '',
        //role: 1,
        gender: null,
        addressNo: '',
        cdw: '',
        //image: ''
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        gender: '',
        phone: '',
        password: '',
        email: '',
        //role: '',
        addressNo: '',
        //image: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);
    //const [previewImgURL, setPreviewImgURL] = useState('');
    
    function handleChangeFormData(key){ 
        if (key === 'gender'){
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
        console.log("kkk22: ",formData); //note
        setFomValidError(checkValidateInput(formData));
    },[formData]);

   
    //img
    // const handleOnChangeImage = (event) => {
    //     let dataFile = event.target.files;
    //     let file = dataFile[0];
    //     if(file){
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

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "Tên là bắt buộc."
        } else if(formD.name.length < 3){
            err.name = "Tên tối thiểu 3 ký tự!"
        }
        if(!formD.phone){
            err.phone = "Số điện thoại là bắt buộc."
        } else if(formD.phone.length < 10){
            err.phone = "Số điện thoại chưa hợp lệ."
        }
        if(!formD.password){
            err.password = "Mật khẩu là bắt buộc."
        } else if(formD.password.length < 6){
            err.password = "Mật khẩu tối thiểu 6 ký tự!"
        }
        if(!formD.email){
            err.email = "Email là bắt buộc."
        } else if(!/\S+@\S+\.\S+/.test(formD.email)){
            err.email = "Email chưa hợp lệ."
        }
        if (!formD.gender) {
            err.gender = "Mời chọn giới tính!"
        } 
        if (!formD.addressNo) {
            err.addressNo = "Số nhà/thôn/xóm là bắt buộc."
        }
        console.log("mmm",err)

         if(err.name || err.phone || err.password || err.email || err.gender || err.addressNo) {
            setIsValidForm(false)
            //err.isValidForm = false;
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;

    }

    let dispatch = useDispatch();
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
   
    function handleSaveUser(evt){
        evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
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
        // data.append("address", formData.address);
        // data.append("image", formData.image);
        //axios.post("https://httpbin.org/anything", data).then(res => console.log(res)).catch(err => console.log(err));
        
        dispatch(registerAsync({...formData, gender: formData.gender.value, address: formData.addressNo + ", "+ formData.cdw}))
        .then(res => {
            console.log("ok: ",res.ok )
            if (res.ok) {
              // Thành công
                //console.log("errResponse",errResponse)
                //console.log("status",status)
                setFormData({
                    name: '',
                        gender: null,
                        phone: '',
                        password: '',
                        email: '',          
                        addressNo: '',
                        image: ''
                })
                //setPreviewImgURL('');
                history.push("/login")
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });
     }

     let history = useHistory();
     const handleCancel = () => {
        // history.push("/admin/users");
        history.push("/");
     }

     const setAddessChoose = (data)=>{
        console.log("cdw: ",data)
        setFormData({
            ...formData,
            cdw:  data.ward + ", " + data.district + ", " + data.city
        })
    }

    return(
        <div className="register-container">
            <LogResBgPage>
               <div className="child">
                    <div className="register-title">Đăng ký</div>

                    <div className="register-content">
                        <form  className="register-form" onSubmit={handleSaveUser}>
                            <div className="row-hh">
                                <div className="col-8">
                                    <div className="form-group">
                                        <label className="label">Tên hiển thị</label>
                                        <input id="name" type="text" className="form-control" placeholder=" "  
                                            value={formData.name} 
                                            onChange={handleChangeFormData('name')} 
                                        />
                                    { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="label">Giới tính</label>
                                        <Select options={genderOptions}
                                            className="select-hh"
                                            defaultValue={genderOptions[0]}
                                            placeholder="Giới tính"
                                            menuColor = "red"
                                            styles={customStylesSelect}
                                            value={formData.gender} 
                                            onChange={handleChangeFormData('gender')} 
                                        />
    
                                    </div>
                                </div>
                            </div>

                            <div className="row-hh">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="label">Email</label>
                                        <input id="email" type="email" className="form-control" placeholder=" " 
                                            value={formData.email} 
                                            onChange={handleChangeFormData('email')} 
                                        />
                                        { formValidError.email &&  <label className="label-error">{formValidError.email}</label> }
                                    </div>
                                </div>
                            </div>
                        
                        <div className="row-hh">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="label">Số điện thoại</label>
                                        <input id="phone" type="text" className="form-control" placeholder=" " 
                                            value={formData.phone} 
                                            onChange={handleChangeFormData('phone')} 
                                        />
                                        { formValidError.phone &&  <label className="label-error">{formValidError.phone}</label> }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="label">Mật khẩu</label>
                                        <input id="password" type="password" className="form-control" placeholder=" " 
                                            value={formData.password} 
                                            onChange={handleChangeFormData('password')} 
                                        />
                                        { formValidError.password &&  <label className="label-error">{formValidError.password}</label> }
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <SelectAddress
                                    eng={true}
                                    getAddressChoose={setAddessChoose}
                                />
                            </div>

                            <div className="row-hh">
                                <div className="col-12">
                                    <div className="form-group ">
                                        <label className="label">Số nhà/ thôn</label>
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
                                        <input id="image" type="file" className="form-control "  hidden onChange={ (event) => handleOnChangeImage(event)}/>
                                        <label className="form-control choose-img" htmlFor="image"><i class='bx bx-image-add icon-choose-img'></i>Chọn ảnh</label>
                                                                                                              
                                    </div>
                                </div>       */}
                            </div>

                            <div className="form-group last">
                                <div className="btn-left"><span onClick={()=>handleCancel()}>Thoát</span></div>
                                <span className="btn-right"><button type="submit" className="form-control btn">Đăng ký</button></span>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </LogResBgPage>
        </div>
    )
}