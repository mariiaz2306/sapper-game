import React from "react";
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      <Game rows={10} cols={10} mines={20}/>
    </div>
  )
}
export default App;