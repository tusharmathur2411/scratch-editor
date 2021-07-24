import React, { useState, useEffect } from 'react'
import "../styles/Motion.css";
import { Draggable } from "react-drag-and-drop"

const Motion = ({id, setPosition, sprite, setCurrFunc}) => {

    const [steps, setSteps] = useState(10)
    const [clock, setClock] = useState(15)
    const [counterClock, setCounterClock] = useState(15)
    const [myPos, setMyPos] = useState({x:0, y:0})

    const toRad = angle => {
        return angle * (Math.PI / 180);
    }

    useEffect(() => {
        var observer = new MutationObserver(mutations => setPosition());  
        var target = document.getElementById("sprite1");
        observer.observe(target, { attributes : true, attributeFilter : ['style'] });

        return () => observer.disconnect();
    }, [id, setPosition])

    const handleInputChange = e => ["-", ""].includes(e.target.value)?e.target.value:Number(e.target.value)

    const onMove = e => {
        return (e) => {
            if (e?.target.tagName === "INPUT") return
            const tr = sprite.style.transform.split("(")
            const angle = toRad(parseInt(tr[tr.length-1])||0)
            const x = parseInt(sprite.style.left) || 0
            const y = parseInt(sprite.style.top) || 0
            const xd = Math.cos(angle) * steps
            const yd = Math.sin(angle) * steps
            sprite.style.left = `${x+xd}px`
            sprite.style.top = `${y+yd}px`
        }
    }

    const onTurn = (e, dir) => {
        return (e) => {
            if (e?.target.tagName === "INPUT") return
            const tr = sprite.style.transform.split("(")
            const deg = parseInt(tr[tr.length-1])||0
            sprite.style.transform = `translate(-50%,-50%) rotate(${dir==="+"?deg+clock:deg-counterClock}deg)`
        }
    }

    const goToPos = (e, x, y) => {
        return (e) => {
            if (e?.target.tagName === "INPUT") return
            sprite.style.left = `${x}px`
            sprite.style.top = `${y}px`
        }
    }

    return (
        <>
            <h2>Motions</h2>
            <Draggable type="motion" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.firstChild, fn: onMove()}))}>
                <div className="motion" onClick={(e => onMove(e))()}>
                    Move<input value={steps} onChange={e => setSteps(handleInputChange(e))} onClick={null} />steps
                </div>
            </Draggable>
            <Draggable type="motion" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: onTurn("", "+")}))}>
                <div className="motion" onClick={(e => onTurn(e, "+"))()}>
                    Turn <img src="https://img.icons8.com/fluent/25/ffffff/restart.png" alt=""/> <input value={clock} onChange={e => setClock(handleInputChange(e))} onClick={null} /> degrees
                </div>
            </Draggable>
            <Draggable type="motion" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: onTurn("", "-")}))}>
                <div className="motion" onClick={(e => onTurn(e, "-")())}>
                    Turn <img style={{transform: "rotateY(180deg)"}} src="https://img.icons8.com/fluent/25/ffffff/restart.png" alt=""/> <input value={counterClock} onChange={e => setCounterClock(handleInputChange(e))} onClick={null} /> degrees
                </div>
            </Draggable>
            <Draggable type="motion" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: goToPos("", myPos.x, myPos.y)}))}>
                <div className="motion" onClick={(e => goToPos(e, myPos.x, myPos.y))()}>
                    Go to x: 
                    <input value={myPos.x} onChange={e => setMyPos(p => ({...p, x:handleInputChange(e)}))} onClick={null} />
                    y: 
                    <input value={myPos.y} onChange={e => setMyPos(p => ({...p, y:handleInputChange(e)}))} onClick={null} />
                </div>
            </Draggable>
            
        </>
    )
}

export default Motion
