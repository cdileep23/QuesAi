import { toast } from "sonner";

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../lib/baseurl';
import { Loader } from "lucide-react";

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

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      {/* Left Side - Purple Gradient Background */}
      <div className="hidden lg:block lg:col-span-2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-20">
          <div className="mb-8">
            <div className="flex items-center mb-12">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-white text-2xl font-bold">Ques.AI</span>
            </div>
          </div>

          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Your podcast
              <br />
              will no longer
              <br />
              be just a hobby.
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Supercharge Your Distribution
            </p>
            <p className="text-lg text-white/70">using our AI assistant!</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="col-span-1 flex flex-col justify-center items-center p-8 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-purple-600 text-xl font-bold">Ques.AI</span>
          </div>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h4 className="text-xl text-gray-600 mb-1">Welcome to</h4>
            <h1 className="font-bold text-2xl text-purple-600">Ques.AI</h1>
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
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