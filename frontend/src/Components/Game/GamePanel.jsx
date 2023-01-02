import React , { useState } from 'react';
import "../../Styles/GamePanel.scss";
import ChooseCharacter from "./Steps/ChooseCharacter";
import Start from "./Steps/Start";
import Instance from "./Steps/Instance";

const GamePanel = () => {
  const [handleStep, setHandleStep] = useState(0)
  const [selectedCharacter, setSelectedCharacter] = useState({})

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
          <Instance
            character={selectedCharacter}
            handleStep={setHandleStep}/>
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