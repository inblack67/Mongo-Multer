import React, { useState, Fragment, useContext } from 'react'
import ProjectContext from '../context/projects/projectContext'

const AddProject = ({ history }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        stack: '',
    });

    const projectContext = useContext(ProjectContext);

    const { submitProject } = projectContext;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        submitProject(formData);
        history.push('/');
    }

    const { title, description, stack, image } = formData;

    return (
        <Fragment>
            <p className="flow-text center">Add Project</p>
            <form onSubmit={onSubmit}>
            <div className="input-field">
                <input type="text" name='title' value={title} required onChange={onChange}/>
                <label htmlFor="title">Title</label>
            </div>
            <div className="input-field">
                <input type="text" name='description' value={description} required onChange={onChange}/>
                <label htmlFor="description">Description</label>
            </div>
            <div className="input-field">
                <input type="text" name='stack' value={stack} required onChange={onChange}/>
                <label htmlFor="stack">Stack</label>
            </div>

            <div className="input-field">
                <input type="submit" value="Add" className='btn red'/>
            </div>
            </form>
        </Fragment>
    )
}

export default AddProject
