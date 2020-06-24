const Project = require('../model/Project');

// @desc Add Project
// @route POST /project
exports.addProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        return res.status(201).json({ success: true, data: project });  
    } catch (err) {
        console.error(`${err}.red.bold`)
    }
  }

// @desc Get All Projects
// @route GET /project
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(201).json({ success: true, data: projects }); 
    } catch (err) {
        console.error(`${err}.red.bold`)
    }
  }