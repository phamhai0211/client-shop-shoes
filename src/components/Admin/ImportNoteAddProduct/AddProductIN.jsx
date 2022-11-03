import "./style.scss";
import React, { useEffect, useState } from 'react'
import vari from '../../../assets/scss/vari.module.scss';
import Select from 'react-select'

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

export default function AddProductIN({ handleCancelOnclick, addProductOnclick, productOptions }) {


    const [formData, setFormData] = useState({
        productid: '',
        number: 0,
        cost: 0,
        name: '',
        images: []
    })
    const [formValidError, setFomValidError] = useState({
        productid: '',
        number: '',
        cost: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

    function handleChangeFormData(key) {
        if (key === 'productid') {
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
            console.log("kkk: ", formData); //note
        }
    }

    useEffect(() => {
        console.log("kkk22: ", formData); //note
        setFomValidError(checkValidateInput(formData));
    }, [formData]);

    function checkValidateInput(formD) {
        let err = {}
        if (!formD.productid) {
            err.productid = "Name is required."
        }
        if (!formD.number || formD.number < 0) {
            err.number = "Number >= 0."
        }
        if (!formD.cost || formD.cost < 0) {
            err.cost = "Cost >= 0."
        }
        console.log("error form: ", err)

        if (err.productid || err.number || err.cost) {
            setIsValidForm(false)
            console.log("vao falsse")
        } else {
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }

        return err;
    }

    function handleSave() {
        //evt.preventDefault();
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid nnnnn", formData)
        //dispatch(createCategoryAsync(formData));
        addProductOnclick({...formData, productid: formData.productid.value, name: formData.productid.name,  images: formData.productid.images});
        handleCancelOnclick(false)
        // setFormData({
        //     productid: '',
        //     number: 0,
        //     cost: 0
        // })
    }


    return (
        <div className="form-add-product-in-container">
            <form className="form-add-product row">
                <div className="form-group-asf">
                    <label className="label">Id Product</label>
                    {/* <input type="text" className="input name-size" 
                        value={formData.productid} 
                        onChange={handleChangeFormData('productid')} 
                    ></input> */}
                    {
                        productOptions &&
                        <Select options={productOptions}
                            className="select-hh"
                            defaultValue={productOptions[0]}
                            placeholder="id product..."
                            menuColor="red"
                            styles={customStylesSelect}
                            value={formData.productid}
                            onChange={handleChangeFormData('productid')}
                        />
                    }

                    {formValidError.productid ? <label className="label-error">{formValidError.productid}</label> : <label className="label-error non"></label>}
                </div>

                <div className="form-group-asf">
                    <label className="label">Number</label>
                    <input type="number" className="input number-size"
                        value={formData.number}
                        onChange={handleChangeFormData('number')}
                    ></input>
                    {formValidError.number ? <label className="label-error">{formValidError.number} </label> : <label className="label-error non"></label>}
                </div>

                <div className="form-group-asf">
                    <label className="label">Cost</label>
                    <input type="number" className="input cost"
                        value={formData.cost}
                        onChange={handleChangeFormData('cost')}
                    ></input>
                    {formValidError.cost ? <label className="label-error">{formValidError.cost}</label> : <label className="label-error non"></label>}
                </div>

                {/* <div className="form-group-asf btn-add-size">
                    <span className="btn-asf " onClick={() =>handleSave()}><i class='bx bxs-plus-circle btn-add-size'></i></span> 
                </div> */}
                <div className="form-group-acf-btn">
                    <span className="btn-acf " onClick={() => handleSave()}><i class='bx bxs-check-circle btn-add-size'></i></span>
                    <span className="btn-acf " onClick={() => handleCancelOnclick(false)}><i class='bx bxs-x-circle btn-x-add-size'></i></span>
                </div>
            </form>
        </div>
    )
}