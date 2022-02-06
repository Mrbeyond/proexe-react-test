import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { UserList } from "../global/action";
import EditUser from "./EditUser";


const UserEditor=({users})=>{

  let params = useParams();


  let [currentUser, setCurrentUser ] = useState()


    useEffect(()=>{
      setCurrentUser(users?.find((user)=>user.id === Number(params.id)))
    },[users, params.id])

    console.log(users);


  return (<div>
    {!currentUser?
      <div className="cover not-found-box">
        Oops! Page not found
      </div>:
      <EditUser currentUser={currentUser} users={users} />
    }

  </div>)
}

const mapStateToProps=(state)=>({
  users: state.all_users,
 })
 
 export default  connect(mapStateToProps)(UserEditor)