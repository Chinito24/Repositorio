import { Router } from 'express';
import { getUsers, getUser, saveUser, deleteUser, updateUser, getUserCount, loginUser } from '../controllers/users';

const router = Router();

/**
 * @swagger 
 * tags: 
 *  name: Users
 *  description: Users endpoint 
*/

/** 
 * @swagger
 * /tasks:
 *  get:
 *      summary: Get all users.
 *      tags: [Users]
 * 
*/ 
router.get('/users', getUsers);

/** 
 * @swagger
 * /tasks/count:
 *  get:
 *      summary: Get count from all users.
 *      tags: [Users]
 * 
*/ 
router.get('/users/count', getUserCount);

/** 
 * @swagger
 * /tasks:
 *  get:
 *      summary: Get one user.
 *      tags: [Users]
*/ 
router.get('/users/:id', getUser);

/** 
 * @swagger
 * /tasks:
 *  post:
 *      summary: Add user.
 *      tags: [Users]
*/ 
router.post('/users', saveUser);

/** 
 * @swagger
 * /tasks:
 *  delete:
 *      summary: Delete user.
 *      tags: [Users] 
*/ 
router.delete('/users/:id', deleteUser);

/** 
 * @swagger
 * /tasks:
 *  put:
 *     summary: Put user.
 *     tags: [Users] 
*/ 
router.put('/users/:id', updateUser);

router.post('/login', loginUser);

export default router;
