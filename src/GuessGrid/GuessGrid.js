import { GuessRow } from "../GuessRow/GuessRow";
import './GuessGrid.css';
export const GuessGrid = () => {
    const words = require("../wordlist.json");
    const halfLettersList = ["ऀ",
        "ँ",
        "ं",
        "ः",
        "ऺ",
        "ऻ",
        "़",
        "ा",
        "ि",
        "ी",
        "ु",
        "ू",
        "ृ",
        "ॄ",
        "ॅ",
        "े",
        "ै",
        "ॉ",
        "ॊ",
        "ो",
        "ौ",
        "्",
        "ॏ"];

    const sequentialHalf = (word) => {
        const letters = word.split("");
        let i = 0;
        let j = 0;
        let k = 0;
        while (i < letters.length) {
            const letter = letters[i];
            if (halfLettersList.includes(letter)) {
                j = i + 1
                k = i + 2
                if (halfLettersList.includes(letters[j]) && halfLettersList.includes(letters[k])) {
                    return true
                }
            }
            i += 1
        }
        return false;
    }
    const getRandomWord = () => {
        const random = Math.floor(Math.random() * words.length);
        const word = words[random]
        if (word.split("").includes('्') || sequentialHalf(word)) {
            return getRandomWord();
        }

        return word;
    }

    const guessRows = (i) => {
        return <GuessRow tryNumber={i} />
    }

    sessionStorage.setItem('word', getRandomWord());

    return <div className="guess-grid">
        {guessRows(1)}
        {guessRows(2)}
        {guessRows(3)}
        {guessRows(4)}
        {guessRows(5)}
        {guessRows(6)}
        {guessRows(7)}
    </div>
}

