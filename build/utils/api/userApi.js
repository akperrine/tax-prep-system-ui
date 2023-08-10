export const getUser = async (userData) => {
    console.log(userData);
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    console.log(response);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log(data, "data");
    return data;
};
export const addUser = async (newUserData) => {
    const response = await await fetch("http://localhost:8080/register", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
};
export const updateUser = async (userData) => {
    const response = await await fetch(`http://localhost:8080/user/id/${userData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        console.log(response);
        throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
};
