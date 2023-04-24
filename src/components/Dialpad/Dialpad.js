import React, { useEffect, useState,useCallback } from 'react'
import "./Dialpad.css"
import {Star,XCircleFill,CheckCircleFill,StarFill} from "react-bootstrap-icons"
import { Col, Container, Row } from 'react-bootstrap'
import Toaster from '../utils/Toaster'
import { useNavigate } from 'react-router-dom'
import UnfillStar from "../../assets/images/Unfill-star.svg";
import FillStar from "../../assets/images/Fill-star.svg";

const Dialpad = () => {
  var count = 0;
  let tempPin = "";
  const navigate = useNavigate()
  const antivirus = ["KASPERSKY","MACFEE"]

  // const starsArr = [        <Star className='star-unfill' />,
  // <Star  className='star-unfill'/>,
  // <Star  className='star-unfill' />,
  // <Star  className='star-unfill'/>,
  // <Star  className='star-unfill' />,
  // <Star  className='star-unfill' />]

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
    let year,month,date = ""
    let combinedDate=""
    let currentDate = new Date("")
    for(let i=0;i<softwares.length;i++){
      if(softwares[i]?.DisplayName && softwares[i]?.Version){
        for (var j = antivirusArr.length - 1; j >= 0; --j) {
          if (softwares[i]?.DisplayName.toUpperCase().indexOf(antivirusArr[j]) !== -1) {
            let length = softwares[i]?.InstallDate.length
            year = softwares[i]?.InstallDate.slice(0,4)
            month = softwares[i]?.InstallDate.slice(year.length,year.length+2)
            date = softwares[i]?.InstallDate.slice(year.length+2,length)
            combinedDate = year.trim() + "-" + month.trim() + "-" + date.trim()
            const dateDiff = (currentDate.getTime()-new Date(combinedDate).getTime())/(24*3600*1000)
            if(Math.abs(dateDiff) > 7){
              setMsg("Ohh! Antivirus Outdated Please Update Your Antivirus")
            }
            setIsFound(true)
            setLoading(false)
            return
          }else{
            setLoading(false)
            setIsFound(false)
          }
        }
        // arr.push(softwares[i]?.DisplayName)
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
    // let res = await window.to_electron.enCryptPin("prince",tempPin)
    // localStorage.setItem("pin",res)
    // console.log("encryption response",res)
    navigate("/confirm-pin",  {
      state: {
        pin:tempPin
        //...values
      }})
    return
      }
    }
  }, []);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const setter = () => {
  //       document.addEventListener("keypress", function onPress(event) {
  //     // console.log(stars.length,"stars")
  //     const isNumber = isFinite(event.key);
  //     if(!isNumber){
  //       return
  //     }
  //     if(count_1 <6){
  //     console.log(pin,"pin2")
  //      stars[count_1] = <StarFill className='star-fill' />
  //      count_1++
  //     setCount(count+1)
  //      setStars(starsArr)
  //       setPin((prev) => prev + event.key)
  //     }

  // })
  // }
//   useEffect(() => {
//     setter()
//     console.log(count)
//     // console.log(starsArr,"stars1")
// //  const dialpad =    document.getElementsByClassName("dialpad-container")
// ;
//   },[count])

useEffect(() => {
  window.addEventListener("keydown", registerKeyPress);

  return () => window.removeEventListener("keydown",registerKeyPress  )
}, [registerKeyPress]);

  // useEffect(() => {
  //   var pattern = '0123456789012345789'

  //   if(pin.length === 6){
  //     console.log(pin.length,pin,pattern.indexOf(pin))
  //     if(pattern.indexOf(pin) !== -1) {
  //       console.log(pin,"pins")
  //       Toaster("error","Don't Enter Numbers In Sequence");
  //       for(let i=0;i<6;i++){
  //         starsArr[i] =   <Star  className='star-unfill'/>
  //       }
  //     //  setCount(0)
  //     setCount(0)
  //     count_1=0;
  //       setPin("")
  //       setStars(starsArr)
  //       return
  //     }
  //   }
  // },[pin.length])
  const numbers=[1,2,3,4,5,6,7,8,9,<XCircleFill className='cross' />,0,<CheckCircleFill className='correct'/>]

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