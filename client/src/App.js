import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import axios from 'axios'
import Project from './components/Project';

function App() {

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    getProjects();
  }, [])

  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const res = await axios('/project');
    setProjects(res.data.data);
  }

  return (
    <div className="App">
      <p className="flow-text center">YEAH BITCH!</p>
      <div className="container center">
        { projects && projects.map(pro => <Project key={pro._id} project={pro}/>) }
      </div>
    </div>
  );
}

export default App;
