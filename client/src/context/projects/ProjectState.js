import ProjectContext from './projectContext'
import ProjectReducer from './projectReducer'
import { GET_PROJECTS, ADD_PROJECT, UPLOAD_PHOTO } from '../types'
import React, { useReducer } from 'react'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

const ProjectState = (props) => {

    const initialState = {
        projects: null,
        project: null,
        loading: true,
    }

    const getProjects = async () => {
        const res = await axios('/project');
        dispatch({
            type: GET_PROJECTS,
            payload: res.data.data
        })
      }

    const submitProject = async formData => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const projectWithoutImage = state.projects.filter(pro => pro.image === null || pro.image === undefined);

            if(projectWithoutImage){
                M.toast({ html: 'Upload an image for the previous project first' });
                return;
            }

            const res = await axios.post('/project', formData, config);
            if(res.data.success){
                M.toast({ html: 'Project Added' });
            }

            dispatch({
                type: ADD_PROJECT,
                payload: res.data.data
            })

            getProjects();
            
        } catch (err) {
            console.error(err)
        }
    }

    const uploadFile = async (formData, id) => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios.put(`/project/${id}/upload`, formData, config);

            if(res.data.success){
                M.toast({ html: 'Image Uploaded' });
            }

            dispatch({
                type: UPLOAD_PHOTO,
                payload: res.data.data
            })

            getProjects();

        } catch (err) {
            console.error(err);
        }
    }

    const [state, dispatch] = useReducer(ProjectReducer, initialState);


    return (
        <ProjectContext.Provider
        value={{
            project: state.project,
            projects: state.projects,
            loading: state.loading,
            submitProject,
            uploadFile,
            getProjects
        }}>
            { props.children }
        </ProjectContext.Provider>
    )
}

export default ProjectState
