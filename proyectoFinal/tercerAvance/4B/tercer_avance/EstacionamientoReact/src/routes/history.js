import { Router } from 'express';
import { getCheckInOuts, getCheckInOut, saveCheckInOut, deleteCheckInOut, updateCheckInOut, getCheckInOutCount } from '../controllers/history';

const router = Router();

/**
 * @swagger 
 * tags: 
 *  name: Check-In/Check-Out
 *  description: Endpoints para Check-In/Check-Out 
*/

/** 
 * @swagger
 * /check-in-out:
 *  get:
 *      summary: Obtener todos los registros de Check-In/Check-Out.
 *      tags: [Check-In/Check-Out]
 * 
*/ 
router.get('/history', getCheckInOuts);

/** 
 * @swagger
 * /history/count:
 *  get:
 *      summary: Obtener el conteo total de registros de Check-In/Check-Out.
 *      tags: [Check-In/Check-Out]
 * 
*/ 
router.get('/history/count', getCheckInOutCount);

/** 
 * @swagger
 * /history/:id:
 *  get:
 *      summary: Obtener un registro específico de Check-In/Check-Out por su ID.
 *      tags: [Check-In/Check-Out]
*/ 
router.get('/history/:id', getCheckInOut);

/** 
 * @swagger
 * /history:
 *  post:
 *      summary: Agregar un nuevo registro de Check-In/Check-Out.
 *      tags: [Check-In/Check-Out]
*/ 
router.post('/history', saveCheckInOut);

/** 
 * @swagger
 * /history/:id:
 *  delete:
 *      summary: Eliminar un registro de Check-In/Check-Out por su ID.
 *      tags: [Check-In/Check-Out] 
*/ 
router.delete('/history/:id', deleteCheckInOut);

/** 
 * @swagger
 * /history/:id:
 *  put:
 *     summary: Actualizar la información de un registro de Check-In/Check-Out existente.
 *     tags: [Check-In/Check-Out] 
*/ 
router.put('/history/:id', updateCheckInOut);

export default router;
