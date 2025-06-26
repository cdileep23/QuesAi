import axios from "axios";
import { BASE_URL } from "../../../lib/baseurl";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { UserLoggedIn } from "@/store/userslice";

const Body = () => {
  const dispatch=useDispatch()
const navigate=useNavigate()
  const user=useSelector((store)=>store.user)
  const isAuthRoute = location.pathname.includes("/auth");
  const fetchUser=async()=>{
    try {
     const url=`${BASE_URL}/user/profile`;
     const res=await axios.get(url,{withCredentials:true}) 
     if(res.data?.success){
     dispatch(UserLoggedIn(res.data.user)); 
     if(isAuthRoute){
      navigate('/')
     }
     }
    } catch (error) {
      console.log(error)
      navigate('/auth')
    }
  }
 useEffect(()=>{
if(user){
  return
}
fetchUser()
 },[])

  return (
    <div>
    
      <Outlet />
    </div>
  );
};

export default Body;
