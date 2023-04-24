import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import FirstScreen from './components/FirstScreen/Login';
import DialPad from './components/Dialpad/Dialpad';
import Verification from './components/Verification/Verification';

function App() {
  const [softwares,setSoftwares] = useState([])
  const [isFound,setIsFound] = useState(false)

  const getVpn = async() => {
    const resp1 = await window.to_electron.connectVPN()
    console.log(resp1,"resp1")
  }
  const getData = async() => {
    console.log(window,"window")
  
    let res = await window.to_electron.getInstalledSoftwares()
    let arr = []
    arr = res
    console.log(res,"res",Array.isArray(res))
    setSoftwares(arr)
  }
  useEffect(() => {
    // getData()
    getVpn()
  },[])

  const antivirus = ["AVAST","KASPERSKY","MACFEE"]

  return (
    <div className="App">
      {console.log(softwares[1],"soft",softwares.length)}
      <div>
      {/* <h1>Installed Softwares</h1> */}
            {softwares.map((item,i) => {
              if(item.DisplayName?.includes("Avast Secure") && item?.Version){
              return (
                <div>
                  {/* {`${item?.DisplayName} || version :${item?.Version} || Date:${item?.InstallDate} length:::${Object.keys(item).length}`} */}
                {/* <FirstScreen /> */}
               
                {/* <DialPad /> */}
                {/* <Verification /> */}
                <h1>YAyyy</h1>
                </div>
                // </li>
              )
              }else {
                <h1>You can't proceed Please install Antivirus First</h1>
              }
            } )}
      </div>
    </div>
  );
}

export default App;
