import { combineReducers } from 'redux';
import authReducers from './authReducer';
import cartReducers from './cartReducer';

import categoryReducers from './categoryReducer';
import customerReducers from './customerReducer';
import employeeReducers from './employeeReducer';
import fragranceReducers from './fragranceReducer';
import importNoteReducers from './importNoteReducer';
import manufactureReducers from './manufactureReducer';
import orderReducers from './orderReducer';
import productReducers from './productReducer';
import roleReducers from './roleReducer';

const rootReducer = combineReducers({
    // users: userReducers,
    auth: authReducers,
    categories: categoryReducers,
    fragrances: fragranceReducers,
    manufactures: manufactureReducers,
    products: productReducers,
    employees: employeeReducers,
    customers: customerReducers, 
    roles: roleReducers,
    importNote: importNoteReducers,
    cart: cartReducers,
    orders: orderReducers
})

export default rootReducer;