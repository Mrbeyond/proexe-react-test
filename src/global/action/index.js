import { NEW_USER, USERS } from "../constants";


export const addNewUser = (payload)=>({type:NEW_USER, payload});
export const usersList = (payload)=>({type:USERS, payload});