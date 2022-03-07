import { GuessRow } from "../GuessRow/GuessRow";
import './GuessGrid.css';
export const GuessGrid = () => {
    const words = require("../wordlist.json");
    for (let i = 0; i < words.length; i++) {
        const word = words[i]['word']
        console.log('======')
        console.log(word)
        let letters = []
        for (let i = 0; i < word.length; i++) {
            letters.push(word[i])
        }
        console.log(letters)
        console.log('=======')
        console.log("")
    }

    const guessRows = (i) => {
        return <GuessRow tryNumber={i}></GuessRow>
    }

    return <div className="guess-grid">
        {guessRows(1)}
        {guessRows(2)}
        {guessRows(3)}
        {guessRows(4)}
        {guessRows(5)}
        {guessRows(6)}
        {guessRows(7)}
        {guessRows(8)}
    </div>
}

