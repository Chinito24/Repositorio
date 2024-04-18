import { connect } from '../database';

export const getVisits = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Visit");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener visitas:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getVisit = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Visit WHERE pk_visit = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Visita no encontrada");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener visita:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const saveVisit = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("INSERT INTO Visit (visit_company, visit_reason, visit_name, visit_lastName, fk_client, fk_status) VALUES (?,?,?,?,?,?)", [
            req.body.visit_company,
            req.body.visit_reason,
            req.body.visit_name,
            req.body.visit_lastName,
            req.body.fk_client || null,
            req.body.fk_status || 1
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar visita:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteVisit = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM Visit WHERE pk_visit = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar visita:", error);
        res.status(500).send("Error interno del servidor");
    }
}
