import React, {useEffect, useState} from "react";
import {getAllObjects, createObject, updateObject, deleteObject} from "../../../Data/objects";
import '../../../Styles/AdminObjects.css';

const AdminObjects = () => {

  const [objects, setObjects] = useState([]);
  const [ editedObject, setEditedObject ] = useState({});
  const [ showModifyForm, setShowModifyForm ] = useState(false);
  const [ showCreateForm, setShowCreateForm ] = useState(false);
  const [ handleUpdate, setHandleUpdate ] = useState(1);

  useEffect(() => {
    getAllObjects().then((objects) => {
      setObjects(objects);
      console.log(objects)
    })
  },[handleUpdate]);

  const handleDelete = (e) => {
    deleteObject(e.currentTarget.value).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
  }

  const handleShowCreate = () => {
    setShowModifyForm(false);
    setShowCreateForm(true);
  }

  const addForm = () => {
    const handleAddForm = (e) => {
      e.preventDefault();

      const object = {
        'name': e.currentTarget.name.value,
        'type': e.currentTarget.type.value,
        'description': e.currentTarget.description.value,
        'property': e.currentTarget.property.value
      }

      console.log(object);
      createObject(object).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    return (
      <form className="add-form" onSubmit={handleAddForm}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="type">Type</label>
        <input type="text" name="type" id="type" />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <label htmlFor="property">Property</label>
        <input type="text" name="property" id="property" />
        <input type="submit" value="Add Object" />
        <input type="button" value="Cancel" onClick={() => setShowCreateForm(false)} />
      </form>
    )
  }

  const modifyForm = () => {
    const handleEditObject = (e) => {
      setEditedObject({
        ...editedObject, [e.currentTarget.name]: e.currentTarget.value
      })
    }

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
      updateObject(object).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    return (
      <form onSubmit={handleModifyForm}>
        <input type="hidden" name="id" value={editedObject.id} />
        <input type="text" name="name" placeholder="Name" value={editedObject.name} onChange={handleEditObject}/>
        <input type="text" name="type" placeholder="Type" value={editedObject.type} onChange={handleEditObject}/>
        <input type="text" name="description" placeholder="Description" value={editedObject.description} onChange={handleEditObject}/>
        <input type="text" name="property" placeholder="Property" value={editedObject.property} onChange={handleEditObject}/>
        <input type="submit" value="Update" />
      </form>
    )
  }

  const displayObjects = () => {
    const handleShowModify = (e) => {
      const object = objects.find((object) => {
        return object.id === parseInt(e.currentTarget.value);
      });
      setEditedObject(object);
      setShowCreateForm(false);
      setShowModifyForm(true);
    }

    return objects.map((object) => {
      return (
        <tr key={object.id}>
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

  return (
    <div>
      <h2>Objects</h2>

      <table className={"table_objects"}>
        <thead>
          <tr>
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