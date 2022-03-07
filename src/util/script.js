const wordList = require('../wordlist.json')

export const getClassName = (letter) => {
    const answerMap = JSON.parse(sessionStorage.getItem('answerMap'))
    const currentWordMap = JSON.parse(sessionStorage.getItem('currentWordMap'))
    const tryNumber = parseInt(sessionStorage.getItem('tryNumber'))
    const tileCount = parseInt(sessionStorage.getItem('tileCount'))
    const currentIndex = parseInt(sessionStorage.getItem('currentIndex'))
    const currentIndexInTry = parseInt(sessionStorage.getItem('currentIndexInTry'))

    let classToReturn = '';

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
    console.log('hey geek! the word is ' + sessionStorage.getItem('word'))

    let validWord = false;
    if (tileCount !== Object.keys(currentWordMap).length) {
        alert('fill all the tiles')
        return
    }
    else {
        validWord = checkWord()
    }
    if (validWord) {
        if (won()) {
            let j = 0
            for (let i = tileCount * tryNumber; i < currentIndex; i++) {
                setTimeout(() => {
                    document.getElementsByClassName('tile')[i].classList.add('dance')
                    setTimeout(() => {
                        document.getElementsByClassName('tile')[i].classList.remove('dance')
                    }, 400);
                }, (++j) * 100)
            }
            setTimeout(() => {
                alert('you won!')
            }, 1000);
        } else {
            setTimeout(() => {
                if (tryNumber === 7 - 1) {
                    alert('you lose. word was ' + sessionStorage.getItem('word'))
                }

            }, 1000)
        }

        sessionStorage.setItem('tryNumber', tryNumber + 1)
        sessionStorage.setItem('currentIndexInTry', 0)
        sessionStorage.setItem('currentWordMap', JSON.stringify({}))
    }
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
        return false
    } else {
        let j = 0
        return true
    }
}

const won = () => {
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
    return word === sessionStorage.getItem('word');
}

export const deleteLetter = () => {

    const answerMap = JSON.parse(sessionStorage.getItem('answerMap'))
    const currentWordMap = JSON.parse(sessionStorage.getItem('currentWordMap'))
    const tryNumber = parseInt(sessionStorage.getItem('tryNumber'))
    const tileCount = parseInt(sessionStorage.getItem('tileCount'))
    const currentIndex = parseInt(sessionStorage.getItem('currentIndex'))
    const currentIndexInTry = parseInt(sessionStorage.getItem('currentIndexInTry'))
    const guessRowMap = JSON.parse(sessionStorage.getItem('guessRow'))

    if (currentIndexInTry === 0) return

    document.getElementsByClassName('tile')[currentIndex - 1].innerHTML = guessRowMap[currentIndex - 1] || ''
    document.getElementsByClassName('tile')[currentIndex - 1].dataset.state = ''
    sessionStorage.setItem('currentIndex', currentIndex - 1)
    sessionStorage.setItem('currentIndexInTry', currentIndexInTry - 1)
}