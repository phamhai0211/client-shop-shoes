import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import './style.scss'

import vari from '../../../../assets/scss/vari.module.scss';
import Select from 'react-select'
import { getListCategoriesAsync } from '../../../../redux/actions/categoryAction';
import { getListManufacturesAsync} from '../../../../redux/actions/manufactureAction';
import { getListFragrancesAsync} from '../../../../redux/actions/fragranceAction';
import { createProductAsync, editProductAsync, getSingleProductAsync } from '../../../../redux/actions/productAction';

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


function EditProduct() {

    //<< get category, manufacture, fragrance, pe
    let dispatch = useDispatch();
    let {id} = useParams();
    useEffect(() => {
        dispatch(getListCategoriesAsync());
        dispatch(getListManufacturesAsync());
        dispatch(getListFragrancesAsync());
        dispatch(getSingleProductAsync(id));
    }, []);

    const categoryList = useSelector((state) => state.categories.categoryList);
    const manufactureList = useSelector((state) => state.manufactures.manufactureList);
    const fragranceList = useSelector((state) => state.fragrances.fragranceList);
    const productEdit = useSelector((state) => state.products.productSingle)

    const[categoryOptions, setCategoryOptions] = useState(null)
    const[fragranceOptions, setFragranceOptions] = useState(null)
    const[manufactureOptions, setManufactureOptions] = useState(null)

    useEffect(() => {
       categoryList && setCategoryOptions(categoryList.map( ({id, name}) => ({value: id, label: name})));
       //console.log("categoryOptions: ", categoryOptions)
    }, [categoryList]);

    useEffect(() => {
        fragranceList && setFragranceOptions(fragranceList.map( ({id, name}) => ({value: id, label: name})));
        //console.log("fragranceOptions: ", fragranceOptions)
     }, [fragranceList]);

     useEffect(() => {
        manufactureList && setManufactureOptions(manufactureList.map( ({id, name}) => ({value: id, label: name})));
        //console.log("manufactureOptions: ", manufactureOptions)
     }, [manufactureList]);

    //end gett category, manufacture, fragrance, pe >>


    const [formData, setFormData] = useState({
        name: '',
        category: null,
        fragrances: [],
        manufacture: null,
        images: [],
        capacity: 0,
        price: 0,
        description: '', 
        imagesadd: []
    })
    
    useEffect(() => {
        console.log("productEdit",productEdit)
        if(productEdit && categoryOptions && manufactureOptions){
            const lf = productEdit.fragrances.map( ({id, name}) => ({value: id, label: name}))
            setFormData({
                name: productEdit.name,
                category: categoryOptions.find(obj => obj.value === productEdit.category.id),
                manufacture: manufactureOptions.find(obj => obj.value === productEdit.manufacture.id),
                fragrances: lf,
                images: productEdit.images,
                capacity: productEdit.capacity,
                price: productEdit.price,
                description: productEdit.description
            })
        }
        }, []);


    useEffect(() => {
        console.log("productEdit",productEdit)
        if(productEdit && categoryOptions && manufactureOptions){
            const lf = productEdit.fragrances.map( ({id, name}) => ({value: id, label: name}))
            setFormData({
                name: productEdit.name,
                category: categoryOptions.find(obj => obj.value === productEdit.category.id),
                manufacture: manufactureOptions.find(obj => obj.value === productEdit.manufacture.id),
                fragrances: lf,
                images: productEdit.images,
                capacity: productEdit.capacity,
                price: productEdit.price,
                description: productEdit.description
            })
        }
        }, [productEdit]);


    //img edit <<
    const renderPhotos_PE = (source) => {
        //console.log("source: ", source);
        return source.map((img, index) => {
          return (
            <div className="img-product-2" key={index}>
                <img src={process.env.REACT_APP_API_IMG + img.path} alt="" key={img} />
                <span className="icon-delete-img-2" onClick={()=>handleDeleteImgRender_PE(index)}> <i class='bx bx-x-circle icon-del-img'></i></span>
            </div>
            )
        });
      };

      const handleDeleteImgRender_PE = (index) => {
        const newI = formData.images.slice();
        newI.splice(index,1);
        //console.log("splice:",newI)
        //setUrlSelectedImages(newI) ;
        setFormData({
            ...formData,
            images: newI
        })
    }


    //end img edit >>

    //<< img add
    const [urlSelectedImages, setUrlSelectedImages] = useState([]);
    const [fileImgPost, setFileImgPost] = useState([])

    const handleDeleteImgRender = (index) => {
        const newI = urlSelectedImages.slice();
        newI.splice(index,1);
        console.log("splice:",newI)
        setUrlSelectedImages(newI) ;

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
        console.log("fileImgPost:",fileImgPost)
        setFormData({
            ...formData,
            imagesadd: fileImgPost
        })
    },[fileImgPost]);

    //end img add>>
 
    
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
            err.price = "Price is required."
        } 
        // if (formData.images.length == 0 && fileImgPost.length == 0) {
        //     err.images = "Images is required."
        // } 
        if (formData.images.length == 0 && urlSelectedImages.length == 0) {
            err.images = "Images is required."
        } 
        //console.log("mmm", err)

        if (err.name || err.fragrances || err.manufacture || err.capacity || err.price) {
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



    const status = "oops something wrong";
    function handleSave(evt) {
        evt.preventDefault();
        console.log("check save onclick")
        if (!isValidForm) return;

        console.log("check valid")

        const data = new FormData();
        data.append("id", id);
        data.append("name", formData.name);
        data.append("categoryId", formData.category.value);
        data.append("manufactureId", formData.manufacture.value);
        data.append("description", formData.description);
        data.append("capacity", formData.capacity);
        data.append("price", formData.price);
       
        for (const key of Object.keys(formData.fragrances)) {
            data.append("idFragranceList", formData.fragrances[key].value)
        }
        if(formData.images.length > 0){
            for (const key of Object.keys(formData.images)) {
                data.append("idImagesDefaultNew", formData.images[key].id)
                //console.log("imagesList",formData.images[key].id)
            }
        }
        else {
            data.append("idImagesDefaultNew", [])
        }
        
        console.log("fileImgPost",fileImgPost)
        if(fileImgPost.length != 0){
            for (const key of Object.keys(fileImgPost)) {
                data.append("imagesAdd", fileImgPost[key])
                
            }
        }
        else {
            data.append("imagesAdd", [])
        }
        
        console.log("dataaaaaaaaa: ",data)
        dispatch(editProductAsync(id, data))
        .then(res => {
            console.log("ok: ",res )
            if (res.ok) {
                // Thành công
                //console.log("errResponse",errResponse)
                //console.log("status",status)
               
                
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
            <div className="edit-product-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Edit Product</span>
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
                                       categoryOptions && productEdit &&
                                        <Select options={categoryOptions}
                                            className="select-hh"
                                            //defaultValue={categoryOptions[productEdit.category.id]}
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
                                    <label className="label">Brands</label>
                                    {
                                       fragranceOptions && productEdit &&
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
                                       manufactureOptions && productEdit &&
                                        <Select options={manufactureOptions}
                                            className="select-hh"
                                            //defaultValue={manufactureOptions[productEdit.manufacture.id]}
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
                            <label className="label label-images" name="image">Images</label>
                            {/* <input type="file" name="images" id="images" multiple hidden onChange={handleImageChange} />
                            <label htmlFor="images" className="label label-choose-img"><i class='bx bx-image-add icon-choose-img'></i>Add Image</label> */}
                            <div className="result">{renderPhotos_PE(formData.images)}</div>
                            {/* { formValidError.images &&  <label className="label-error">{formValidError.images}</label> } */}
                        </div>

                        <div className="row row-img">
                            {/* <label className="label label-images" name="image">Images</label> */}
                            <input type="file" name="images-add" id="images-add" multiple hidden onChange={handleImageChange} />
                            <label htmlFor="images-add" className="label label-choose-img"><i class='bx bx-image-add icon-choose-img'></i>Add Image</label>
                            <div className="result">{renderPhotos(urlSelectedImages)}</div>
                            { formValidError.images &&  <label className="label-error">{formValidError.images}</label> }
                        </div>

                        <div className="row-hh">
                            <div className="col-2">
                                <div className="form-group">
                                    <label className="label">Size</label>
                                    <input id="capacity" type="number" className="form-control capacity" placeholder=" "
                                        value={formData.capacity}
                                        onChange={handleChangeFormData('capacity')}
                                    />
                                    {formValidError.capacity && <label className="label-error">{formValidError.capacity}</label>}
                                </div>
                            </div>
                            <div className="col-1">
                                <div className="form-group ml"></div>
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

export default EditProduct;
