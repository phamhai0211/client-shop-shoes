import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'

import vari from '../../../../assets/scss/vari.module.scss';
import Select from 'react-select'
import { getListCategoriesAsync } from '../../../../redux/actions/categoryAction';
import { getListManufacturesAsync} from '../../../../redux/actions/manufactureAction';
import { getListFragrancesAsync} from '../../../../redux/actions/fragranceAction';
import { createProductAsync } from '../../../../redux/actions/productAction';

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


function AddProduct() {

    //<< get category, manufacture, fragrance
    const categoryList = useSelector((state) => state.categories.categoryList);
   // const isLoadingCate = useSelector(state => state.categories.isLoading)
    const manufactureList = useSelector((state) => state.manufactures.manufactureList);
    //const isLoadingManu = useSelector(state => state.manufactures.isLoading)
    const fragranceList = useSelector((state) => state.fragrances.fragranceList);
    //const isLoadingFrag = useSelector(state => state.fragrances.isLoading)

    const[categoryOptions, setCategoryOptions] = useState(null)
    const[fragranceOptions, setFragranceOptions] = useState(null)
    const[manufactureOptions, setManufactureOptions] = useState(null)



    useEffect(() => {
        dispatch(getListCategoriesAsync());
        dispatch(getListManufacturesAsync());
        dispatch(getListFragrancesAsync());
        setFormData({
            ...formData,
            category: formData.category,
            manufacture: formData.manufacture,
            fragranceList: formData.fragrances
        })
    }, []);

    useEffect(() => {
       categoryList && setCategoryOptions(categoryList.map( ({id, name}) => ({value: id, label: name})));
       console.log("categoryOptions: ", categoryOptions)
    }, [categoryList]);

    useEffect(() => {
        fragranceList && setFragranceOptions(fragranceList.map( ({id, name}) => ({value: id, label: name})));
        console.log("fragranceOptions: ", fragranceOptions)
     }, [fragranceList]);

     useEffect(() => {
        manufactureList && setManufactureOptions(manufactureList.map( ({id, name}) => ({value: id, label: name})));
        console.log("manufactureOptions: ", manufactureOptions)
     }, [manufactureList]);

    //end gett category, manufacture, fragrance >>

    //<< img
    const [urlSelectedImages, setUrlSelectedImages] = useState([]);
    const [fileImgPost, setFileImgPost] = useState([])

    const handleDeleteImgRender = (index) => {
        const newI = urlSelectedImages.slice();
        newI.splice(index,1);
        console.log("splice:",newI)
        setUrlSelectedImages(newI) ;

    //   console.log("fileImgPost nnnnnnnnnn",fileImgPost)
    //   console.log("fileImgPost nnnnnnnnnn FileList",fileImgPost.File)
        // const newImgPost = fileImgPost.slice(); //not working because fileImgPost is a object not a arrray
        // newImgPost.splice(index,1);
        // console.log("splice newImgPost:",newImgPost)
        // setFileImgPost(newImgPost) ;  

        let newImgPost = {...fileImgPost};
        delete newImgPost[index]
        console.log("splice newImgPost:",newImgPost)
        setFileImgPost(newImgPost) ; 
    }


    const handleImageChange = (e) => {
        // console.log(e.target.files[])
        if (e.target.files) {
            setFileImgPost(e.target.files)

            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setUrlSelectedImages((prevImages) => prevImages.concat(filesArray));

            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
    
            console.log("e.target.files: ",e.target.files)
            console.log("Array.from(e.target.files): ", Array.from(e.target.files));
            console.log("filesArray: ", filesArray);
        }
      };
    
      const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo, index) => {
          return (
            <div className="img-product-2" key={index}>
                <img src={photo} alt="" key={photo} />
                <span className="icon-delete-img-2" onClick={()=>handleDeleteImgRender(index)}> <i class='bx bx-x-circle icon-del-img'></i></span>
            </div>
            )
        });
      };


      useEffect(() => {
        setFormData({
            ...formData,
            images: fileImgPost
        })
    },[fileImgPost]);

    //end img >>
 
    const [formData, setFormData] = useState({
        name: '',
        category: null,
        fragrances: [],
        manufacture: '',
        images: [],
        capacity: 0,
        price: 0,
        description: '', 
        
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        category: '',
        fragrances: '',
        manufacture: '',
        images: '',
        capacity: '',
        price: '',
        description: '', 
    })
    const [isValidForm, setIsValidForm] = useState(false);
    
    function handleChangeFormData(key) {
        if (key === 'category' || key === 'manufacture' || key === 'fragrances'){
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
            //console.log("Form Data: ", formData); //note
        }
    }

    useEffect(() => {
        console.log("Form Data: ", formData); //note
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
        if (!formD.category) {
            err.category = "Category is required."
        } 
        if (formD.fragrances.length === 0) {
            err.fragrances = "Fragrances is required."
        } 
        if (!formD.manufacture) {
            err.manufacture = "Manufacture is required."
        } 
        if (!formD.capacity || formD.capacity == 0) {
            err.capacity = "Capacity is required."
        } 
        if (!formD.price || formD.price == 0) {
            err.capacity = "Capacity is required."
        } 
        if (urlSelectedImages.length === 0) {
            err.images = "Images is required."
        } 
        //console.log("mmm", err)

        if (err.name || err.fragrances || err.manufacture || err.capacity || err.images || err.price) {
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
    // const errResponse = useSelector((state) => state.users.errResponse);
    // const status = useSelector((state) => state.users.status);
    const status = "oops something wrong";
    function handleSave(evt) {
        evt.preventDefault();
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid")

        const data = new FormData();
        data.append("name", formData.name);
        data.append("categoryId", formData.category.value);
        data.append("manufactureId", formData.manufacture.value);
        data.append("description", formData.description);
        data.append("capacity", formData.capacity);
        data.append("price", formData.price)
        
        for (const key of Object.keys(formData.fragrances)) {
            data.append("idFragranceList", formData.fragrances[key].value)
        }
        for (const key of Object.keys(fileImgPost)) {
            data.append("images", fileImgPost[key])
        }
        
        dispatch(createProductAsync(data))
        .then(res => {
            console.log("ok: ",res )
            if (res.ok) {
                // Thành công
                //console.log("errResponse",errResponse)
                //console.log("status",status)
                setFormData({
                    name: '',
                    category: null,
                    fragrances: [],
                    manufacture: '',
                    images: [],
                    capacity: 0,
                    price: 0,
                    description: '', 
                })
                setUrlSelectedImages([]);
                setFileImgPost([]);
                
            } else {
                // Thất bại
                console.log("status",status)
            }
        });
    }

    let history = useHistory();
    const handleCancel = () => {
        history.push("/admin/products");
    }

    return (
        <div>
            <div className="add-product-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Add Product</span>
                </h2>
                <div>
                    <form className="add-category-form" onSubmit={handleSave}>
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
                        </div>

                        <div className="row-hh">
                            <div className="col-8">
                                <div className="form-group">
                                    <label className="label">Fragrances</label>
                                    {
                                       fragranceOptions &&
                                        <Select options={fragranceOptions}
                                            isMulti={true}
                                            closeMenuOnSelect={false}
                                            className="select-hh"
                                            defaultValue={fragranceOptions[0]}
                                            placeholder="Fragrances..."
                                            menuColor="red"
                                            styles={customStylesSelect}
                                            value={formData.fragrances}
                                            onChange={handleChangeFormData('fragrances')} 
                                        />
                                    }
                                    {formValidError.fragrances && <label className="label-error">{formValidError.fragrances}</label>}
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label">Manufacture</label>
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

                        <div className="row row-img">
                            {/* <label className="label label-images" name="image">Images</label> */}
                            <input type="file" name="images" id="images" multiple hidden onChange={handleImageChange} />
                            <label htmlFor="images" className="label label-choose-img"><i class='bx bx-image-add icon-choose-img'></i>Add Image</label>
                            <div className="result">{renderPhotos(urlSelectedImages)}</div>
                            { formValidError.images &&  <label className="label-error">{formValidError.images}</label> }
                        </div>

                        <div className="row-hh">
                            <div className="col-2">
                                <div className="form-group">
                                    <label className="label">Capacity</label>
                                    <input id="capacity" type="number" className="form-control capacity" placeholder=" "
                                        value={formData.capacity}
                                        onChange={handleChangeFormData('capacity')}
                                    />
                                    {formValidError.capacity && <label className="label-error">{formValidError.capacity}</label>}
                                </div>
                            </div>
                            <div className="col-1">
                                <div className="form-group ml">(ml)</div>
                            </div>

                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label">Price</label>
                                    <input id="price" type="number" className="form-control capacity" placeholder=" "
                                        value={formData.price}
                                        onChange={handleChangeFormData('price')}
                                    />
                                    {formValidError.price && <label className="label-error">{formValidError.price}</label>}
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group ml">VND</div>
                            </div>
                        </div>

                        <div className="row-hh">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <textarea id="description" type="text" className="form-control tare" placeholder=" "
                                        value={formData.description}
                                        onChange={handleChangeFormData('description')}
                                    />
                                    {/* {formValidError.description && <label className="label-error">{formValidError.description}</label>} */}
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

export default AddProduct;
