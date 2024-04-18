import { Router } from 'express';
import { getParkings, getParking, saveParking, deleteParking, updateParking, getParkingCount } from '../controllers/parkings';

const router = Router();

/**
 * @swagger 
 * tags: 
 *  name: Parkings
 *  description: Endpoints para Parkings 
*/

/** 
 * @swagger
 * /parkings:
 *  get:
 *      summary: Obtener todos los parkings.
 *      tags: [Parkings]
 * 
*/ 
router.get('/parkings', getParkings);

/** 
 * @swagger
 * /parkings/count:
 *  get:
 *      summary: Obtener el conteo total de parkings.
 *      tags: [Parkings]
 * 
*/ 
router.get('/parkings/count', getParkingCount);

/** 
 * @swagger
 * /parkings/:id:
 *  get:
 *      summary: Obtener un parking específico por su ID.
 *      tags: [Parkings]
*/ 
router.get('/parkings/:id', getParking);

/** 
 * @swagger
 * /parkings:
 *  post:
 *      summary: Agregar un nuevo parking.
 *      tags: [Parkings]
*/ 
router.post('/parkings', saveParking);

/** 
 * @swagger
 * /parkings/:id:
 *  delete:
 *      summary: Eliminar un parking por su ID.
 *      tags: [Parkings] 
*/ 
router.delete('/parkings/:id', deleteParking);

/** 
 * @swagger
 * /parkings/:id:
 *  put:
 *     summary: Actualizar la información de un parking existente.
 *     tags: [Parkings] 
*/ 
router.put('/parkings/:id', updateParking);

export default router;
