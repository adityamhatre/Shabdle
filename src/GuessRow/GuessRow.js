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
    document.documentElement.style.setProperty('--length', fullLetters.length);
    return fullLetters.map((letter, index) => <div key={index} className="tile">{map[index]}</div>)
}