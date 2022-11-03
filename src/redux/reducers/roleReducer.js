import *  as actionTypes from '../constants/roleConstant';

const initialState = {
    roleList: null,
    roleSingle: null,
    isLoading: true,
    errorMessage: null
}

function roleReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.ROLE_GET_LIST:
            return{
                ...state,
                roleList: action.payload,
                isLoading: false,
            }
        case actionTypes.ROLE_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.ROLE_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.ROLE_GET_SINGLE:
            return{
                ...state,
                roleSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.ROLE_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default roleReducers;