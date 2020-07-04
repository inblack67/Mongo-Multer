import React, { useEffect, useContext } from 'react'
import ProjectItem from './ProjectItem'
import ProjectContext from '../context/projects/projectContext'
import { Link } from 'react-router-dom'

const Projects = () => {

    useEffect(() => {
      getProjects();
      }, [])

      const projectContext = useContext(ProjectContext);

      const { loading, getProjects, projects } = projectContext;
    
      if(loading){
        return <p className='flow-text center'>Loading...</p>
      }
    

    return (
        <div className="row">
            <p className="flow-text center">JavaScript Projects</p>

{ projects.length === 0 && <p className='flow-text center'>No Projects, yet.</p> }

            <div className="fixed-action-btn">
            <Link to='/add-project' className='btn-floating btn-large waves-effect waves-light red'><i className="material-icons">add</i></Link>
            </div>
    
            { projects && projects.map(pro => <ProjectItem key={pro._id} project={pro} loading={loading}/>) }
        </div>
    )
}

export default Projects
