import React, {useEffect, useState} from "react";
import {getAllCharacters, deleteCharacter, createCharacter, modifyCharacter} from "../../Data/characters";
import '../../Styles/characters.css';

const AdminCharacters = () => {

  const [characters, setCharacters] = useState([]);
  const [ editedCharacter, setEditedCharacter ] = useState({});
  const [ handleUpdate, setHandleUpdate ] = useState(1);
  const [ showModifyForm, setShowModifyForm ] = useState(false);
  const [ showCreateForm, setShowCreateForm ] = useState(false);

  useEffect(() => {
    getAllCharacters().then((characters) => {
      setCharacters(characters);
      console.log(characters)
    })
  }, [handleUpdate]);

  const handleDelete = (e) => {
    deleteCharacter(e.currentTarget.value).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
  }

  const handleModify = (e) => {
    setShowModifyForm(true)
    setEditedCharacter(characters.find(character => character.id === e.currentTarget.value))
  }

  const handleAddForm = (e) => {
    e.preventDefault();

    const character = {
      'name': e.currentTarget.name.value,
      'class': parseInt(e.currentTarget.class.value),
      'hp': parseInt(e.currentTarget.hp.value),
      'ability': parseInt(e.currentTarget.ability.value),
      'strength': parseInt(e.currentTarget.strength.value)
    }

    console.log(character);
    createCharacter(character).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
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
          <td>
            <button value={character.id} onClick={handleModify}>Modify</button>
            <button value={character.id} onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  const handleEditCharacter = (e) => {
    setEditedCharacter({...editedCharacter, [e.currentTarget.name]: e.currentTarget.value})
  }

  const modifyCharacterForm = () => {
    const handleModifyForm = (e) => {
      e.preventDefault();

      const id = editedCharacter.id;

      const character = {
        'name': e.currentTarget.name.value,
        'class': parseInt(e.currentTarget.class.value),
        'hp': parseInt(e.currentTarget.hp.value),
        'ability': parseInt(e.currentTarget.ability.value),
        'strength': parseInt(e.currentTarget.strength.value)
      }

      modifyCharacter(id, character).then(() => {
        setHandleUpdate(handleUpdate + 1);
        setShowModifyForm(false);
      })
    }

    return (
      <form onSubmit={handleModifyForm} className={"form_modify_character"}>
        <input type="hidden" name="id" value={editedCharacter.id}/>
        <div className={'form-group'}>
          <label htmlFor="name">Id</label>
          <p>{editedCharacter.id}</p>
        </div>
        <div className={'form-group'}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={editedCharacter.name} onChange={handleEditCharacter} />
        </div>
        <div className={'form-group'}>
          <label htmlFor="class">Class</label>
          <input type="number" name="class" id="class" value={editedCharacter.class} onChange={handleEditCharacter} />
        </div>
        <div className={'form-group'}>
          <label htmlFor="hp">Hp</label>
          <input type="number" name="hp" id="hp" value={editedCharacter.hp} onChange={handleEditCharacter} />
        </div>
        <div className={'form-group'}>
          <label htmlFor="ability">Ability</label>
          <input type="number" name="ability" id="ability" value={editedCharacter.ability} onChange={handleEditCharacter} />
        </div>
        <div className={'form-group'}>
          <label htmlFor="strength">Strength</label>
          <input type="number" name="strength" id="strength" value={editedCharacter.strength} onChange={handleEditCharacter} />
        </div>
        <div className={'btn-group'}>
          <button type="submit" className={"btn--green"}>Apply</button>
          <button onClick={() => setShowModifyForm(false)} className={"btn--red"}>Cancel</button>
        </div>
      </form>
    )
  }

  const addCharacterForm = () => {
    return (
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
        <input type="button" value="Cancel" onClick={() => setShowCreateForm(false)}/>
      </form>
    )
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
      <button onClick={() => setShowCreateForm(true)}>Add Character</button>
      {showModifyForm ? modifyCharacterForm() : null}
      {showCreateForm ? addCharacterForm() : null}

    </div>
  );
}

export default AdminCharacters;