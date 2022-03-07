const wordList = require('../wordlist.json')
export const getClassName = (letter) => {
    const answerMap = JSON.parse(sessionStorage.getItem('answerMap'))
    const currentWordMap = JSON.parse(sessionStorage.getItem('currentWordMap'))
    const tryNumber = parseInt(sessionStorage.getItem('tryNumber'))
    const tileCount = parseInt(sessionStorage.getItem('tileCount'))
    const currentIndex = parseInt(sessionStorage.getItem('currentIndex'))
    const currentIndexInTry = parseInt(sessionStorage.getItem('currentIndexInTry'))

    let classToReturn = '';

    console.log(currentIndex, tileCount)
    if (currentIndexInTry > tileCount - 1) {
        classToReturn = 'key'
        return classToReturn
    }

    currentWordMap[currentIndexInTry] = letter

    document.getElementsByClassName('tile')[currentIndex].classList.add('flip')
    setTimeout(() => {
        document.getElementsByClassName('tile')[currentIndex].classList.remove('flip')
        document.getElementsByClassName('tile')[currentIndex].innerHTML = letter + document.getElementsByClassName('tile')[currentIndex].innerHTML
    }, 400);


    sessionStorage.setItem('currentWordMap', JSON.stringify(currentWordMap))
    sessionStorage.setItem('currentIndex', currentIndex + 1)
    sessionStorage.setItem('currentIndexInTry', currentIndexInTry + 1)

    if (Object.values(answerMap).includes(letter)) {
        if (answerMap[currentIndexInTry] === letter) {
            classToReturn = 'correct'
        } else {
            classToReturn = 'wrong-location'
        }
    } else { classToReturn = 'wrong' }

    document.getElementsByClassName('tile')[currentIndex].dataset.state = classToReturn
    return 'key ' + classToReturn
}

export const submitWord = () => {
    const answerMap = JSON.parse(sessionStorage.getItem('answerMap'))
    const currentWordMap = JSON.parse(sessionStorage.getItem('currentWordMap'))
    const tryNumber = parseInt(sessionStorage.getItem('tryNumber'))
    const tileCount = parseInt(sessionStorage.getItem('tileCount'))
    const currentIndex = parseInt(sessionStorage.getItem('currentIndex'))
    const currentIndexInTry = parseInt(sessionStorage.getItem('currentIndexInTry'))

    if (tileCount !== Object.keys(currentWordMap).length) {
        alert('fill all the tiles')
        return
    }
    else {
        checkWord()
    }
    sessionStorage.setItem('tryNumber', tryNumber + 1)
    sessionStorage.setItem('currentIndexInTry', 0)
    sessionStorage.setItem('currentWordMap', JSON.stringify({}))

}

const checkWord = () => {
    const answerMap = JSON.parse(sessionStorage.getItem('answerMap'))
    const currentWordMap = JSON.parse(sessionStorage.getItem('currentWordMap'))
    const tryNumber = parseInt(sessionStorage.getItem('tryNumber'))
    const tileCount = parseInt(sessionStorage.getItem('tileCount'))
    const currentIndex = parseInt(sessionStorage.getItem('currentIndex'))
    const currentIndexInTry = parseInt(sessionStorage.getItem('currentIndexInTry'))


    let word = ''

    for (let i = tileCount * tryNumber; i < currentIndex; i++) {
        word += document.getElementsByClassName('tile')[i].innerHTML
    }

    if (!wordList.includes(word)) {
        for (let i = tileCount * tryNumber; i < currentIndex; i++) {
            document.getElementsByClassName('tile')[i].classList.add('shake')
            setTimeout(() => {
                document.getElementsByClassName('tile')[i].classList.remove('shake')
            }, 400);
        }
    } else {
        let j = 0
        for (let i = tileCount * tryNumber; i < currentIndex; i++) {
            setTimeout(() => {
                document.getElementsByClassName('tile')[i].classList.add('dance')
                setTimeout(() => {
                    document.getElementsByClassName('tile')[i].classList.remove('dance')
                }, 400);
            }, (++j) * 100)

        }
    }



}