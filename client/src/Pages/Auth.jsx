import { toast } from "sonner";

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../lib/baseurl';
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";

const Auth = () => {
  const navigate=useNavigate()
  const [currentStage, setCurrentStage] = useState("signup");
  const [loading,setLoading]=useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  });


  const handleInputChange = (e, name) => {
    setData((data) => ({
      ...data,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  const url=`${BASE_URL}/user/${currentStage==="signup"?'sign-in':'login'} `
  try {
    setLoading(true)
    const res=await axios.post(url,data,{withCredentials:true})
    console.log(res);
    if(res.data?.success){
      toast.success(res.data.message)
      if (currentStage === "signup") {
        setCurrentStage("login");
      }else{
        navigate('/')
      }
    }
    console.log(res)
  } catch (error) {
    console.log(error)
    toast.error(error.response.data?.message)
  }finally{
    setLoading(false)
    setData({
      email: "",
      password: "",
    });
  }
  };
  const user=useSelector((store)=>store.user)
useEffect(()=>{
if(user){
  navigate('/')
}
},[user])

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      <div className="hidden lg:block lg:col-span-2 bg-gradient-to-br from-[#3A0B63] to-[#C37EFF] relative overflow-hidden">
        <div className="flex flex-col h-full px-10 py-10">
          <h1 className="text-4xl mb-4 text-white font-bold">
            Ques.<span className="font-light">AI</span>
          </h1>

          <div className="max-w-lg">
            <h1 className="text-6xl font-light text-white mb-6 leading-tight mb-3">
              Your podcast
              <br />
              will no longer
              <br />
              be just a hobby.
            </h1>
            <p className="text-xl text-white/80 mb-2">
              Supercharge Your Distribution
            </p>
            <p className="text-lg text-white/70">using our AI assistant!</p>
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col justify-center items-center p-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h4 className="text-3xl text-[#a683c6]  mb-1">Welcome to</h4>
            <h1 className="font-bold text-2xl text-[#7E22CE]">Ques.AI</h1>
          </div>

          <div className="space-y-4">
            <div>
              <input
                onChange={(e) => handleInputChange(e, "email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="email"
                value={data.email}
                placeholder="Email Address"
              />
            </div>

            <div>
              <input
                onChange={(e) => handleInputChange(e, "password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="password"
                value={data.password}
                placeholder="Password"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#7E22CE] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                {loading && <Loader className="w-5 h-5 animate-spin" />}
                {currentStage === "signin" ? "Login" : "Sign Up"}
              </div>
            </button>

            <div className="text-center text-gray-500 text-sm">or</div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                disabled={loading}
                type="button"
                onClick={() =>
                  setCurrentStage(
                    currentStage === "signin" ? "signup" : "signin"
                  )
                }
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {currentStage === "signin" ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;