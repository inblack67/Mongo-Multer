import React from 'react'

const Project = ({ project: { title, description, stack, image, _id } }) => {

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{stack}</span>
            <img className='responsive-img' src={`/image/${image}`} alt=""/>
            <img className='responsive-img' src={`/project/${_id}/image/${image}`} alt=""/>
        </div>
    )
}

export default Project
