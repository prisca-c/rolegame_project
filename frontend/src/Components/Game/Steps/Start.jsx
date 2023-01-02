import React from "react" ;

const Start = (props) => {
  const character = props.character
  return (
    <div className={"start-panel"}>
      <h1>Welcome {character.name}</h1>
      <h2>Let's start your adventure</h2>
      <div className={"start-btn"}>
        <button onClick={()=>{props.handleStep(2)}}>Start a Game</button>
      </div>
    </div>
  )
}

export default Start;