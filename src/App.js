import React, { useEffect, useRef, useState } from "react";
import './App.css';
import axios from "axios";
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.clouds.min.js'

function App() {
  const[situ, setSitu] = useState ('');
  const[weather , setWeather]  = useState({})
  const KEY = "097a70bee629f4808d4fcfb53101f964";

  const getWeather = (setName)=>{
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${situ}&appid=${KEY}`)
    .then(({data})=>setWeather(data)).catch((error)=>{err()});
    setSitu('')
    const err = ()=>{
      if(situ === ""){
        alert ("вы не ввели город")
      }else{
        alert ("вы не правильно ввели город")
      }
    }
   
  }

  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(useRef);
  useEffect(() => {
    if (!vantaEffect) {
        setVantaEffect(NET({
            el: myRef.current,
            THREE: THREE,
            maxDistance: 22.00,
            points: 20.00,
        }))
    }
    return () => {
        if (vantaEffect) vantaEffect.destroy()
    }
}, [vantaEffect]);
  return(
    <div className="App">
      <div className="vanta" ref={myRef}></div>
      <div className="content">
      <div className="input">
      <h1>Расул Таалайбекович</h1>
        <input className="inputt" placeholder="Введите город" value={situ} onChange={(e)=>setSitu(e.target.value)} type="text" />
        <button onClick={getWeather} className="btn">показать</button>
        </div>
        {/* {JSON.stringify(weather)} */}
        {JSON.stringify(weather )==="{}" ? <p className="p">здесь будет ваша погода</p>:
        <table className='table' border="1"> 
        <tr>
          <td>Страна</td>
          <td>{weather.sys.country}</td>
        </tr>
        <tr>
          <td>Город</td>
          <td>{weather.name}</td>
        </tr>
        <tr>
          <td>Погода</td>
          <td>{(weather.main.temp -273.15).toFixed(1)}°c</td>
        </tr>
        <tr>
          <td>описание</td>
          <td className='subtitle'> <img className="clood" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /></td>
        </tr>
        <tr>
          <td>ветер</td>
          <td>{weather.wind.speed}м/с</td>
        </tr>
        
      </table>
}
      </div>
    </div>
  )
  
}
export default App;

