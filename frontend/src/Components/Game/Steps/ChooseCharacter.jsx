import React, {useEffect, useState} from "react";
import {getCharacterByClass} from "../../../Data/characters";

const ChooseCharacter = (props) => {
  const [ characters, setCharacters ] = useState([])

  useEffect(() => {
    getCharacterByClass('character').then((characters) => {
      setCharacters(characters);
    })
  }, [props.selectedCharacter]);

  const displayCharacterList = () => {
    const handlePickedCharacter = (e) => {
      e.preventDefault();
      const character = characters.find((character) => {
        return character.id === parseInt(e.currentTarget.character.value);
      })
      props.setSelectedCharacter(character);
      props.handleStep(1)
    }

    return (
      <form className="form-choose-character" onSubmit={handlePickedCharacter}>
        <div className={"form-group"}>
          <label htmlFor="character">Choose your character</label>
          <select name="character" id="character">
            {characters.map((character) => {
              return (
                <option key={character.id} value={character.id}>{character.name}</option>
              )
            })}
          </select>
        </div>
        <button type="submit">Choose</button>
      </form>
    )
  }

  return (
    <>
      <h1>Role Game</h1>
      {displayCharacterList()}
    </>
  )
}

export default ChooseCharacter;