import React, { useEffect, useState,useCallback } from 'react'
import "./Dialpad.css"
import Toaster from '../utils/Toaster'
import { useNavigate } from 'react-router-dom'
import UnfillStar from "../../assets/images/Unfill-star.svg";
import FillStar from "../../assets/images/Fill-star.svg";

const Dialpad = () => {
  var count = 0;
  let tempPin = "";
  const navigate = useNavigate()

  const starsArr = [
    < img src={UnfillStar} />,
    < img src={UnfillStar} />,
    < img src={UnfillStar} />,
    < img src={UnfillStar} />,
    < img src={UnfillStar} />,
    < img src={UnfillStar} />,
  ]


  const [stars,setStars] = useState(starsArr)
  const [pin, setPin] = useState("");
  const [softwares,setSoftwares] = useState([])
  const [isFound,setIsFound] = useState(false)
  const [loading,setLoading] = useState(true)
  const [msg,setMsg] = useState("")

  const antivirusArr = ["AVAST","KASPERSKY","MCFEE","AVIRA","AVG","BITDEFENDER","VIRUS"]

  const getData = async() => {  
    let res = await window.to_electron.getInstalledSoftwares()
    let arr = []
    arr = res
    setSoftwares(arr)
  }

  useEffect(() => {
    getData()
    // getVpn()
  },[])

  useEffect(() => {
    //FOR FUTURE REFERENCE
    // let year,month,date = ""
    // let combinedDate=""
    // let currentDate = new Date("")
    for(let i=0;i<softwares.length;i++){
      if(softwares[i]?.DisplayName && softwares[i]?.Version){
        for (var j = antivirusArr.length - 1; j >= 0; --j) {
          if (softwares[i]?.DisplayName.toUpperCase().indexOf(antivirusArr[j]) !== -1) {
            // let length = softwares[i]?.InstallDate.length
            // year = softwares[i]?.InstallDate.slice(0,4)
            // month = softwares[i]?.InstallDate.slice(year.length,year.length+2)
            // date = softwares[i]?.InstallDate.slice(year.length+2,length)
            // combinedDate = year.trim() + "-" + month.trim() + "-" + date.trim()
            // const dateDiff = (currentDate.getTime()-new Date(combinedDate).getTime())/(24*3600*1000)
            // if(Math.abs(dateDiff) > 7){=
            //   setMsg("Ohh! Antivirus Outdated Please Update Your Antivirus")
            // }
            setIsFound(true)
            setLoading(false)
            return
          }else{
            setLoading(false)
            setIsFound(false)
          }
        }
      }
    }
 

  },[softwares])

  const registerKeyPress = useCallback(async(event) => {
    if(event.key === "Backspace" && tempPin.length>0){
      tempPin = tempPin.substring(0, tempPin.length-1);
      setPin(tempPin)
      count--
      starsArr[count] = < img src={UnfillStar} />;
      return
  }
    const isNumber = isFinite(event.key);
    if (!isNumber) {
      return;
    }
    if (count < 5) {
      starsArr[count] = < img src={FillStar} />;
      setStars(starsArr);
      setPin((prev) => prev + event.key);
      tempPin += event.key;
      count++;
    } else {
      var pattern = "0123456789012345789";
      if (pattern.indexOf(tempPin) !== -1) {
        Toaster("error","Don't add number in sequence !!")
        for (let i = 0; i < 6; i++) {
          starsArr[i] = < img src={UnfillStar} />;
        }
        count = 0;
        setPin("");
        tempPin = ""
      } else {
        starsArr[count] =   < img src={FillStar} />;
        setStars(starsArr);
        tempPin += event.key;
        setPin(tempPin);
    navigate("/confirm-pin",  {
      state: {
        pin:tempPin
      }})
    return
      }
    }
  }, []);



useEffect(() => {
  window.addEventListener("keydown", registerKeyPress);

  return () => window.removeEventListener("keydown",registerKeyPress  )
}, [registerKeyPress]);



  return (
    <div className='dialpad-container'>
      {(loading && !isFound) ? <div className='message'><span>Please Wait While Antivirus Scanning is In progress ......</span></div>:isFound && msg.length > 0 ? <span className='error-message'>{msg}</span> : isFound && msg.length ===0 ? 
      <div className='input-pin'>
        <h2>Create Your Pin</h2>
        <div className='star'>
        {/* <Star className='star-unfill' />
        <Star  className='star-unfill'/>
        <Star  className='star-unfill' />
        <Star  className='star-unfill'/>
        <Star  className='star-unfill' />
        <Star  className='star-unfill' /> */}
        {stars.map((item,i) => {
          return (
          <span style={{margin:"5px"}} key={i}>{item}</span>
          )
        })}
        </div>
        </div>
:(!loading && !isFound)&&
 <div className='error-message'>
<span >Oops No Antivirus Found !<br/> Please Install Antivirus First.</span  >
</div> 
 }
        {/* <div className='numbers'> */}
          {/* <div className='group'> */}
            {/* {numbers.map((num,i) => {
              return (
               <span>{num}</span>
              )
            })} */}
            {/* <span>1</span>
            <span>2</span>
            <span>3</span> */}
          {/* </div> */}
    
        {/* </div> */}
    
    </div>
  )
}

export default Dialpad