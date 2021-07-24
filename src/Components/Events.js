import React, { useState } from 'react'
import { Draggable } from "react-drag-and-drop";

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const Events = ({id, setPosition, sprite, setCurrFunc}) => {

    const [selectedKey, setSelectedKey] = useState("Space")

    return (
        <>
            <h2>Events</h2>
            <Draggable type="event" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: "flag"}))}>
                <div className="motion event">
                    When <img src="https://img.icons8.com/material-rounded/24/fa314a/flag.png" alt="" /> clicked
                </div>
            </Draggable>
            <Draggable type="event" data={1} onDragStart={(e) => setCurrFunc(x => ({el: e.target.childNodes[0], fn: selectedKey}))}>
                <div className="motion event">
                    When
                    <select
                        value={selectedKey}
                        onChange={e => setSelectedKey(e.target.value)}
                    >
                        <option value="Space">space</option>
                        {keys.map(key => <option key={key} value={`Key${key.toUpperCase()}`}>{key}</option>)}
                    </select>
                    pressed
                </div>
            </Draggable>
        </>
    )
}

export default Events
