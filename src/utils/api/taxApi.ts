import { ITaxDocumentsDto } from "../interfaces";

export const addTaxDocument = async (taxInfo: ITaxDocumentsDto) => {
  console.log(`http://localhost:8080/user/id/${taxInfo.userId}/document`);
  const response = await fetch(
    `http://localhost:8080/user/id/${taxInfo.userId}/document`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taxInfo),
    }
  );

  const data = await response.json();
  return data;
};

// const response = await fetch("http://localhost:8080/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(userData),
// });
