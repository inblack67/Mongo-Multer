import React, { useState, useContext } from 'react'
import ProjectContext from '../context/projects/projectContext'

const PhotoUpload = ({ match, history }) => {

    const [file, setFile] = useState();
    const [fileName, setFilename] = useState('image');

    const projectContext = useContext(ProjectContext);

    const { loading, uploadFile } = projectContext;

    const onFileChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        uploadFile(formData, match.params.id);
        history.push('/');
    }

    return (
        <div className="container">
            <p className="flow-text center">Upload Photo</p>
            <form onSubmit={onSubmit}>
            <div className="file-field input-field">
            <div className="btn black">
                <span>{fileName}</span>
                <input type="file" name='file' onChange={onFileChange} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" required />
                <span className="helper-text">Add Image</span>
            </div>
        </div>
        <div className="input-field">
            <input type="submit" value="Upload" className='btn green'/>
        </div>
            </form>
        </div>
    )
}

export default PhotoUpload
