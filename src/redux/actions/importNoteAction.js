import * as actionStypes from '../constants/importNoteConstant';
import { ImportNoteService } from '../services/importNoteService';
import { toast } from 'react-toastify';

const getListImportNotes = (importNoteList) => ({
    type: actionStypes.IMPORT_NOTE_GET_LIST,
    payload: importNoteList,

})

export const getListImportNotesAsync = () => (dispatch) => {
        ImportNoteService.getAllImportNotes()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListImportNotes(response.data));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create importNote
const createImportNote = () => ({
    type: actionStypes.IMPORT_NOTE_CREATE_NEW,
})

export const createImportNoteAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await ImportNoteService.createImportNote(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createImportNote());
                dispatch(getListImportNotesAsync());
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

//get single importNote
const getSingleImportNote = (importNoteSingle) => ({
    type: actionStypes.IMPORT_NOTE_GET_SINGLE,
    payload: importNoteSingle,

})

export const getSingleImportNoteAsync = (id) => (dispatch) => {
        ImportNoteService.getSingleImportNote(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleImportNote(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//get single importNoteDtail
const getSingleImportNoteDetail = (importNoteSingleDetail) => ({
    type: actionStypes.IMPORT_NOTE_GET_SINGLE_DETAIL,
    payload: importNoteSingleDetail,

})

export const getSingleImportNoteDetailAsync = (id) => (dispatch) => {
        ImportNoteService.getDetailSingleImportNote(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleImportNoteDetail(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



// //delete importNote
// const deleteImportNote = () => ({
//     type: actionStypes.IMPORT_NOTE_DELETE_BY_ID,
// })

// export const deleteImportNoteAsync = (importNoteId) => (dispatch) => {
//         ImportNoteService.deleteImportNote(importNoteId)
//         .then(response => {
//             console.log("response: ", response);
//             dispatch(deleteImportNote());
//             dispatch(getListCategoriesAsync());
//             toast.success("DELETE SUCCESS");
//         })
//         .catch((error) => {
//             console.log("error.response: ", error.response);
//             // const errorList = Object.values(error.response.data.message);
//             // errorList.map((item) => {
//             //     toast.error(item);
//             // })
//             toast.error(error.response.data)
//         });
// }


//update status importNote success
const updateImportNoteStatusSuccess = () => ({
    type: actionStypes.IMPORT_NOTE_UPDATE_STATUS_SUCCESS,
})

export const updateImportNoteStatusSuccessAsync = (id)  => {
    return async function(dispatch) {     
        try{
            let response = (await ImportNoteService.updateStatusSuccess(id));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(updateImportNoteStatusSuccess());
                //dispatch(getSingleImportNoteAsync());
                toast.success("UPDATE SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            //console.log("error.response: ", error.response);
            toast.error("UPDATE FAIL")
            return{
                ok: false
            }
        }
    }
}



//update status importNote delete
const updateImportNoteStatusDelete = () => ({
    type: actionStypes.IMPORT_NOTE_UPDATE_STATUS_DELETE,
})

export const updateImportNoteStatusDeleteAsync = (id)  => {
    return async function(dispatch) {     
        try{
            let response = (await ImportNoteService.updateStatusDelete(id));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(updateImportNoteStatusDelete());
                //dispatch(getSingleImportNoteAsync());
                toast.success("CANCEL SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            //console.log("error.response: ", error.response);
            toast.error("UPDATE FAIL")
            return{
                ok: false
            }
        }
    }
}