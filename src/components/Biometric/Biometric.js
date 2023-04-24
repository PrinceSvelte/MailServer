import { SignIn, verificationResult, availabilityStatus } from 'react-native-windows-hello';

import React, { useEffect } from 'react'



const Biometric = () => {
    useEffect(() => {
        SignIn.requestConsentVerification("This customized message will be displayed in biometric prompt")
  .then(result => {
    alert(
      `${result === verificationResult.Verified ? "SUCCESS" : "ERROR"}`,
      result.message
    );
  })
  .catch(error => {
    alert("ERROR:", `${error}`);
  });
    },[])
  return (
    <div>Biometric</div>
  )
}

export default Biometric