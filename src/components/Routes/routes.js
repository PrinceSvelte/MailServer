import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Confirmpin from '../ConfirmPin/ConfirmPin'


// import Biometric from '../Biometric/Biometric'
import Dialpad from '../Dialpad/Dialpad'
import EnterPin from '../EnterPin/EnterPin'
import FinalPage from '../FinalPage/FinalPage'
import FirstScreen from '../FirstScreen/Login'
import Verification from '../Verification/Verification'

const AppRouter = () => {
    const isRegitered = localStorage.getItem("isRegistered")
    const isPin = localStorage.getItem("token")
  return (
<Routes>
    {/* <Route path="/"  element={<Biometric />} /> */}
    {/* <Route path="/" element = {<Verification />} /> */}
    <Route path="/" element={isPin ? <EnterPin /> :<Dialpad />} />

    <Route path='/register' element={isRegitered ? <Verification /> :<FirstScreen />} />
    <Route path="/confirm-pin" element={<Confirmpin /> } />
    <Route path="/otp" element = {<Verification />} />
    <Route path="/final-page" element={<FinalPage />} />
</Routes>
  )
}

export default AppRouter