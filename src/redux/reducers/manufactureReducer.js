import *  as actionTypes from '../constants/manufactureConstant';

const initialState = {
    manufactureList: null,
    manufactureSingle: null,
    //manufactureListName: null,
    isLoading: true,
    errorMessage: null
}

function manufactureReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.MANUFACTURE_GET_LIST:
            return{
                ...state,
                manufactureList: action.payload,
                isLoading: false,
            }
        // case actionTypes.MANUFACTURE_GET_LIST_NAME:
        //     return{
        //         ...state,
        //         manufactureListName: action.payload,
        //         isLoading: false,
        //     }
        case actionTypes.MANUFACTURE_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.MANUFACTURE_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.MANUFACTURE_GET_SINGLE:
            return{
                ...state,
                manufactureSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.MANUFACTURE_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default manufactureReducers;