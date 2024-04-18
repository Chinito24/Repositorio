// const API  = 'http://10.0.2.2:3000/users';
const API = 'http://localhost:3000/users';

export const getUsers = async () => {
    const rest = await fetch(API);
    return await rest.json();
}

export const saveUser = async (newUser) => {
    const rest = await fetch(API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    });
    return await rest.json();
}

export const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
}