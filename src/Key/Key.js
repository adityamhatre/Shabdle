import { useState } from 'react';
import './Key.css'

export function Key(props) {
    const letter = props.children;


    const [className, setClassName] = useState("key")
    const [clicked, setClicked] = useState(false)
    const wrong = "wrong"
    const correct = "correct"
    const wrongLocation = "wrong-location"

    const handleClick = () => {
        if (clicked) return
        setClicked(true)
        setClassName(`key ${Math.random() < 0.33 ? wrong : Math.random() < 0.66 ? correct : wrongLocation}`)
    }

    return <button className={className} onClick={handleClick}>{letter}</button>
}
