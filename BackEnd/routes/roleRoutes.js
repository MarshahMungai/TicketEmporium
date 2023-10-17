import express from 'express';
import { createRole, getAllRoles, getRoleById, updateRoleById, deleteRoleById, getRoleCount } from '../controllers/roleController.js';

const router = express.Router();

router.get('/roles', getAllRoles);

router.get('/roles/:id', getRoleById);

router.post('/roles', createRole);

router.patch('/roles/:id', updateRoleById);

router.delete('/roles/:id', deleteRoleById);

router.get('/roles-count', getRoleCount);

export default router;
