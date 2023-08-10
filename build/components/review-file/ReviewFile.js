import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Grid, GridContainer } from "@trussworks/react-uswds";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTaxCalcBeforeSubmit } from "../../utils/api/taxApi";
function ReviewFile({ profileFormData, taxFormData }) {
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        const w2IncomeNumber = parseInt(taxFormData.w2Income.replace(/[$,]/g, ""));
        const ten99IncomeNumber = parseInt(taxFormData.ten99Income.replace(/[$,]/g, ""));
        const numberWitheld = taxFormData.w2Witheld === "" ? 0 : parseInt(taxFormData.w2Witheld);
        const w2 = {
            employerEIN: "",
            income: w2IncomeNumber,
            witheld: numberWitheld,
            location: {
                address: taxFormData.w2Address1,
                address2: taxFormData.w2Address2,
                city: taxFormData.w2City,
                state: taxFormData.w2State,
                zipcode: parseInt(taxFormData.w2Zipcode),
            },
        };
        const ten99 = {
            payerTIN: "",
            income: ten99IncomeNumber,
            location: {
                address: taxFormData.ten99Address1,
                address2: taxFormData.ten99Address2,
                city: taxFormData.ten99City,
                state: taxFormData.ten99State,
                zipcode: parseInt(taxFormData.ten99Zipcode),
            },
        };
        let filingStatus;
        if (taxFormData.filingStatus === "single") {
            filingStatus = "SINGLE";
        }
        else {
            filingStatus = "MARRIED_FILING_JOINTLY";
        }
        const taxDocumentDto = {
            userId: user?.id,
            maritalStatus: filingStatus,
            formW2s: [w2],
            form1099s: [ten99],
        };
        console.log(taxDocumentDto);
        (async () => {
            console.log("fire");
            const response = await getTaxCalcBeforeSubmit(taxDocumentDto);
            console.log(response);
        })();
    }, []);
    const checkAddressPresent = (address, city, state, zipcode) => {
        if (address === "" || city === "" || state === "" || zipcode === "")
            return false;
        else {
            return true;
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Please Review Your Info" }), _jsxs(GridContainer, { className: "margin-top-2", children: [_jsxs(Grid, { row: true, gap: "md", className: "padding-top-1 padding-bottom-1 border", children: [_jsxs(Grid, { col: 3, className: "padding-1", children: [_jsx("u", { children: "Name" }), ": ", profileFormData.firstName, " ", profileFormData.lastName] }), _jsxs(Grid, { col: 3, className: "padding-1 ", children: [_jsx("u", { children: "Email" }), ": ", profileFormData.email] }), _jsxs(Grid, { col: 3, className: "padding-1", children: [_jsx("u", { children: "DOB" }), ":", " ", `${profileFormData.day}/${profileFormData.month}/${profileFormData.year}`] }), _jsxs(Grid, { col: 3, className: "padding-1", children: [_jsx("u", { children: "SSN" }), ": ", profileFormData.ssn] }), _jsxs(Grid, { col: 9, className: "padding-1 ", children: [_jsx("u", { children: "Address" }), ":", " ", checkAddressPresent(profileFormData.address1, profileFormData.city, profileFormData.state, profileFormData.zipcode)
                                        ? `${profileFormData.address1} ${profileFormData.city}, ${profileFormData.state} ${profileFormData.zipcode}`
                                        : "N/A"] }), _jsxs(Grid, { col: 3, className: "padding-1", children: [_jsx("u", { children: "Filing Status" }), ": ", taxFormData.filingStatus] })] }), _jsxs(Grid, { row: true, gap: "md", className: "padding-top-1 padding-bottom-1 border", children: [_jsxs(Grid, { col: 4, className: "padding-1", children: [_jsx("u", { children: "W2 Income" }), ": ", taxFormData.w2Income] }), _jsxs(Grid, { col: 6, className: "padding-1", children: [_jsx("u", { children: "W2 Witheld" }), ":", " ", taxFormData.w2Witheld === "" ? "N/A" : taxFormData.w2Witheld] }), _jsxs(Grid, { col: 4, className: "padding-1", children: [_jsx("u", { children: "W2 Business Address" }), ":", " ", checkAddressPresent(taxFormData.w2Address1, taxFormData.w2City, taxFormData.w2State, taxFormData.w2Zipcode)
                                        ? `${taxFormData.w2Address1} ${taxFormData.w2City}, ${taxFormData.w2State} ${taxFormData.w2Zipcode}`
                                        : "N/A"] })] }), _jsxs(Grid, { row: true, gap: "md", className: "padding-top-1 padding-bottom-1 border", children: [_jsxs(Grid, { col: 4, className: "padding-1", children: [_jsx("u", { children: "1099 Income" }), ": ", taxFormData.ten99Income] }), _jsxs(Grid, { col: 6, className: "padding-1", children: [_jsx("u", { children: "1099 Deductions" }), ":", " ", taxFormData.ten99Deductions === ""
                                        ? "N/A"
                                        : taxFormData.ten99Deductions] }), _jsxs(Grid, { col: 4, className: "padding-1", children: [_jsx("u", { children: "1099 Business Address" }), ":", " ", checkAddressPresent(taxFormData.ten99Address1, taxFormData.ten99City, taxFormData.ten99State, taxFormData.ten99Zipcode)
                                        ? `${taxFormData.ten99Address1} ${taxFormData.ten99City}, ${taxFormData.ten99State} ${taxFormData.ten99Zipcode}`
                                        : "N/A"] })] })] })] }));
}
export default ReviewFile;
