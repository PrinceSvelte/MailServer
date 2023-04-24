import React from 'react'
import { useLocation } from 'react-router-dom'
import "./FinalPage.css"

const FinalPage = () => {
    const {state} = useLocation()
  return (
    <div className='final-page' style={{display:"flex",justifyContent:"center",alignItems:"center",alignSelf:"center",height:"100vh"}}>
        <webview src={`https://192.168.15.19/mail/?otp=${state?.otp}&email=${state?.email}`} style={{height:"100vh",width:"100%"}} ></webview>
    </div>
  )
}

export default FinalPage