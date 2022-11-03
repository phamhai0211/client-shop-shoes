import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import './style.scss'

import { editFragranceAsync, getSingleFragranceAsync } from '../../../../redux/actions/fragranceAction';



function EditFragrance() {
 
    const [formData, setFormData] = useState({
        name: '',
        description: ''
        
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        description: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

    function handleChangeFormData(key) {
        return (evt) => {
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
            //console.log("kkk: ", formData); //note
        }
    }

    useEffect(() => {
        //console.log("kkk22: ", formData); //note
        setFomValidError(checkValidateInput(formData));
    }, [formData]);


    function checkValidateInput(formD) {
        let err = {}
        if (!formD.name) {
            err.name = "Name is required."
        } 
        // else if (formD.name.length < 3) {
        //     err.name = "Name must be more than 3 characters."
        // }
        if (!formD.description) {
            err.description = "Description is required."
        } 
        //console.log("mmm", err)

        if (err.name || err.description) {
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
    let {id} = useParams();
    //console.log("param: ", useParams())
    //console.log("param id: ", id)
    useEffect(() => {
        dispatch(getSingleFragranceAsync(id));
    }, []);
    
    const fragranceEdit = useSelector((state) => state.fragrances.fragranceSingle)

    useEffect(() => {
        if(fragranceEdit){
            setFormData({
                name: fragranceEdit.name,
                description: fragranceEdit.description
            })
        }
        }, [fragranceEdit]);
        
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
    const status = "oops something wrong";

    function handleSaveFragrance(evt) {
        evt.preventDefault();
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid")

        dispatch(editFragranceAsync({...formData, "id": id}))
        .then(res => {
            console.log("ok: ",res )
            if (res.ok) {
                // Thành công
                // setFormData({
                //     name: '',
                //     description: ''
                // })
                
            } else {
                // Thất bại
                console.log("status",status)
            }
        });
    }

    let history = useHistory();
    const handleCancel = () => {
        history.push("/admin/fragrances");
    }

    return (
        <div>
            <div className="add-box-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Edit Fragrance</span>
                </h2>
                <div>
                    <form className="edit-category-form" onSubmit={handleSaveFragrance}>
                        <div className="row-hh">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Name</label>
                                    <input id="name" type="text" className="form-control" placeholder=" "
                                        value={formData.name}
                                        onChange={handleChangeFormData('name')}
                                    />
                                    {formValidError.name && <label className="label-error">{formValidError.name}</label>}
                                </div>
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <input id="description" type="text" className="form-control" placeholder=" "
                                        value={formData.description}
                                        onChange={handleChangeFormData('description')}
                                    />
                                    {formValidError.description && <label className="label-error">{formValidError.description}</label>}
                                </div>
                            </div>
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

export default EditFragrance;
