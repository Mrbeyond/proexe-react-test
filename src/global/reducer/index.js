import { NEW_USER, USERS } from "../constants";


const initialState = {
 all_users:null,
}

const rootReducer = (state=initialState, action)=>{
  if (action.type === USERS) {
    return {...state, all_users:action.payload}
    
  }
  else if(action.type === NEW_USER){
    return {...state, all_users:[...state.all_users, action.payload]}
  }

  return state;
}

export default rootReducer;