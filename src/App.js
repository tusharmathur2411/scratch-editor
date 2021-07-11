import './styles/App.css';
import React, { useState, useEffect, useRef } from 'react';
import Motion from './Components/Motion';
import CatSprite from './Components/CatSprite'
import Events from './Components/Events'
import { Droppable } from "react-drag-and-drop";

function App() {

  const [position, setPosition] = useState({x: 0, y: 0, direction: 90})
  const [currFunc, setCurrFunc] = useState(null)
  const [functions, setFunctions] = useState([])
  const sprite1 = useRef()
  const droppable = useRef()
  const flag = useRef()
  const [dropped, setDropped] = useState({x:0, y:0})

  const updatePosition = () => 
    setPosition(d =>{
      const tr = sprite1.current.style.transform.split("(")
      const deg = parseInt(tr[tr.length-1])||0
      return {
        ...d,
        x: parseInt(sprite1.current.style.left || 0),
        y: parseInt(sprite1.current.style.top || 0),
        direction: 90+deg
      }
      
    }
  )

  const executeAll = () => {
    functions.forEach(f => f())
  }

  const getDirection = pd => {
    if (pd>=360||pd<-360) return getDirection(pd%360)
    return pd>180&&pd<360?-(pd%180):pd
  }

  const handleDrop = (data) => {
    console.log(data)
    if (data.motion==1) {
      const elClone = currFunc.el.cloneNode(true)
      const newEl = droppable.current.appendChild(elClone)
      setFunctions(fl => [...fl, currFunc.fn])
    }
    else {
      const elClone = currFunc.el.cloneNode(true)
      console.log(droppable.current.insertBefore(elClone, droppable.current.firstChild))
      flag.current.addEventListener("click", executeAll)
    }
  }
  
  useEffect(() => {
    updatePosition()
  }, [sprite1])

  
  useEffect(() => {
    console.log(currFunc)
  }, [currFunc])

  return (
    <div className="App">
      <div className="code">
        <Motion sprite={sprite1.current} setPosition={updatePosition} setCurrFunc={setCurrFunc} />
        <Events setCurrFunc={setCurrFunc} />
      </div>
      <Droppable types={["motion", "event"]} className="mid" onDrop={handleDrop} onDragOver={e => setDropped({x: e.clientX-droppable.current.offsetLeft , y: e.clientY-droppable.current.offsetTop})} >
        <div ref={droppable} className="compiler"></div>
      </Droppable>
      <div>
        <div className="canvas-header">
        <img src="https://img.icons8.com/material-rounded/24/fa314a/flag.png" alt="" ref={flag} />
        </div>
        <div className="canvas">
          <div className="i-canvas">
            <CatSprite ref={sprite1} id="sprite1" />
          </div>
        </div>
        <div>
          <b>x: {position.x}</b><br/>
          <b>y: {position.y*-1}</b><br/>
          <b>Direction: {getDirection(position.direction)}</b><br/>
        </div>
      </div>
    </div>
  );
}

export default App;
