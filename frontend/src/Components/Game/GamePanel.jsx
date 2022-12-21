import React , { useState, useEffect } from 'react';
import "../../Styles/GamePanel.scss";
import ChooseCharacter from "./ChooseCharacter";
import Start from "./Start";
import Instance from "./Instance";
import axios from "axios";

const GamePanel = () => {
  const [handleStep, setHandleStep] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState({})
  useEffect(() => {
    let event = axios.get(`${process.env.REACT_APP_API_URL}/random_event/`)
    console.log(event)
  },[])

  const stepDisplay = () => {
   // switch statement
    switch (handleStep) {
      case 0:
        return (
          <ChooseCharacter
            handleStep={setHandleStep}
            setSelectedCharacter={setSelectedCharacter}
            selectedCharacter={selectedCharacter} />
        )
      case 1:
        return (
          <Start
            handleStep={setHandleStep}
            character={selectedCharacter}/>
        )
      case 2:
        return (
          <Instance />
        )
      default:
        return (
          <ChooseCharacter
            handleStep={setHandleStep}
            setSelectedCharacter={setSelectedCharacter}
            selectedCharacter={selectedCharacter} />
        )
    }
  }

  return (
    <div>
      <button onClick={() => setHandleStep(handleStep > 0 ? handleStep - 1 : 0)}>Back</button>
      {stepDisplay()}
    </div>
  )
}

export default GamePanel;