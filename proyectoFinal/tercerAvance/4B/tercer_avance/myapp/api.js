// LOGIN
export const loginUser = async (newLogin) => {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
    });
    return await response.json();
}

// ================= PARKINGS =================
// const API  = 'http://10.0.2.2:3000/parkings';
const PARKINGS_API = 'http://localhost:3000/parkings';

// Funciones para operaciones CRUD de parkings
export const getParkings = async () => {
    const response = await fetch(PARKINGS_API);
    return await response.json();
}

export const saveParking = async (newParking) => {
    const response = await fetch(PARKINGS_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParking),
    });
    return await response.json();
}

export const deleteParking = async (id) => {
    await fetch(`${PARKINGS_API}/${id}`, {
        method: 'DELETE',
    });
}

export const updateParking = async (id, updatedParking) => {
    await fetch(`${PARKINGS_API}/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedParking),
    });
}


// ================= EMPLEADOS =================
// Define la URL base para las operaciones relacionadas con empleados
const EMPLOYEES_API = 'http://localhost:3000/employees';
// const EMPLOYEES_API = 'http://192.168.1.10:3000/employees';

// Funciones para operaciones CRUD de empleados
export const getEmployees = async () => {
    const response = await fetch(EMPLOYEES_API);
    return await response.json();
}

export const saveEmployee = async (newEmployee) => {
    const response = await fetch(EMPLOYEES_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
    });
    return await response.json();
}

export const deleteEmployee = async (id) => {
    await fetch(`${EMPLOYEES_API}/${id}`, {
        method: 'DELETE',
    });
}

export const updateEmployee = async (id, updatedEmployee) => {
    await fetch(`${EMPLOYEES_API}/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
    });
}

// ================= HISTORY =================
const HISTORY_API = 'http://localhost:3000/history';

// Funciones para operaciones CRUD de historial
export const getHistory = async () => {
    const response = await fetch(HISTORY_API);
    return await response.json();
}

export const getHistoryById = async (id) => {
    const response = await fetch(`${HISTORY_API}/${id}`);
    return await response.json();
}

export const getHistoryCount = async () => {
    const response = await fetch(`${HISTORY_API}/count`);
    return await response.json();
}

export const saveHistory = async (newHistory) => {
    const response = await fetch(HISTORY_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHistory),
    });
    return await response.json();
}

export const deleteHistory = async (id) => {
    await fetch(`${HISTORY_API}/${id}`, {
        method: 'DELETE',
    });
}

export const updateHistory = async (id, updatedHistory) => {
    await fetch(`${HISTORY_API}/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHistory),
    });
}

// ================= VISITS =================
const VISITS_API = 'http://localhost:3000/visits';

export const getVisits = async () => {
    const response = await fetch(VISITS_API);
    return await response.json();
}

export const saveVisit = async (newVisit) => {
    const response = await fetch(VISITS_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVisit),
    });
    return await response.json();
}

export const deleteVisit = async (id) => {
    await fetch(`${VISITS_API}/${id}`, {
        method: 'DELETE',
    });
}

export const updateVisit = async (id, updatedVisit) => {
    await fetch(`${VISITS_API}/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVisit),
    });
}
