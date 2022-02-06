import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { usersList } from "../global/action";

import ArrowUp from "./ArrowUp.svg";
import ArrowDown from "./ArrowDown.svg";



const UserList = ({ setUsers, all_users})=>{

  let [deleteKey, setDeleteKey] = useState(false);
  let [deleteLoad, setDeleteLoad] = useState(null);


  const preparedelete=(user)=>{
    setDeleteLoad(user);
    setDeleteKey(true);
  }
  const deleteUser=(id)=>{
    setUsers(all_users.filter((iter)=>iter.id !== id));
    setDeleteKey(false);
  }

  const cancelDelete=()=>{
    setDeleteLoad(null);
    setDeleteKey(false)
  }

  const ascendSort=()=>{
    const sorted = all_users.sort((a,b)=>{
      let A = a.username?.toUpperCase();
      let B = b.username?.toUpperCase();
      if(A < B) return -1;
      if(A > B) return 1;
      return 0;
    })
    setUsers([...sorted]);
  }

  const descendSort=()=>{
    const sorted= all_users.sort((a,b)=>{      
      let A = a.username?.toUpperCase();
      let B = b.username?.toUpperCase();
      if(A > B) return -1;
      if(A < B) return 1;
      return 0;
    });
    setUsers([...sorted]);
  }


  return(
    <div className="">
      <div className="cover">

        {/* Head and action */}
        <div className="head-action">
          <h2 className="text-bold text-xl">User  list</h2>
          <Link to="/add-user">
            <button className="but bg-blue-500">Add new</button>
          </Link>
        </div>
        {/* Sort */}
        <div className="flex items-center pl-4 py-1">
          <span className="text-lg tracking-tight">Sort By Username</span>
          <span  onClick={ascendSort} className="sort-icons">
            <img src={ArrowDown} alt="Arrow-up" />
          </span>
          <span onClick={descendSort} className="sort-icons">
            <img src={ArrowUp} alt="Arrow-up" />
          </span>

        </div>
        {/* Table */}
        <div className="p-2 overflow-x-auto  w-full">
          <table>
            <thead className=" bg-neutral-100">
              <tr>
                <td className="p-4">Id</td>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
                <td>City</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
            {all_users && all_users.map((user)=>(
              <tr key={user.id} className="border-t p-4">
                <td className=" p-4">
                  <span className="prefix">
                      {user.id}
                  </span>
                </td>
                <td>
                  {user.name}
                </td>
                <td className="fullname">
                  {user?.username }
                </td>
                <td className="fullname">
                  {user.email }
                </td>
                <td>
                  {user?.address?.city}
                </td>
                <td >  
                  <Link to={`/edit-user/${user.id}`}>
                    <button 
                      className="but bg-orange-400"
                    >
                      edit
                    </button>
                  </Link>
                </td>
                <td >
                  <button  onClick={()=>preparedelete(user)} 
                      className="but bg-red-500"
                    >
                    delete
                  </button>               
                </td>
              </tr>
            ))         
                
              }
            </tbody>
          </table>

        </div>
      </div>
      {(deleteKey && deleteKey) && 
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-black p-2 font-bold">
              Delete
            </h2>
            <div className="px-2 border-y-2 py-4">
              {deleteLoad.name}
            </div>
            <div className="flex gap-2 p-2 justify-end">
              <button  onClick={cancelDelete} 
                className="but bg-neutral-700"
              >
                Cancel
              </button> 
              <button  onClick={()=>deleteUser(deleteLoad.id)} 
                className="but bg-red-500 px-4">
                Delete
              </button> 
            </div>
          </div>
        </div>
      }
    </div>
  )
}



const mapDispatchToProps=(dispatch)=>({
  setUsers:(payload)=>dispatch(usersList(payload)),
})


export default  connect(null, mapDispatchToProps)(UserList);