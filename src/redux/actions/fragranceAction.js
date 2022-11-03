import * as actionStypes from '../constants/fragranceConstant';
import { FragranceService } from '../services/fragranceService';
import { toast } from 'react-toastify';

const getListFragrances = (fragrancesList) => ({
    type: actionStypes.FRAGRANCE_GET_LIST,
    payload: fragrancesList,

})

export const getListFragrancesAsync = () => (dispatch) => {
        FragranceService.getAllFragrances()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListFragrances(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create 
const createFragrance = () => ({
    type: actionStypes.FRAGRANCE_CREATE_NEW,
})

export const createFragranceAsync = ({ name, description }) => {
    return async function(dispatch) {     
        try{
            let response = (await FragranceService.createFragrance({ name, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createFragrance());
                dispatch(getListFragrancesAsync());
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
const getSingleFragrance = (fragranceSingle) => ({
    type: actionStypes.FRAGRANCE_GET_SINGLE,
    payload: fragranceSingle,

})

export const getSingleFragranceAsync = (id) => (dispatch) => {
        FragranceService.getSingleFragrance(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleFragrance(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



//delete 
const deleteFragrance = () => ({
    type: actionStypes.FRAGRANCE_DELETE_BY_ID,
})

export const deleteFragranceAsync = (fragranceId) => (dispatch) => {
        FragranceService.deleteFragrance(fragranceId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteFragrance());
            dispatch(getListFragrancesAsync());
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


//edit 
const editFragrance = () => ({
    type: actionStypes.FRAGRANCE_EDIT_BY_ID,
})

export const editFragranceAsync = ({id, name, description })  => {
    return async function(dispatch) {     
        try{
            let response = (await FragranceService.editFragrance({ id, name, description }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editFragrance());
                dispatch(getListFragrancesAsync());
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