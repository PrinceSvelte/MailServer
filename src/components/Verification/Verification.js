import React, { useCallback, useEffect, useState } from 'react'
import "./Verification.css"
import {CaretDownFill} from "react-bootstrap-icons"
import ApiHandle from '../utils/ApiHandle'
import { SEND_OTP, VERIFY_OTP } from '../utils/constants'
import Toaster from '../utils/Toaster'
import { useNavigate } from 'react-router-dom'
const Verification = () => {
    let tempOtp = ""
    let count = 0
    const navigate = useNavigate()
    const numbers = ['1','2','3','4']
    const [otp,setOtp] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")

    const sendOtp = async() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        setPhoneNumber(userData?.phoneNumber)
        // console.log(userData,"userData")
        // const phoneNumber = userData?.phoneNumber
        let payload = {
            "phoneNumber":userData?.phoneNumber
        }
        // console.log(phoneNumber)
        const res = await ApiHandle(SEND_OTP, payload, "POST")
        if(res.statusCode === 201){
            Toaster("success",`Please Enter Otp ${res?.responsePayload?.otp} !`)
        }
    }

    useEffect(() => {
        sendOtp()
    },[])

    const checkOTP = (e) => {
        if(e.key === "Backspace"){
            tempOtp = tempOtp.substring(0, tempOtp.length-1);
            count--
            setOtp(tempOtp)
        }
        const isNumber = isFinite(e.key);
        if (!isNumber) {
          return;
        }
        if(count <4){
            // setOtp("")
            tempOtp += e.key
            setOtp(tempOtp)
            count++
        }
    }

    const storeOTP = useCallback(() => {
        window.addEventListener("keydown",checkOTP)
    },[])

    useEffect(() => {
        storeOTP()
        return () => window.removeEventListener("keydown",checkOTP)
    },[])

    const verifyOTP = async() => {
        console.log(otp.length)
        if(otp.length<4){
            Toaster("error",`Please Enter ${tempOtp.length} more digit to verify Otp !`)
            return
        }
        let payload = {
            "phoneNumber":phoneNumber,
            "otp":otp
        }
        const res = await ApiHandle(VERIFY_OTP,payload,"POST")

        if(res.statusCode === 200){
            const userData = JSON.parse(localStorage.getItem("userData"))
            Toaster("success",res?.responsePayload?.message)
            navigate("/final-page",{
                state:{
                    otp:otp,
                    email:userData?.email
                }
            })
        }
    }
  return (
    <div className='verification-container'>
        <div className='verification-tag'>
            <h2>Verification</h2>
        </div>
        <div>
            <CaretDownFill className='down-icon' />
        </div>
        <div>
            <span>Enter the code</span>
        </div>
        {console.log(otp)}
        <div className='verification-group'>
        <span>{otp[0]}</span>
        <span>{otp[1]}</span>
        <span>{otp[2]}</span>
        <span>{otp[3]}</span>
            {/* {otp.split("").map((num,i) => {
                return (
                    // <div className='verification-group'>
                        <span key={i}>{num}</span>
                        // </div>
                
                )
            })} */}
        </div>
        <div>
        <button onClick={() => verifyOTP()} className='verification-submit'>Submit</button>
        <button onClick={() => sendOtp()} className='verification-submit'>Resend</button>
        </div>  
    </div>
  )
}

export default Verification