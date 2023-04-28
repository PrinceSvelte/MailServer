import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginLogo from "../../assets/images/login-logo.png"
import ApiHandle from '../utils/ApiHandle'
import { REGISTER } from '../utils/constants'
import Toaster from '../utils/Toaster'
import { ThreeDots } from 'react-loader-spinner'

import "./Login.css"

const FirstScreen = () => {
  const [formDetails,setFormDetails] = useState({
    name:"",
    email:"",
    phoneNumber:""
  })
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const isRegistered = localStorage.getItem("isRegistered")
    if(isRegistered){
      navigate("/")
    }
  },[])

  const handleLoader = () => {
    setLoading((prev) => !prev)
  }
  const handleChange = (e) => {
    const {value,name} = e.target
    let newValue = value
    if(name === "phoneNumber") {
      newValue =  value.replace(new RegExp(/[^\d]/, 'ig'), "");
    }
    setFormDetails((prev) => ({
      ...prev,
      [name]:newValue

    }))
  }
  const handleSubmit = async(e) => {
   
    e.preventDefault()
    const resp = await ApiHandle(REGISTER, formDetails, "POST",handleLoader);
    if(resp.statusCode === 201 ){
      if(resp.statusCode !==409){
      Toaster("success",resp?.responsePayload?.message );
      }
      const response = resp?.responsePayload?.result
      if(response){
      localStorage.setItem("isRegistered",true)
      localStorage.setItem("userData",JSON.stringify(response))
      navigate("/otp")
      }else {
        Toaster("error","No Valid Response From Server!")
      }
    }

  }
  return (
    <div className='login-container'>
      
      {/* <div> */}
        <div className='login-logo' id="new">
          <img height={100} width={100} src={loginLogo} />
        {/* </div> */}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className='input-container'>
        <div className='inputs'>
        <input placeholder='Username' name='name' onChange={(e) => handleChange(e)} />
        </div>
        <div  className='inputs'>
        <input placeholder='Email' type="email" name='email' onChange={(e) => handleChange(e)}/>
        </div>
        <div  className='inputs'>
        <input placeholder='Phone Number'value={formDetails.phoneNumber} type="text"  name="phoneNumber" maxLength={10} onChange={(e) => handleChange(e)}/>
        </div>
        <button>               {loading ? (
                  <ThreeDots
                  radius="9"
                    color="#34BEFD"
                    height={30}
                    width={30}
                  />
                ) : (
                  "Login"
                )}</button>
      </div>

      </form>
    </div>
  
  )
}

export default FirstScreen