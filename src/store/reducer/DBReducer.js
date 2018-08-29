import actionTypes from '../actionTypes';
import { retry } from 'rxjs/operators/retry';
import actionType from '../actionTypes';

let intialState = {
    loadDataIsProgress: false,
    setDataObjIsProgress: false,
    setInventoryIsProgress: false,
    pushHistoryIsProgress: false,
    dataObj: {},
    inventory: {},
    errorMessage: '',
    currentUser: null,
    pushHistoryData: [],
    lastSync: ''
}

function DBReducer(state = intialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_DATA_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.LOAD_DATA_SUCCEED:
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: action.payload.dataObj, inventory: action.payload.inventory, lastSync: action.payload.lastSync });
        case actionTypes.LOAD_DATA_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });


        case actionTypes.SET_CURRENTUSER_PROGRESS:
            return Object.assign({}, state, { currentUser: action.payload });


        case actionTypes.SET_DATAOBJ_PROGRESS:
            return Object.assign({}, state, { setDataObjIsProgress: true, dataObj: action.payload });
        case actionTypes.SET_DATAOBJ_SUCCEED:
            return Object.assign({}, state, { setDataObjIsProgress: false });
        case actionTypes.SET_DATAOBJ_FAIL:
            return Object.assign({}, state, { setDataObjIsProgress: false, errorMessage: action.payload });


        case actionTypes.SET_INVENTORY_PROGRESS:
            return Object.assign({}, state, { inventory: action.payload, setInventoryIsProgress: true });
        case actionTypes.SET_INVENTORY_SUCCEED:
            return Object.assign({}, state, { setInventoryIsProgress: false });
        case actionTypes.SET_INVENTORY_FAIL:
            return Object.assign({}, state, { setInventoryIsProgress: false, errorMessage: action.payload });


        case actionTypes.PUSH_HISTORY_PROGRESS:
            return Object.assign({}, state, { pushHistoryIsProgress: true });
        case actionTypes.PUSH_HISTORY_SUCCEED:
            return Object.assign({}, state, { pushHistoryIsProgress: false, pushHistoryData: [...state.pushHistoryData, action.payload] });
        case actionTypes.PUSH_HISTORY_FAIL:
            return Object.assign({}, state, { pushHistoryIsProgress: false, errorMessage: action.payload });


        case actionTypes.SYNC_DATA_PROGRESS:
            return Object.assign({}, state, { loadDataIsProgress: true });
        case actionTypes.SYNC_DATA_SUCCEED:
            const d = { ...state.dataObj, ...action.payload };
            console.log('dddddddddd ', d);
            return Object.assign({}, state, { loadDataIsProgress: false, dataObj: { ...state.dataObj, ...action.payload } });
        case actionTypes.SYNC_DATA_FAIL:
            return Object.assign({}, state, { loadDataIsProgress: false, errorMessage: action.payload });
        default:
            return state;
    }
}

export default DBReducer;