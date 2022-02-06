import { NEW_USER, USERS } from "../constants";


const initialState = {
 all_users:null,
}

const rootReducer = (state=initialState, action)=>{
  if (action.type === USERS) {
    return {...state, all_users:action.payload}
    
  }
  else if(action.type === NEW_USER){
    let current = state.all_users??[];
    return {...state, all_users:[...current, action.payload]}
  }

  return state;
}

export default rootReducer;