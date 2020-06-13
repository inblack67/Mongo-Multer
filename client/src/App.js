import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

function App() {

  useEffect(() => {
    M.AutoInit();
  });

  return (
    <div className="App">
      <p className="flow-text center">YEAH BITCH!</p>
    </div>
  );
}

export default App;
