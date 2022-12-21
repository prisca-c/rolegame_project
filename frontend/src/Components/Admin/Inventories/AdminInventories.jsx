import React, { useEffect, useState } from "react";
import { getAllInventories, getInventory, addItemToInventory, modifyInventoryItem, deleteInventoryItem, deleteInventory } from "../../../Data/inventories";
import { getAllCharacters } from "../../../Data/characters";
import { getAllObjects } from "../../../Data/objects";

const AdminInventories = () => {

    const [inventories, setInventories] = useState([]); // Hold all inventories
    const [ characterInventory, setCharacterInventory ] = useState(0); // Hold the inventory of the selected character
    const [ editedInventory, setEditedInventory ] = useState({}); // Hold the inventory to be edited
    const [ showModifyForm, setShowModifyForm ] = useState(false); // Show the modify form
    const [ showCreateForm, setShowCreateForm ] = useState(false); // Show the create form
    const [ showFilterForm, setShowFilterForm ] = useState(false); // Show the filter form
    const [ handleUpdate, setHandleUpdate ] = useState(1); // Handle the re-render of the list of inventories
    const [characters, setCharacters] = useState([]); // Hold all characters
    const [objects, setObjects] = useState([]); // Hold all objects

    // Handle the initial fetch of all inventories, characters and objects
    useEffect(() => {
      if(characterInventory === 0){
        getAllInventories().then((inventories) => {
          setInventories(inventories);
        })
      } else {
        getInventory(characterInventory).then((inventory) => {
          setInventories(inventory);
        })
      }

      getAllCharacters().then((characters) => {
        setCharacters(characters);
      })

      getAllObjects().then((objects) => {
        setObjects(objects);
      })
    },[handleUpdate]);

    // Handle Create form display state
    const handleShowCreate = () => {
      setShowModifyForm(false); // Hide the modify form
      setShowFilterForm(false); // Hide the filter form
      setShowCreateForm(true); // Show the create form
    }

    // Handle Filter form display state
    const handleShowFilter = () => {
      setShowModifyForm(false); // Hide the filter form
      setShowCreateForm(false); // Hide the create form
      setShowFilterForm(true); // Show the filter form
    }

    // Display Filter Modal
    const filterModal = () => {
      //Handle filter by character
      const handleFilter = (e) => {
        e.preventDefault();
        setCharacterInventory(e.currentTarget.character.value);
        setHandleUpdate(handleUpdate + 1);
        setShowFilterForm(false);
      }

      // Handle Reset filter
      const handleReset = () => {
        setCharacterInventory(0);
        setHandleUpdate(handleUpdate + 1);
        setShowFilterForm(false);
      }

        // Display the filter form
      return (
        <form className="form-filter" onSubmit={handleFilter}>
          <button className="close-btn" onClick={()=> setShowFilterForm(false)}>X</button>
          <h2>Filter Inventory</h2>
          <div className={"form-group"}>
            <label htmlFor="character">Character</label>
            <select name="character" id="character">
              {characters.map((character) => {
                return (
                  <option key={character.id} value={character.id}>{character.name}</option>
                )
              })}
            </select>
          </div>
          <div className={"btn-group"}>
            <button type="submit">Filter</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      )
    }

    const displayInventories = () => {
      // Handle Modify form display state
      const handleShowModify = (e) => {
        // Get the inventory to be edited
        const inventory = inventories.find((inventory) => {
          return inventory.id === parseInt(e.currentTarget.value);
        });
        setEditedInventory(inventory); // Set the inventory to be edited
        setShowCreateForm(false); // Hide the create form
        setShowModifyForm(true); // Show the modify form
      }

      // Handle Inventory deletion
      const handleDeleteItem = (character_id, id) => {
        deleteInventoryItem(character_id, id).then(() => {
          setHandleUpdate(handleUpdate + 1);
        })
        console.log(id)
        console.log(character_id)
      }

      // Display the list of inventories
      return inventories.map((inventory) => {
        return (
          <tr key={inventory.id}>
            <td>{inventory.id}</td>
            <td>{inventory.id_character}</td>
            <td>{inventory.character_name}</td>
            <td>{inventory.id_object}</td>
            <td>{inventory.object_name}</td>
            <td>{inventory.quantity}</td>
            <td>
              <button value={inventory.id} onClick={handleShowModify}>Modify</button>
              <button onClick={() => handleDeleteItem(inventory.id_character, inventory.id)}>Delete</button>
            </td>
          </tr>
        )
      })
    }

    // Display the Create form
    const addInventoryForm = () => {

      const getCharacters = () => {
        getAllCharacters().then((characters) => {
          setCharacters(characters);
        })
      }

      // Handle create form submission
      const handleAddForm = (e) => {
        e.preventDefault();

        const inventory = {
          'id_character': e.currentTarget.id_character.value,
          'id_object': e.currentTarget.id_object.value,
          'quantity': e.currentTarget.quantity.value
        }

        console.log(inventory);
        // Send the inventory to the backend
        addItemToInventory(inventory).then(() => {
          setHandleUpdate(handleUpdate + 1);
        })

        setShowCreateForm(false);
      }

      // Display the create form
      return (
        <form className="form" onSubmit={handleAddForm}>
          <h2>Add Inventory</h2>
          <div className={"form-group"}>
            <label htmlFor="character">Character</label>
            <select name="id_character" id="character" onChange={getCharacters}>
              {characters.map((character) => {
                return (
                  <option key={character.id} value={character.id}>
                      {character.id}: {character.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={"form-group"}>
            <label htmlFor="Object">Object</label>
            <select name="id_object" id="object">
              {objects.map((object) => {
                return (
                  <option key={object.id} value={object.id}>
                      {object.id}: {object.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={"form-group"}>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" name="quantity" id="quantity" />
          </div>
          <div className={"btn-group"}>
            <button type="submit" className={"btn--green"}>Add</button>
            <button type="button" className={"btn--red"} onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </form>
      )
    }

    // Display the Modify form
    const modifyInventoryForm = () => {

        // Handle modify form submission
        const handleModifyForm = (e) => {
          e.preventDefault();

          const inventory = {
            'id': editedInventory.id,
            'id_character': e.currentTarget.id_character.value,
            'id_object': e.currentTarget.id_object.value,
            'quantity': e.currentTarget.quantity.value
          }

          console.log(inventory);
          // Send the inventory to the backend
          modifyInventoryItem(inventory).then(() => {
            setHandleUpdate(handleUpdate + 1);
          })

          setShowModifyForm(false);
        }

        // Display the modify form
        return (
          <form className="form" onSubmit={handleModifyForm}>
            <h2>Modify Inventory</h2>
            <div className={"form-group"}>
              <label htmlFor="character">Character</label>
              <select name="id_character" id="character" defaultValue={editedInventory.id_character}>
                {characters.map((character) => {
                  return (
                    <option key={character.id} value={character.id}>
                        {character.id}: {character.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className={"form-group"}>
              <label htmlFor="Object">Object</label>
              <select name="id_object" id="object" defaultValue={editedInventory.id_object}>
                {objects.map((object) => {
                  return (
                    <option key={object.id} value={object.id}>
                        {object.id}: {object.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className={"form-group"}>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" name="quantity" id="quantity" defaultValue={editedInventory.quantity} />
            </div>
            <div className={"btn-group"}>
              <button type="submit" className={"btn--green"}>Modify</button>
              <button type="button" className={"btn--red"} onClick={() => setShowModifyForm(false)}>Cancel</button>
            </div>
          </form>
        )
    }

    return (
      <div>
        <button className={"btn-filter"} onClick={handleShowFilter}>Filter by Character</button>
        <table className={"table"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Character ID</th>
              <th>Character Name</th>
              <th>ID Object</th>
              <th>Object Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {displayInventories()}
          </tbody>
        </table>
        {showCreateForm ? addInventoryForm() : <button onClick={handleShowCreate}>Add Inventory</button>}
        {showModifyForm ? modifyInventoryForm() : null}
        {showFilterForm ? filterModal() : null}
      </div>
    )

}

export default AdminInventories;