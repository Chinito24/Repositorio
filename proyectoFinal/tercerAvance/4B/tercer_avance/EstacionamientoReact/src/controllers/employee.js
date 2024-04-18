import { connect } from '../database';

export const getEmployees = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Employee");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los empleados:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const getEmployee = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM Employee WHERE pk_employee = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).send("Empleado no encontrado");
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const saveEmployee = async (req, res) => {
    try {
        const { employee_name, employee_lastNameP, employee_lastNameM, fk_client, fk_status, fk_rol, tel } = req.body;
        const connection = await connect();
        const [results] = await connection.query("INSERT INTO Employee (employee_name, employee_lastNameP, employee_lastNameM, fk_client, fk_status, fk_rol, tel) VALUES (?, ?, ?, NULL, NULL, 1, ?)", [
            employee_name,
            employee_lastNameP,
            employee_lastNameM,
            fk_client,
            fk_status,
            fk_rol,
            tel
        ]);
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error("Error al guardar el empleado:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("DELETE FROM Employee WHERE pk_employee = ?", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { employee_name, employee_lastNameP, employee_lastNameM, fk_client, fk_status, fk_rol } = req.body;
        const connection = await connect();
        const query = "UPDATE Employee SET employee_name = ?, employee_lastNameP = ?, employee_lastNameM = ?, fk_client = ?, fk_status = ?, fk_rol = ? WHERE pk_employee = ?";
        await connection.query(query, [employee_name, employee_lastNameP, employee_lastNameM, fk_client, fk_status, fk_rol, req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        res.status(500).send("Error interno del servidor");
    }
}
