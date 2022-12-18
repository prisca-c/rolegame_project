import React, {useEffect, useState} from "react";
import {getAllClasses, createClass, modifyClass, deleteClass} from "../../../Data/classes";

const AdminClass = () => {

    const [classes, setClasses] = useState([]); // Hold all classes
    const [ editedClass, setEditedClass ] = useState({}); // Hold the class to be edited
    const [ handleUpdate, setHandleUpdate ] = useState(1); // Handle the re-render of the list of classes
    const [ showModifyForm, setShowModifyForm ] = useState(false); // Show the modify form
    const [ showCreateForm, setShowCreateForm ] = useState(false); // Show the create form

    // Handle the initial fetch of all classes
    useEffect(() => {
      getAllClasses().then((classes) => {
        setClasses(classes);
        console.log(classes)
      })
    }, [handleUpdate]);

    // Handle Class deletion
    const handleDelete = (e) => {
      deleteClass(e.currentTarget.value).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    // Handle Create form display state
    const handleShowCreate = () => {
      setShowModifyForm(false);
      setShowCreateForm(true);
    }

    // Display Classes list
    const displayClasses = () => {
      // Handle Create form display state
      const handleShowModify = (e) => {
        // Get the class to be edited
        const class_edited = classes.find((class_item) => {
          return class_item.id === parseInt(e.currentTarget.value);
        });
        setEditedClass(class_edited); // Set the class to be edited
        setShowCreateForm(false); // Hide the create form
        setShowModifyForm(true); // Show the modify form
      }

      // Display the list of classes
      return classes.map((class_item) => {
        return (
          <tr key={class_item.id}>
            <td>{class_item.id}</td>
            <td>{class_item.name}</td>
            <td>{class_item.hp}</td>
            <td>{class_item.ability}</td>
            <td>{class_item.strength}</td>
            <td>
              <button className={"btn--green"} value={class_item.id} onClick={handleShowModify}>Modify</button>
              <button className={"btn--red"} value={class_item.id} onClick={handleDelete}>Delete</button>
            </td>
          </tr>
        )
      })
    }

    // Display modify form
    const modifyClassForm = () => {

      // Handle changes of the modified class
      const handleModifyChange = (e) => {
        setEditedClass({...editedClass, [e.currentTarget.name]: e.currentTarget.value});
      }

      // Handle the submit of the modified class
      const handleModifySubmit = (e) => {
        e.preventDefault();

        // send the modified class to the API
        modifyClass(editedClass).then(() => {
          setHandleUpdate(handleUpdate + 1);
          setShowModifyForm(false);
        })
      }

      // Display the modify form
      return (
        <form className={"form"} onSubmit={handleModifySubmit}>
          <div className={"form-group"}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={editedClass.name} onChange={handleModifyChange} />
          </div>
          <div className={"form-group"}>
            <label htmlFor="hp">HP</label>
            <input type="number" name="hp" value={editedClass.hp} onChange={handleModifyChange} />
          </div>
          <div className={"form-group"}>
            <label htmlFor="ability">Ability</label>
            <input type="number" name="ability" value={editedClass.ability} onChange={handleModifyChange} />
          </div>
          <div className={"form-group"}>
            <label htmlFor="strength">Strength</label>
            <input type="number" name="strength" value={editedClass.strength} onChange={handleModifyChange} />
          </div>
          <div className={"btn-group"}>
            <button type="submit" className={"btn--green"}>Modify</button>
            <button type="button" className={"btn--red"} onClick={() => setShowModifyForm(false)}>Cancel</button>
          </div>
        </form>
      )
    }

    // Display create form
    const addClassForm = () => {

      // Handle submit of the new class
      const handleAddForm = (e) => {
        e.preventDefault();

        const newClass = {
          'name': e.currentTarget.name.value,
          'hp': parseInt(e.currentTarget.hp.value),
          'ability': parseInt(e.currentTarget.ability.value),
          'strength': parseInt(e.currentTarget.strength.value)
        }

        // Send the new class to the API
        createClass(newClass).then(() => {
          setHandleUpdate(handleUpdate + 1);
        })

        setShowCreateForm(false);
      }

      // Display the create form
      return (
        <form className={"form"} onSubmit={handleAddForm}>
          <div className={"form-group"}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className={"form-group"}>
            <label htmlFor="hp">HP</label>
            <input type="number" name="hp" />
          </div>
          <div className={"form-group"}>
            <label htmlFor="ability">Ability</label>
            <input type="number" name="ability" />
          </div>
          <div className={"form-group"}>
            <label htmlFor="strength">Strength</label>
            <input type="number" name="strength" />
          </div>
          <div className={"btn-group"}>
            <button type="submit" className={"btn--green"}>Add</button>
            <button type="button" className={"btn--red"} onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </form>
      )
    }

    // Display Class Panel
    return (
      <div className={"relative"}>
        <h2>Admin Class</h2>
        <table className={"table"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>HP</th>
              <th>Ability</th>
              <th>Strength</th>
            </tr>
          </thead>
          <tbody>
            {displayClasses()}
          </tbody>
        </table>
        {showCreateForm ? addClassForm() : <button onClick={handleShowCreate}>Add Class</button>}
        {showModifyForm ? modifyClassForm() : null}
      </div>
    )
}

export default AdminClass;