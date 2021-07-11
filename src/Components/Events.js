import React from 'react'
import { Draggable } from "react-drag-and-drop";

const Events = ({id, setPosition, sprite, setCurrFunc}) => {
    return (
        <>
            <h2>Events</h2>
            <Draggable type="event" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: "flag"}))}>
                <div className="motion event">
                    When <img src="https://img.icons8.com/material-rounded/24/fa314a/flag.png" alt="" /> clicked
                </div>
            </Draggable>            
        </>
    )
}

export default Events
