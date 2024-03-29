import { Key } from "../Key/Key"
import "./Keyboard.css";
const letters = require("../letters.json")

export function KeyBoard() {
    const vowels = letters.vowels
    const consonants = letters.consonants

    const row = (index) => {
        const arr = [1, 2].includes(index) ? vowels : consonants
        if (index > 2) {
            index = index - 2
        }
        const start = 6 * (index - 1)
        const end = start + 6

        return (
            <>
                {arr.slice(start, end).map(letter => <Key key={letter}>{letter}</Key>)}
            </>
        )
    }



    return <div className="keyboard">
        {row(1)}
        {row(2)}
        {row(3)}
        {row(4)}
        {row(5)}
        {row(6)}
        {row(7)}
        {row(8)}
        <Key key="submit">submit</Key>
        <Key key="del">del</Key>
    </div>
}
