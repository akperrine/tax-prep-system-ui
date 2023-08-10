export const addTaxDocument = async (taxInfo) => {
    console.log(`http://localhost:8080/user/id/${taxInfo.userId}/document`);
    const response = await fetch(`http://localhost:8080/user/id/${taxInfo.userId}/document`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taxInfo),
    });
    const data = await response.json();
    return data;
};
export const getTaxCalcBeforeSubmit = async (taxInfo) => {
    const response = await fetch(`http://localhost:8080/tax/documents/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taxInfo),
    });
    const data = await response.json();
    return data;
};
