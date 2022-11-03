import *  as actionTypes from '../constants/importNoteConstant';

const initialState = {
    importNoteList: null,
    importNoteSingle: null,
    importNoteSingleDetail: null,
    //importNoteListName: null,
    isLoading: true,
    errorMessage: null
}

function importNoteReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.IMPORT_NOTE_GET_LIST:
            return{
                ...state,
                importNoteList: action.payload,
                isLoading: false,
            }
        
        case actionTypes.IMPORT_NOTE_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.IMPORT_NOTE_GET_SINGLE:
            return{
                ...state,
                importNoteSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.IMPORT_NOTE_GET_SINGLE_DETAIL:
            return{
                ...state,
                importNoteSingleDetail: action.payload,
                isLoading: false,
            }
        case actionTypes.IMPORT_NOTE_UPDATE_STATUS_SUCCESS:
            return{
                ...state,
                isLoading: false,
            }
            case actionTypes.IMPORT_NOTE_UPDATE_STATUS_DELETE:
                return{
                    ...state,
                    isLoading: false,
                }
        default:
            return state;
    }
}

export default importNoteReducers;