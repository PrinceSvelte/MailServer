import React from 'react'
import { useLocation } from 'react-router-dom'
import "./FinalPage.css"

const FinalPage = () => {
    const {state} = useLocation()
  return (
    <div className='final-page' style={{display:"flex",justifyContent:"center",alignItems:"center",alignSelf:"center",height:"100vh"}}>
        <webview src={`${process.env.REACT_APP_FINAL_URL}?otp=${state?.otp}`} style={{height:"100vh",width:"100%"}} ></webview>
    </div>
  )
}

export default FinalPage