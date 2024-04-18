import { connect } from '../database';

export const getUsers = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM User");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getUser = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM User WHERE pk_user = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getUserCount = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT COUNT(*) FROM User");
        res.json(rows[0]["COUNT(*)"]);
    } catch (error) {
        console.error("Error al obtener el total de usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
}


export const saveUser = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query("INSERT INTO User (pk_user, first_name, last_name, password, email, nickname, category, accessCode) VALUES (NULL,?,?,?,?,?,?,?)", [
            req.body.first_name,
            req.body.last_name,
            req.body.password,
            req.body.email,
            req.body.nickname,
            req.body.category,
            req.body.accessCode
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteUser = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM User WHERE pk_user = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, password, email, nickname, category, accessCode } = req.body;
        const connection = await connect();
        const query = "UPDATE User SET first_name = ?, last_name = ?, password = ?, email = ?, nickname = ?, category = ?, accessCode = ? WHERE pk_user = ?";
        await connection.query(query, [first_name, last_name, password, email, nickname, category, accessCode, req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM User WHERE email = ? AND password = ?", [email, password]);

        if (rows.length > 0) {
            // Usuario autenticado, devuelve los detalles del usuario
            res.json({ success: true, user: rows[0], message: "Inicio de sesión exitoso" });
        } else {
            // Credenciales incorrectas
            res.json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
};
