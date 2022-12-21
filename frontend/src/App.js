import './App.css';
import React, { useState } from 'react';
import AdminPanel from "./Components/Admin/AdminPanel";
import HomePage from "./Components/Game/GamePanel";

function App() {
  const [ adminPanel, setAdminPanel ] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setAdminPanel(!adminPanel)}>{adminPanel ? "Game" : "Admin"}</button>
      {adminPanel ? <AdminPanel /> : <HomePage />}
      {/*<GamePanel />*/}
    </div>
  );
}

export default App;
