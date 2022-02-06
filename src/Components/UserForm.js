import React, {useState} from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../global/action";


const UserForm=({users, addUser})=>{

  let navigate = useNavigate();

  const [invalidator, setInvalidator] = useState({});

  const regex =(val)=>{
    if(/^\w+\.?\w+@\w+\.?\w+\.\w+$/.test(val.trim())) return true;
    if(/^\w+\.?\w*@\w+\.\w+$/.test(val.trim())) return true;
    return false;
  } 

  const submitter=async(e)=>{
    e.preventDefault();
    let {target} = e;
    let checkers = ["name", "email"];
    let payload = {};
    /** local sync invalidator holder before setting it into state invalidator*/
    let _invalidator = {};
    await checkers.forEach(async(element) => {
      if(!target[element]['value'] || !target[element]['value'].trim()){
        _invalidator[element] = true;
      }else if(element === "email" && !regex(target[element]['value'].trim())){
        _invalidator[element] = true;
      }else{
        payload[element] = target[element]['value'];
        _invalidator[element] = false;
      }  
    });
    
    let validator = Object.entries(_invalidator);
    console.log(validator);
    setInvalidator(_invalidator);
    if(validator.flat().includes(true) || !validator.length)return;
      let id= users?Math.max(...users.map((user)=>user.id))+1: 1;
      payload.id =id;
      addUser(payload);
      target.reset();
      navigate("/");
  }

  return (<div>
    <div className="cover">
      <div 
        className="text-xl font-bold border-b text-neutral-600 p-4">
          Form
      </div>
      {/* Form container */}
      <div className="px-4 sm:px-8 py-14">
        <form onSubmit={submitter} >
          <div className="control-grid">
            {/* name */}
            <div className="control-cover">
              <label htmlFor="name">Name</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="name"  id="name"  placeholder="Name" 
                  className={`fw-full ${invalidator.name?'border-red-400':''}`} 
                />
                {invalidator.name && 
                  <small  className="text-red-400">Name is required</small>
                }
              </div>
            </div>

            {/* email */}
            <div className="control-cover">
              <label htmlFor="email" >Email</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="email" id="email"  placeholder="Email"
                  className={`w-full ${invalidator.email?'border-red-400':''}`} 
                  />
                {invalidator.email && 
                  <small  className="text-red-400">Valid email is required</small>
                }
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link to="/">
              <button type="button"
                className="but bg-neutral-700"
              >
                Cancel
              </button> 

            </Link>
            <button  type="submit" 
              className="but bg-green-500 px-4">
              Submit
            </button> 
          </div>
        </form>

      </div>
    </div>

  </div>)
}
const mapStateToProps=(state)=>({
  users: state.all_users,
 })
 
 const mapDispatchToProps=(dispatch)=>({
   addUser:(payload)=>dispatch(addNewUser(payload)),
 })
 
 
 export default  connect(mapStateToProps, mapDispatchToProps)(UserForm)