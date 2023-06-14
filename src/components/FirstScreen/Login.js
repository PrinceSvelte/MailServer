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
  const [error,setError] = useState("")

  useEffect(() => {
    const isRegistered = localStorage.getItem("isRegistered")
    if(isRegistered){
      navigate("/")
    }
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    let _formDetails = {}
    if(!new RegExp(/^[6-9]{1}[0-9]{9}$/).test(formDetails.phoneNumber)){
      Toaster("error","Please Enter valid Phone Number")
      return
    }
    if(formDetails.name === "" || formDetails.phoneNumber === "" || formDetails.email === ""){
      Toaster("error" ,"Please Provide All the details" );
      return
    }
    for(let [key,value] of Object.entries(formDetails)){
      _formDetails[key] = await window.to_electron.enCryptPin(value)
    }
    const resp = await ApiHandle(REGISTER, _formDetails, "POST",handleLoader);
    if(resp.statusCode === 201 ){
      // if(resp.statusCode !==409){
      Toaster("success",resp?.responsePayload?.message );
      // }
      const response = resp?.responsePayload?.result
      if(response){
      localStorage.setItem("isRegistered",true)
      localStorage.setItem("userData",JSON.stringify(response))
      navigate("/otp")
      }else {
        Toaster("error","No Valid Response From Server!")
      }
      // navigate("/otp")
    }

  }

  // useEffect(() => {
  //   const phone_input = document.getElementById("myform_phone")
  //   phone_input.addEventListener('invalid', () => {
  //     if(phone_input.value === '') {
  //       phone_input.setCustomValidity('Enter phone number!');
  //     } else {
  //       phone_input.setCustomValidity('Please Enter Valid Phone Number');
  //     }
  //   });
  // },[handleSubmit])



  const handleLoader = () => {
    setLoading((prev) => !prev)
  }
  const handleChange = async(e) => {
    const {value,name} = e.target
    let newValue = value
    if(name === "phoneNumber") {
      setError("")
      newValue =  value.replace(new RegExp(/[^\d]/, 'ig'), "");
    }
    setFormDetails((prev) => ({
      ...prev,
      [name]:newValue

    }))
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
        <input placeholder='Phone Number' required  id="myform_phone" value={formDetails.phoneNumber} type="text"  name="phoneNumber" maxLength={10} onChange={(e) => handleChange(e)}/>
        </div>
        <span style={{color:"red",fontSize:"16px",padding:"6px"}}>{error.length >0 && error}</span>
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