import { Router } from 'express';
import { getEmployees, getEmployee, saveEmployee, deleteEmployee, updateEmployee } from '../controllers/employee';

const router = Router();

/**
 * @swagger 
 * tags: 
 *  name: Employees
 *  description: Endpoints para Empleados 
*/

/** 
 * @swagger
 * /employees:
 *  get:
 *      summary: Obtener todos los empleados.
 *      tags: [Employees]
 * 
*/ 
router.get('/employees', getEmployees);

/** 
 * @swagger
 * /employees/:id:
 *  get:
 *      summary: Obtener un empleado específico por su ID.
 *      tags: [Employees]
*/ 
router.get('/employees/:id', getEmployee);

/** 
 * @swagger
 * /employees:
 *  post:
 *      summary: Agregar un nuevo empleado.
 *      tags: [Employees]
*/ 
router.post('/employees', saveEmployee);

/** 
 * @swagger
 * /employees/:id:
 *  delete:
 *      summary: Eliminar un empleado por su ID.
 *      tags: [Employees] 
*/ 
router.delete('/employees/:id', deleteEmployee);

/** 
 * @swagger
 * /employees/:id:
 *  put:
 *     summary: Actualizar la información de un empleado existente.
 *     tags: [Employees] 
*/ 
router.put('/employees/:id', updateEmployee);

export default router;
