import db from "../models/index.js";

const UserRole = db.UserRole;

const getAllUserRoles = async (req, res) => {
    try {
        const response = await UserRole.findAll();
        if(response.length === 0){
            res.status(404).json({"message": "No UserRole found"});
        }
        else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getUserRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await UserRole.findByPk(id);
        if(response === null ){
            res.status(404).json({"message": "UserRole not found."});
        }else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const createUserRole = async (req, res) => {
    try {
        const response = await UserRole.create(req.body);
        res.status(201).json({"message": "UserRole created."});
    } catch (error) {
        res.status(401).json(error);
    }
}

const updateUserRoleById = async (req, res) => {
    const { id } = req.params;
    const { name} = req.body;
    try {
        const [ response ] = await UserRole.update(
            {
                "name": name,
                },
                { where: { id: id}});
        if(response === 0){
            res.status(404).json({"message": "UserRole not found"});
        }else if(response){
            res.status(201).json({"message": "UserRole updated."});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteUserRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await UserRole.destroy({where: {id: id}})
        if(response === 0){
            res.status(404).json({"message": "UserRole not found"});
        }else if(response){
            res.status(200).json({"message": "UserRole deleted."})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export { createUserRole, getAllUserRoles, getUserRoleById, updateUserRoleById, deleteUserRoleById };
