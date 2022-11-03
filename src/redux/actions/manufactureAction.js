import * as actionStypes from '../constants/manufactureConstant';
import { ManufactureService } from '../services/manufactureService';
import { toast } from 'react-toastify';

const getListManufactures = (manufactureList) => ({
    type: actionStypes.MANUFACTURE_GET_LIST,
    payload: manufactureList,

})

export const getListManufacturesAsync = () => (dispatch) => {
        ManufactureService.getAllManufactures()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListManufactures(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create
const createManufacture = () => ({
    type: actionStypes.MANUFACTURE_CREATE_NEW,
})

export const createManufactureAsync = ({ name, email, phone, address, description }) => {
    return async function(dispatch) {     
        try{
            let response = (await ManufactureService.createManufacture({ name, email, phone, address, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createManufacture());
                dispatch(getListManufacturesAsync());
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

//get single 
const getSingleManufacture = (manufactureSingle) => ({
    type: actionStypes.MANUFACTURE_GET_SINGLE,
    payload: manufactureSingle,

})

export const getSingleManufactureAsync = (id) => (dispatch) => {
        ManufactureService.getSingleManufacture(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleManufacture(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



//delete 
const deleteManufacture = () => ({
    type: actionStypes.MANUFACTURE_DELETE_BY_ID,
})

export const deleteManufactureAsync = (manufactureId) => (dispatch) => {
        ManufactureService.deleteManufacture(manufactureId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteManufacture());
            dispatch(getListManufacturesAsync());
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


//edit Manufacture
const editManufacture = () => ({
    type: actionStypes.MANUFACTURE_EDIT_BY_ID,
})

export const editManufactureAsync = ({ id, name, email, phone, address, description })  => {
    return async function(dispatch) {     
        try{
            let response = (await ManufactureService.editManufacture({ id, name, email, phone, address, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editManufacture());
                dispatch(getListManufacturesAsync());
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