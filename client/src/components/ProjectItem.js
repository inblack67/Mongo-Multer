import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ project: { title, description, stack, image, _id }, loading }) => {

    if(loading){
        return <p className="flow-text center">Loading..</p>
    }

    return (
        <div className="col s12">
        <div className='card hoverable'>
            <div className="card-image">
            { image && <img className='responsive-img' src={`/project/${_id}/image/${image.filename}`} alt=""/> }
            </div>
            <div className="card-content">
            <span className="card-title">
            {title}
            </span>
            <p>{description}</p>
            <span>{stack}</span>
            </div>
            <div className="card-action">
                { !image && <Link to={`/photo-upload/${_id}`}>Upload Image</Link> }
            </div>
        </div>
        </div>  
    )
}

export default ProjectItem
