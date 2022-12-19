import './App.css';
import React, { useState } from 'react';
import AdminPanel from "./Components/Admin/AdminPanel";
import HomePage from "./Components/Game/HomePage";

function App() {
  const [ adminPanel, setAdminPanel ] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setAdminPanel(!adminPanel)}>{adminPanel ? "Game" : "Admin"}</button>
      {adminPanel ? <AdminPanel /> : <HomePage />}
      {/*<HomePage />*/}
    </div>
  );
}

export default App;
