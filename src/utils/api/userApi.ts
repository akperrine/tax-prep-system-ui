import { ILoginUserDTO, ISignUpUserDTO } from "../interfaces";
export const getUser = async (userData: ILoginUserDTO) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
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
  const data = await response.json();
  return data;
};
