import { connect } from '../database';

export const getLicenses = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM License");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener licencias:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getLicense = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM License WHERE pk_license = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Licencia no encontrada");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener licencia:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const saveLicense = async (req, res) => {
    try {
        const { license_name, license_description, fk_status } = req.body;
        const connection = await connect();
        const [results] = await connection.query("INSERT INTO License (license_name, license_description, fk_status) VALUES (?,?,?)", [
            license_name,
            license_description,
            fk_status
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar licencia:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteLicense = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM License WHERE pk_license = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar licencia:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const updateLicense = async (req, res) => {
    try {
        const { license_name, license_description, fk_status } = req.body;
        const connection = await connect();
        const query = "UPDATE License SET license_name = ?, license_description = ?, fk_status = ? WHERE pk_license = ?";
        await connection.query(query, [license_name, license_description, fk_status, req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar licencia:", error);
        res.status(500).send("Error interno del servidor");
    }
}
