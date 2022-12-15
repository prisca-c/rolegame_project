import React, {useEffect, useState} from "react";
import {getAllCharacters, deleteCharacter, createCharacter} from "../Data/characters";
import '../Styles/characters.css';

const Characters = () => {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getAllCharacters().then((characters) => {
      setCharacters(characters);
    })
  }, []);

  const handleDelete = (e) => {
    deleteCharacter(e.currentTarget.value)
  }

  const handleAddForm = (e) => {
    e.preventDefault();


    //createCharacter(JSON.stringify(character))
  }

  const displayCharacters = () => {
    return characters.map((character) => {
      return (
        <tr key={character.id}>
          <td>{character.id}</td>
          <td>{character.name}</td>
          <td>{character.class_name}</td>
          <td>{character.hp}</td>
          <td>{character.ability}</td>
          <td>{character.strength}</td>
          <td><button value={character.id} onClick={handleDelete}>Delete</button></td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h1>Characters</h1>
      <table className={"table_character"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>HP</th>
            <th>Ability</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {displayCharacters()}
        </tbody>
      </table>

      <form className={"form_add_character"} method="POST" onSubmit={handleAddForm}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name"/>
        <label>Class</label>
        <input type="number" name="class" placeholder="Class"/>
        <label>HP</label>
        <input type="number" name="hp" placeholder="HP"/>
        <label>Ability</label>
        <input type="number" name="ability" placeholder="Ability"/>
        <label>Strength</label>
        <input type="number" name="strength" placeholder="Strength"/>
        <input type="submit" value="Add Character"/>
      </form>
    </div>
  );
}

export default Characters;