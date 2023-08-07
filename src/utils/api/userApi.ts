import { ILoginUserDTO, ISignUpUserDTO, IUser } from "../interfaces";
// export const getUser = async (userData: ILoginUserDTO) => {
//   const response = await fetch("http://localhost:8080/login", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   if (!response.ok) {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
//   const data = await response.json();
//   return data;
// };

export const getUser = async (userData: ILoginUserDTO) => {
  const username = userData.email;
  const password = userData.password;

  const headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(username + ":" + password));

  const response = await fetch("http://localhost:8080/login", {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data.principal;
};

export const addUser = async (newUserData: ISignUpUserDTO) => {
  const response = await await fetch("http://localhost:8080/register", {
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

export const updateUser = async (userData: IUser): Promise<IUser> => {
  const response = await await fetch(
    `http://localhost:8080/user/id/${userData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data;
};
