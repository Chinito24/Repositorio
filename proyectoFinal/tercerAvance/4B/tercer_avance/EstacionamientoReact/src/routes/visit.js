import { Router } from 'express';
import { getVisits, getVisit, saveVisit, deleteVisit } from '../controllers/visit';

const router = Router();

/**
 * @swagger 
 * tags: 
 *  name: Visits
 *  description: Visits endpoint 
*/

/** 
 * @swagger
 * /visits:
 *  get:
 *      summary: Get all visits.
 *      tags: [Visits]
*/ 
router.get('/visits', getVisits);

/** 
 * @swagger
 * /visits/{id}:
 *  get:
 *      summary: Get a visit by ID.
 *      tags: [Visits]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the visit to get
 *          schema:
 *            type: integer
 *            format: int64
*/ 
router.get('/visits/:id', getVisit);

/** 
 * @swagger
 * /visits:
 *  post:
 *      summary: Add a new visit.
 *      tags: [Visits]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                visit_company:
 *                  type: string
 *                visit_reason:
 *                  type: string
 *                visit_name:
 *                  type: string
 *                visit_lastName:
 *                  type: string
 *                fk_client:
 *                  type: integer
 *                fk_status:
 *                  type: integer
 *              required:
 *                - visit_company
 *                - visit_reason
 *                - visit_name
 *                - visit_lastName
 *              example:
 *                visit_company: "Company ABC"
 *                visit_reason: "Meeting"
 *                visit_name: "John"
 *                visit_lastName: "Doe"
 *                fk_client: 1
 *                fk_status: 1
*/ 
router.post('/visits', saveVisit);

/** 
 * @swagger
 * /visits/{id}:
 *  delete:
 *      summary: Delete a visit by ID.
 *      tags: [Visits]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the visit to delete
 *          schema:
 *            type: integer
 *            format: int64
*/ 
router.delete('/visits/:id', deleteVisit);

export default router;
