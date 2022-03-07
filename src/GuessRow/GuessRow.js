import './GuessRow.css';
export const GuessRow = (props) => {
    const { tryNumber } = props;
    const word = sessionStorage.getItem('word');

    const letters = word.split("");
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

    const fullLetters = letters.filter(letter => !halfLettersList.includes(letter));

    const map = {}
    const fillHalfLetters = () => {

        let ti = 0
        for (let i = 0; i < letters.length; i++) {
            const nl = letters[i + 1]
            if (halfLettersList.includes(nl)) {
                map[ti] = nl
            } else {
                ti++
            }
        }
    }
    fillHalfLetters()
    const answerMap = {}
    const saveIndexes = () => {
        let j = 0
        for (let i = 0; i < letters.length; i++) {
            if (!halfLettersList.includes(letters[i])) {
                answerMap[j++] = letters[i]
            }
        }
    }
    saveIndexes()
    sessionStorage.setItem('answerMap', JSON.stringify(answerMap))

    document.documentElement.style.setProperty('--length', fullLetters.length);
    sessionStorage.setItem('tileCount', fullLetters.length);
    sessionStorage.setItem('guessRow', JSON.stringify(map))
    return fullLetters.map((letter, index) => <div key={index} className="tile">{map[index]}</div>)
}