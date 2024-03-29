import React, {useEffect, useState} from "react";
import {getAllCharacters, deleteCharacter, createCharacter, modifyCharacter} from "../../../Data/characters";
import {getAllClasses} from "../../../Data/classes";

const AdminCharacters = () => {

  const [characters, setCharacters] = useState([]); // Hold all characters
  const [editedCharacter, setEditedCharacter] = useState({}); // Hold the character to be edited
  const [classes, setClasses] = useState([]) // Hold all classes
  const [classStats, setClassStats] = useState([classes[0]]) // Hold stats oh current class
  const [ handleUpdate, setHandleUpdate ] = useState(1); // Handle the re-render of the list of characters
  const [ showModifyForm, setShowModifyForm ] = useState(false); // Show the modify form
  const [ showCreateForm, setShowCreateForm ] = useState(false); // Show the create form

  // Handle the initial fetch of all characters
  useEffect(() => {
    getAllCharacters().then((characters) => {
      setCharacters(characters);
    })
    getAllClasses().then((classes) => {
      setClasses(classes)
    })
  }, [handleUpdate]);

  // Handle Character deletion
  const handleDelete = (e) => {
    deleteCharacter(e.currentTarget.value).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
  }

  const handleShowCreate = () => {
    setShowModifyForm(false);
    setShowCreateForm(true);
  }

  const displayCharacters = () => {
    // Handle Modify form display state
    const handleShowModify = (e) => {
      // Get the character to be edited
      const character = characters.find((character) => {
        return character.id === e.currentTarget.value;
      })
      setEditedCharacter(character); // Set the character to be edited
      setShowCreateForm(false); // Hide the create form
      setShowModifyForm(true); // Show the modify form
    }

    // Display the list of characters
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
            <button value={character.id} onClick={handleShowModify}>Modify</button>
            <button value={character.id} onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  // Display the Modify form
  const modifyCharacterForm = () => {

    // Handle changes of the modified character
    const handleEditCharacter = (e) => {
      setEditedCharacter({...editedCharacter, [e.currentTarget.name]: e.currentTarget.value})
    }

    // Handle the submission of the modified character
    const handleModifySubmit = (e) => {
      e.preventDefault();

      const id = editedCharacter.id;

      const character = {
        'name': e.currentTarget.name.value,
        'class': e.currentTarget.class.value
      }

      // Send the modified character to the backend
      modifyCharacter(id, character).then(() => {
        setHandleUpdate(handleUpdate + 1);
        setShowModifyForm(false);
      })
    }

    // Display the Modify form
    return (
      <form onSubmit={handleModifySubmit} className={"form"}>
        <input type="hidden" name="id" value={editedCharacter.id}/>
        <h2>Modify Character</h2>
        <p><strong>ID Character: {editedCharacter.id}</strong></p>
        <div className={'form-group'}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={editedCharacter.name} onChange={handleEditCharacter} />
        </div>
        <div className={'form-group'}>
          <label htmlFor="class">Class</label>
          <select name="class" id="class" value={editedCharacter.class} onChange={handleEditCharacter}>
            {classes.map((classItem) => {
              return (
                <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
              )
            })}
          </select>
        </div>
        <div className={'form-group'}>
          <label htmlFor="hp">Hp</label>
          <input type="number" name="hp" id="hp" value={editedCharacter.hp} onChange={handleEditCharacter}/>
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

  // Display the Create form
  const addCharacterForm = () => {

    // Handle the submission of the new character
    const handleAddForm = (e) => {
      e.preventDefault();

      const character = {
        'name': e.currentTarget.name.value,
        'class': parseInt(e.currentTarget.class.value)
      }

      console.log(character);
      // Send the new character to the backend
      createCharacter(character).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    const handleClassStats = (e) => {
      const classId = parseInt(e.currentTarget.value);
      const classItem = classes.find((item) => {
        return item.id === classId;
      })
      setClassStats(classItem);
    }

    // Display the Create form
    return (
      <form className={"form"} method="POST" onSubmit={handleAddForm}>
        <h2>Add Character</h2>
        <div className={'form-group'}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name"/>
        </div>
        <div className={'form-group'}>
          <label>Class</label>
          <select name="class" onChange={handleClassStats}>
            {classes.map((classItem) => {
              return (
                <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
              )
            })}
          </select>
        </div>
        <p>{classStats.hp}</p>
        <p>{classStats.ability}</p>
        <p>{classStats.strength}</p>
        <div className={'btn-group'}>
          <button type="submit" className={"btn--green"}>Add</button>
          <button onClick={() => setShowCreateForm(false)} className={"btn--red"}>Cancel</button>
        </div>
      </form>
    )
  }

  // Display Characters Panel
  return (
    <div>
      <table className={"table"}>
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
      {showCreateForm ? addCharacterForm() : <button onClick={handleShowCreate}>Add Character</button>}
      {showModifyForm ? modifyCharacterForm() : null}

    </div>
  );
}

export default AdminCharacters;