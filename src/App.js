// import sprite from './sprite.png';
import './styles/App.css';
import { useState, useEffect, useRef } from 'react';
import Motion from './Components/Motion';
import CatSprite from './Components/CatSprite'

function App() {

  const [position, setPosition] = useState({x: 0, y: 0, direction: 90})
  const sprite1 = useRef()

  const updatePosition = () => 
    setPosition(d =>{
      const tr = sprite1.current.style.transform.split("(")
      const deg = parseInt(tr[tr.length-1])||0
      return {
        ...d,
        x: parseInt(sprite1.current.style.left || 0),
        y: parseInt(sprite1.current.style.top || 0),
        direction: 90+ deg
      }
      
    }
  )  
  
  useEffect(() => {
    updatePosition()
  }, [sprite1])

  return (
    <div className="App">
      <div className="code">
        <Motion sprite={sprite1.current} setPosition={updatePosition} />

      </div>
      <div>
        <div className="canvas-header">
        <img src="https://img.icons8.com/material-rounded/24/fa314a/flag.png" alt="" />
        </div>
        <div className="canvas">
          <div className="i-canvas">
            {/* <img src={sprite} ref={sprite1} alt="sprite" id="sprite1" /> */}
            <CatSprite ref={sprite1} id="sprite1" />
          </div>
        </div>
        <div>
          <b>x: {position.x}</b><br/>
          <b>y: {position.y*-1}</b><br/>
          <b>Direction: {position.direction}</b><br/>
        </div>
      </div>
    </div>
  );
}

export default App;
