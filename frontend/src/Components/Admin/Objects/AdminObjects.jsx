import React, { useEffect, useState } from "react";
import { getAllObjects, createObject, updateObject, deleteObject } from "../../../Data/objects";

const AdminObjects = () => {

  const [objects, setObjects] = useState([]); // Hold all objects
  const [ editedObject, setEditedObject ] = useState({}); // Hold the object to be edited
  const [ showModifyForm, setShowModifyForm ] = useState(false); // Show the modify form
  const [ showCreateForm, setShowCreateForm ] = useState(false); // Show the create form
  const [ handleUpdate, setHandleUpdate ] = useState(1); // Handle the re-render of the list of objects

  // Handle the initial fetch of all objects
  useEffect(() => {
    getAllObjects().then((objects) => {
      setObjects(objects);
    })
  },[handleUpdate]);

  // Handle Object deletion
  const handleDelete = (e) => {
    deleteObject(e.currentTarget.value).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
  }

  // Handle Create form display state
  const handleShowCreate = () => {
    setShowModifyForm(false); // Hide the modify form
    setShowCreateForm(true); // Show the create form
  }

  // Display the Create form
  const addForm = () => {

    // Handle create form submission
    const handleAddForm = (e) => {
      e.preventDefault();

      const object = {
        'name': e.currentTarget.name.value,
        'type': e.currentTarget.type.value,
        'description': e.currentTarget.description.value,
        'property': e.currentTarget.property.value
      }

      console.log(object);
      // Send the object to the backend
      createObject(object).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })

      setShowCreateForm(false);
    }

    // Display the create form
    return (
      <form className="form" onSubmit={handleAddForm}>
        <h2>Add Object</h2>
        <div className={"form-group"}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={"form-group"}>
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" />
        </div>
        <div className={"form-group"}>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
        </div>
        <div className={"form-group"}>
          <label htmlFor="property">Property</label>
          <input type="text" name="property" id="property" />
        </div>
        <div className={"btn-group"}>
          <button type="submit" className={"btn--green"}>Add</button>
          <button type="button" className={"btn--red"} onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      </form>
    )
  }

  // Display the Modify form
  const modifyForm = () => {

    // Handle changes of the modified object state
    const handleEditObject = (e) => {
      setEditedObject({
        ...editedObject, [e.currentTarget.name]: e.currentTarget.value
      })
    }

    // Handle the submission of the modified object
    const handleModifyForm = (e) => {
      e.preventDefault();

      const object = {
        'id': e.currentTarget.id.value,
        'name': e.currentTarget.name.value,
        'type': e.currentTarget.type.value,
        'description': e.currentTarget.description.value,
        'property': e.currentTarget.property.value
      }

      console.log(object);
      // Send the object to the backend
      updateObject(object).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    // Display the modify form
    return (
      <form className={"form"} onSubmit={handleModifyForm}>
        <h2>Modify Object</h2>
        <input type="hidden" name="id" value={editedObject.id} />
        <p><strong>ID: {editedObject.id}</strong></p>
        <div className={"form-group"}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" value={editedObject.name} onChange={handleEditObject}/>
        </div>
        <div className={"form-group"}>
          <label htmlFor="type">Type</label>
          <input type="text" name="type" placeholder="Type" value={editedObject.type} onChange={handleEditObject}/>
        </div>
        <div className={"form-group"}>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" placeholder="Description" value={editedObject.description} onChange={handleEditObject}/>
        </div>
        <div className={"form-group"}>
          <label htmlFor="property">Property</label>
          <input type="text" name="property" placeholder="Property" value={editedObject.property} onChange={handleEditObject}/>
        </div>
        <div className={"btn-group"}>
          <button type="submit" className={"btn--green"}>Modify</button>
          <button type="button" className={"btn--red"} onClick={() => setShowModifyForm(false)}>Cancel</button>
        </div>
      </form>
    )
  }

  // Display the list of objects
  const displayObjects = () => {

    // Handle the display of the modify form & pick the object to be modified
    const handleShowModify = (e) => {
      const object = objects.find((object) => {
        return object.id === e.currentTarget.value;
      });
      setEditedObject(object);
      setShowCreateForm(false);
      setShowModifyForm(true);
    }

    // Display the list of objects
    return objects.map((object) => {
      return (
        <tr key={object.id}>
          <td>{object.id}</td>
          <td>{object.name}</td>
          <td>{object.type}</td>
          <td>{object.description}</td>
          <td>{object.property}</td>
          <td>
            <button value={object.id} onClick={handleShowModify}>Modify</button>
            <button value={object.id} onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  // Display Object Panel
  return (
    <div>
      <table className={"table"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          {displayObjects()}
        </tbody>
      </table>
      {showCreateForm ? addForm() : <button onClick={handleShowCreate}>Add Object</button>}
      {showModifyForm ? modifyForm() : null}
    </div>
  );
}

export default AdminObjects;