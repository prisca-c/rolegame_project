import React, { useState, useEffect } from "react";
import { getAllEvents, modifyEvent, deleteEvent, createEvent } from "../../../Data/events";

const AdminEvents = () => {
  const [ events, setEvents ] = useState([]); // Hold all classes
  const [ editedEvents, setEditedEvents ] = useState({}); // Hold the class to be edited
  const [ handleUpdate, setHandleUpdate ] = useState(1); // Handle re-render of the list of classes
  const [ showModifyForm, setShowModifyForm ] = useState(false); // Show the modify form
  const [ showCreateForm, setShowCreateForm ] = useState(false); // Show the create form

  // Handle the initial fetch of all events
  useEffect(() => {
    getAllEvents().then((events) => {
      setEvents(events);
    })
  }, [handleUpdate]);

  // Handle events deletion
  const handleDelete = (e) => {
    deleteEvent(e.currentTarget.value).then(() => {
      setHandleUpdate(handleUpdate + 1);
    })
  }

  // Handle Create form display state
  const handleShowCreate = () => {
    setShowModifyForm(false);
    setShowCreateForm(true);
  }

  // Display modify form
  const modifyEventForm = () => {
    // Handle changes of the modified event
    const handleModifyChange = (e) => {
      setEditedEvents({...editedEvents, [e.currentTarget.name]: e.currentTarget.value})
    }
    // Handle submit of the modified event
    const handleModifyEvent = (e) => {
      e.preventDefault();

      modifyEvent(editedEvents).then(()=>{
        setHandleUpdate(handleUpdate + 1);
        setShowModifyForm(false)
      })
    }

    // Display the modify form
    return (
      <form className={"form"} onSubmit={handleModifyEvent}>
        <h2>Modify Event</h2>
        <div className={"form-group"}>
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" value={editedEvents.type} onChange={handleModifyChange} />
        </div>
        <div className={"form-group"}>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={editedEvents.description} onChange={handleModifyChange} />
        </div>
        <div className={"btn-group"}>
          <button className={"btn--green"}>Modify</button>
          <button className={"btn--red"} onClick={()=>{setShowModifyForm(false)}}>Cancel</button>
        </div>
      </form>
    )
  }

  const addEventForm = () => {
    const handleCreateEvent = (e) => {
      e.preventDefault()

      const newEvent = {
        "type": e.target.type.value,
        "description": e.target.description.value
      }

      createEvent(newEvent).then(() => {
        setHandleUpdate(handleUpdate + 1);
      })
    }

    return (
      <form className={"form"} onSubmit={handleCreateEvent}>
        <h2>Add Event</h2>
        <div className={"form-group"}>
          <label htmlFor={"type"}>Type</label>
          <input type={"text"} name={"type"} id={"type"} />
        </div>
        <div className={"form-group"}>
          <label htmlFor={"description"}>Description</label>
          <textarea name={"description"} id={"description"} />
        </div>
        <div className={"btn-group"}>
          <button className={"btn--green"}>Create</button>
          <button className={"btn--red"} onClick={() => { setShowCreateForm(false) }}>Cancel</button>
        </div>
      </form>
    )
  }

  // Display events list
  const displayEvents = () => {

    const handleShowModify = (e) => {
      // Get the event to be edited
      const eventEdited = events.find((event) => {
        return event.id === parseInt(e.currentTarget.value);
      });
      setEditedEvents(eventEdited); // Set the event to be edited
      setShowCreateForm(false); // Hide the create form
      setShowModifyForm(true); // Show the modify form
    }

    // Display the list of events
    return events.map((event) => {
      return (
        <tr key={event.id}>
          <td>{event.id}</td>
          <td>{event.type}</td>
          <td>{event.description}</td>
          <td>
            <button className={"btn--green"} value={event.id} onClick={handleShowModify}>Modify</button>
            <button className={"btn--red"} value={event.id} onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className={"admin-events"}>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {displayEvents()}
        </tbody>
      </table>
      {showCreateForm ? addEventForm() : <button onClick={handleShowCreate}>Add Event</button>}
      {showModifyForm ? modifyEventForm() : null}
    </div>
  )
}

export default AdminEvents;