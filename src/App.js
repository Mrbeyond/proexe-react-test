// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import UserList from './Components/UserList';
import { mock } from "./mockdata";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import UserForm from "./Components/UserForm";
import { usersList } from "./global/action";
import { connect } from "react-redux";
import axios from "axios";
import UserEditor from "./Components/UserEditor";

const PROXY = "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

function App({setUsers, all_users}) {

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(all_users) return;
    setLoading(true);
    axios.get(PROXY).then(data=>{
      setUsers(data.data)
    }).catch(error=>{
      // if error load data locally
      setUsers(mock);
      setApiError("Something wrong, it seems to be network errror, now using local data.");
      setTimeout(()=>{
        setApiError("")
      },4000);
      // console.log(error);
    }).finally(()=>{
      setLoading(false);
    })
  },[setUsers, all_users]);

  return (
    <div className="px-2 pb-10 sm:px-10 md:px-20 lg:px-28 xl:px-36">
      <Router>
        <h1 className="dashboard-text">Dashboard</h1>
        {loading &&
          <div className="flex justify-center mb-5 text-sm font-medium"> 
            Loading data, please wait...
          </div>
        }
        {apiError &&
          <div 
            className="text-sm text-red-400 mb-5 flex justify-center" >
              {apiError}
          </div>
        }
        <Routes>
          <Route exact path="/" element={<UserList all_users={all_users} />} /> 
          <Route exact path="/add-user" element={<UserForm />} />
          <Route exact path="/edit-user/:id" element={<UserEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps=(state)=>({
  all_users: state.all_users,
 })
 
 const mapDispatchToProps=(dispatch)=>({
   setUsers:(payload)=>dispatch(usersList(payload)),
 })
 
 
 export default  connect(mapStateToProps, mapDispatchToProps)(App);
