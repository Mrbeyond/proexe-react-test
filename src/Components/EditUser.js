import React, {useState} from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersList } from "../global/action";

const EditUser=({users, currentUser, modifyUsers})=>{

  let navigate = useNavigate();
  console.log(users, currentUser);

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
    /** Process nested city into address */
    let address = currentUser.address??{};
    address.city = target['city']['value'];
    let payload = {
      id: currentUser.id,
      address,
      username: target['username']['value'],
    };
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
      let index= users.findIndex((user)=>user.id === currentUser.id);
      console.log(index);
      let tempUsers = [...users];
      tempUsers[index] = payload;
      modifyUsers(tempUsers);
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
              <label htmlFor="name">First name</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="name"  id="name"  placeholder="Name" 
                  className={`fw-full ${invalidator.name?'border-red-400':''}`} 
                  defaultValue={currentUser?.name}
                />
                {invalidator.name && 
                  <small  className="text-red-400">Name is required</small>
                }
              </div>
            </div>

            {/* username */}
            <div className="control-cover">
              <label htmlFor="username">Username</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="username"  id="username" placeholder="Username" 
                  className={`fw-full ${invalidator.username?'border-red-400':''}`} 
                  defaultValue={currentUser?.username}
                />
              </div>
            </div>

            {/* email */}
            <div className="control-cover">
              <label htmlFor="email" >Email</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="email" id="email"  placeholder="Email"
                  className={`w-full ${invalidator.email?'border-red-400':''}`} 
                  defaultValue={currentUser?.email}
                  />
                {invalidator.email && 
                  <small  className="text-red-400">Valid email is required</small>
                }
              </div>
            </div>
          </div>

          {/* city */}
          <div className="control-cover">
              <label htmlFor="city">City</label>
              <div className="grid  md:col-span-3">
                <input type="text" name="city"  id="city" placeholder="city" 
                  className={`fw-full ${invalidator.city?'border-red-400':''}`} 
                  defaultValue={currentUser?.address?.city}
                />
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

 
 const mapDispatchToProps=(dispatch)=>({
   modifyUsers:(payload)=>dispatch(usersList(payload)),
 })
 
 
 export default  connect(null, mapDispatchToProps)(EditUser)