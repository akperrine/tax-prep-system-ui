import { ILoginUserDTO, ISignUpUserDTO } from "../interfaces";
export const getUser = async (userData: ILoginUserDTO) => {
  try {
    console.log("url: ", `http://localhost:8080/warehouse/${id}`);
    const response = await fetch(`http://localhost:8080/warehouse/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
  }
};

export const addUser = async (newUserData: ISignUpUserDTO) => {
  return await fetch("http://localhost:8080/warehouse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: location }),
  });
};
