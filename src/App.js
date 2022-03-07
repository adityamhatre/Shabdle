import './App.css';
import { KeyBoard } from './Keyboard/Keyboard';
import { GuessGrid } from './GuessGrid/GuessGrid';
function App() {
  sessionStorage.setItem('answerMap', JSON.stringify({}))
  sessionStorage.setItem('currentWordMap', JSON.stringify({}))
  sessionStorage.setItem('tryNumber', 0)
  sessionStorage.setItem('currentIndex', 0)
  sessionStorage.setItem('currentIndexInTry', 0)
  return (
    <>
      <GuessGrid />
      <KeyBoard />
    </>
  );
}

export default App;
