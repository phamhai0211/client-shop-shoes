import * as actionStypes from '../constants/categoryConstant';
import { CategoryService } from '../services/categoryService';
import { toast } from 'react-toastify';

const getListCategories = (categoryList) => ({
    type: actionStypes.CATEGORY_GET_LIST,
    payload: categoryList,

})

export const getListCategoriesAsync = () => (dispatch) => {
        CategoryService.getAllCategories()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListCategories(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create category
const createCategory = () => ({
    type: actionStypes.CATEGORY_CREATE_NEW,
})

export const createCategoryAsync = ({ name, description }) => {
    return async function(dispatch) {     
        try{
            let response = (await CategoryService.createCategory({ name, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createCategory());
                dispatch(getListCategoriesAsync());
                toast.success("CREATE SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            toast.error(error.response.data)
            return{
                ok: false
            }
        }
    }
}

//get single category
const getSingleCategory = (categorySingle) => ({
    type: actionStypes.CATEGORY_GET_SINGLE,
    payload: categorySingle,

})

export const getSingleCategoryAsync = (id) => (dispatch) => {
        CategoryService.getSingleCategory(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleCategory(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



//delete category
const deleteCategory = () => ({
    type: actionStypes.CATEGORY_DELETE_BY_ID,
})

export const deleteCategoryAsync = (categoryId) => (dispatch) => {
        CategoryService.deleteCategory(categoryId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteCategory());
            dispatch(getListCategoriesAsync());
            toast.success("DELETE SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            // const errorList = Object.values(error.response.data.message);
            // errorList.map((item) => {
            //     toast.error(item);
            // })
            toast.error(error.response.data)
        });
}


//edit category
const editCategory = () => ({
    type: actionStypes.CATEGORY_EDIT_BY_ID,
})

export const editCategoryAsync = ({id, name, description })  => {
    return async function(dispatch) {     
        try{
            let response = (await CategoryService.editCategory({ id, name, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editCategory());
                dispatch(getListCategoriesAsync());
                toast.success("EDIT SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            toast.error(error.response.data)
            return{
                ok: false
            }
        }
    }
      

}