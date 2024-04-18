import { connect } from '../database';

export const getCheckInOuts = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Check_In_Out");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los registros de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getCheckInOut = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Check_In_Out WHERE pk_check = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Registro de Check-In/Check-Out no encontrado");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el registro de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getCheckInOutCount = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT COUNT(*) FROM Check_In_Out");
        res.json(rows[0]["COUNT(*)"]);
    } catch (error) {
        console.error("Error al obtener el total de registros de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}


export const saveCheckInOut = async (req, res) => {
    try {
        const connection = await connect();
        const { date_in, date_out, fk_parking, fk_card, fk_space, fk_status } = req.body;
        const [results] = await connection.query("INSERT INTO Check_In_Out (pk_check, date_in, date_out, fk_parking, fk_card, fk_space, fk_status) VALUES (NULL,?,?,?,?,?,?)", [
            date_in,
            date_out,
            fk_parking,
            fk_card,
            fk_space,
            fk_status
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar el registro de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteCheckInOut = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM Check_In_Out WHERE pk_check = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar el registro de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const updateCheckInOut = async (req, res) => {
    try {
        const { date_in, date_out, fk_parking, fk_card, fk_space, fk_status } = req.body;
        const connection = await connect();
        const query = "UPDATE Check_In_Out SET date_in = ?, date_out = ?, fk_parking = ?, fk_card = ?, fk_space = ?, fk_status = ? WHERE pk_check = ?";
        await connection.query(query, [date_in, date_out, fk_parking, fk_card, fk_space, fk_status, req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar el registro de Check-In/Check-Out:", error);
        res.status(500).send("Error interno del servidor");
    }
}
