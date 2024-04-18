import { connect } from '../database';

export const getParkings = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Parking");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los parkings:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getParking = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Parking WHERE pk_parking = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Parking no encontrado");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el parking:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getParkingCount = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT COUNT(*) FROM Parking");
        res.json(rows[0]["COUNT(*)"]);
    } catch (error) {
        console.error("Error al obtener el total de parkings:", error);
        res.status(500).send("Error interno del servidor");
    }
}


export const saveParking = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("INSERT INTO Parking (pk_parking, parking_number, parking_location, parking_capacity, fk_client, fk_status) VALUES (NULL, ?, ?, ?, NULL, 1)", [
            req.body.parking_number,
            req.body.parking_location,
            req.body.parking_capacity
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar el parking:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteParking = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM Parking WHERE pk_parking = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar el parking:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const updateParking = async (req, res) => {
    try {
        const { parking_number, parking_location, parking_capacity, fk_client, fk_status } = req.body;
        const connection = await connect();
        const query = "UPDATE Parking SET parking_number = ?, parking_location = ?, parking_capacity = ?, fk_client = ?, fk_status = ? WHERE pk_parking = ?";
        await connection.query(query, [parking_number, parking_location, parking_capacity, fk_client, fk_status, req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar el parking:", error);
        res.status(500).send("Error interno del servidor");
    }
}
