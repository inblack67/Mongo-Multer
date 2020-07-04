import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import ProjectState from './context/projects/ProjectState'
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import PhotoUpload from './components/PhotoUpload'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  useEffect(() => {
    M.AutoInit();
  });
  
  return (
    <ProjectState>
      <Router>
        <div className="container">
        <Switch>
          <Route exact path='/' component={Projects} />
          <Route exact path='/add-project' component={AddProject} />
          <Route exact path='/photo-upload/:id' component={PhotoUpload} />
        </Switch>
        </div>
      </Router>
    </ProjectState>
  );
}

export default App;
