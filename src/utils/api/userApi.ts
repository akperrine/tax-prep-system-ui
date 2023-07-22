import { ILoginUserDTO, ISignUpUserDTO } from "../interfaces";
export const getUser = async (userData: ILoginUserDTO) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  console.log(response.ok);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data;
};

export const addUser = async (newUserData: ISignUpUserDTO) => {
  const response = await await fetch("http://localhost:8080/user/register", {
    method: "POST",
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
