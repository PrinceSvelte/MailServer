import React, { useState, useCallback, useEffect } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import UnfillStar from "../../assets/images/Unfill-star.svg";
import FillStar from "../../assets/images/Fill-star.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Toaster from "../utils/Toaster";

const CommonPin = (props) => {
  var count = 0;
  var tempPin = "";
  const [pin, setPin] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const starsArr = [
    <img src={UnfillStar} />,
    <img src={UnfillStar} />,
    <img src={UnfillStar} />,
    <img src={UnfillStar} />,
    <img src={UnfillStar} />,
    <img src={UnfillStar} />,
  ];

  const [stars, setStars] = useState(starsArr);

  const registerKeyPress = useCallback(async (event) => {
    if (event.key === "Backspace" && tempPin.length > 0) {
      tempPin = tempPin.substring(0, tempPin.length - 1);
      setPin(tempPin);
      count--;
      starsArr[count] = <img src={UnfillStar} />;
      return;
    }
    const isNumber = isFinite(event.key);
    if (!isNumber) {
      return;
    }
    if (count < 5) {
      starsArr[count] = <img src={FillStar} />;
      setStars(starsArr);
      setPin((prev) => prev + event.key);
      tempPin += event.key;
      count++;
    } else {
      starsArr[count] = <img src={FillStar} />;
      setStars(starsArr);
      tempPin += event.key;
      setPin(tempPin);
      let decryptedPin;
      if (tempPin.length === 6) {
        let secretPin = state?.pin;
        if (!state?.pin) {
          const storagePin = localStorage.getItem("token");
          decryptedPin = await window.to_electron.deCryptPin(storagePin);
        }
        if (decryptedPin) {
          secretPin = decryptedPin;
        }
        if (secretPin === tempPin) {
          Toaster("success", "Pin verified Successfully !");
          navigate("/register");
          if (decryptedPin) {
            return;
          } else {
            let res = await window.to_electron.enCryptPin(tempPin);
            localStorage.setItem("token", res);
            return;
          }
        } else {
          Toaster("error", "Please Enter Correct Pin !");
          for (let i = 0; i < 6; i++) {
            starsArr[i] = <img src={UnfillStar} />;
          }
          count = 0;
          setPin("");
          tempPin = "";
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", registerKeyPress);

    return () => window.removeEventListener("keydown", registerKeyPress);
  }, [registerKeyPress]);
  return (
    <div className="dialpad-container">
      <div className="input-pin">
        {props.children}
        <div className="star">
          {/* <Star className='star-unfill' />
            <Star  className='star-unfill'/>
            <Star  className='star-unfill' />
            <Star  className='star-unfill'/>
            <Star  className='star-unfill' />
            <Star  className='star-unfill' /> */}
          {stars.map((item, i) => {
            return (
              <span style={{ margin: "5px" }} key={i}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
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

      <div className="numbers-container"></div>
    </div>
  );
};

export default CommonPin;
