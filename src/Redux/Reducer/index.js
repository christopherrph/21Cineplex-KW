import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
//Reducer digunakan untuk mengisi nilai global state dan untuk buat fungsi yang akan dijalankan

export default combineReducers({
    user: authReducer
})