import React, { useCallback, useEffect, useState } from 'react'
import "./Verification.css"
import {CaretDownFill} from "react-bootstrap-icons"
import ApiHandle from '../utils/ApiHandle'
import { SEND_OTP, VERIFY_OTP } from '../utils/constants'
import Toaster from '../utils/Toaster'
import { useNavigate } from 'react-router-dom'
import Timer from './Timer'


const Verification = () => {
    let tempOtp = ""
    var count = 0
    const navigate = useNavigate()
    const [otp,setOtp] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [disable,setDisable] = useState(false)
    const [isSubmit,setIsSubmit] = useState(false)
    let otpInterval;

    const sendOtp = async(resend) => {
        if(disable) {
            Toaster("error","Pleae Wait you can resend otp after 1 min!")
            return
        }
        const userData = JSON.parse(localStorage.getItem("userData"))
        setPhoneNumber(userData?.phoneNumber)
        let payload = {
            "phoneNumber":userData?.phoneNumber
        }
        setDisable(true)
        if(resend){
        setIsSubmit(false)
        setOtp("")
        tempOtp = ""
        count=0
        }
        const res = await ApiHandle(SEND_OTP, payload, "POST")
        if(res.statusCode === 201){
            Toaster("success",`Please Enter Otp ${res?.responsePayload?.otp} !`)
        }
    }

    useEffect(() => {
        sendOtp()
        return () => clearInterval(otpInterval)
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
    },[disable])

    useEffect(() => {
        storeOTP()
        return () => window.removeEventListener("keydown",checkOTP)
    },[disable])

    const verifyOTP = async() => {
        if(otp.length<4){
            Toaster("error",`Please Enter 4 digits to verify Otp !`)
            return
        }
        let payload = {
            "phoneNumber": phoneNumber,
            "otp":otp
        }
        setIsSubmit(true)
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

    useEffect(() => {
        if(isSubmit){
            setIsSubmit(false)
        }
    },[otp])
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
        <div className='verification-group'>
        <span>{otp[0]}</span>
        <span>{otp[1]}</span>
        <span>{otp[2]}</span>
        <span>{otp[3]}</span>
        </div>
        <div>
            {disable &&
    <Timer    
    setDisable={setDisable}
     />
            }
  </div>
        <div>
        <button disabled={isSubmit}  onClick={() => verifyOTP()} className='verification-submit resend'>Submit</button>
        <button disabled={disable} onClick={() => sendOtp(true)} className='verification-submit resend'>Resend</button>
        </div>  
    </div>
  )
}

export default Verification