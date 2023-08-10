import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardBody, CardHeader } from "@trussworks/react-uswds";
import "./TaxView.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTaxCalcBeforeSubmit } from "../../utils/api/taxApi";
function TaxView() {
    const user = useSelector((state) => state.user.user);
    const [taxBreakdown, setTaxBreakdown] = useState({
        totalIncome: 0,
        amountOwed: 0,
        incomeAfterTaxes: 0,
        taxRate: 0,
    });
    let taxDocumentLength = 0;
    if (user?.taxDocuments) {
        taxDocumentLength = user.taxDocuments.length;
    }
    useEffect(() => {
        if (user?.taxDocuments && user.taxDocuments.length > 0) {
            const latestTaxDoc = user.taxDocuments[user.taxDocuments.length - 1];
            const totIncome = parseInt(latestTaxDoc.form1099s[0].income) +
                parseInt(latestTaxDoc.formW2s[0].income);
            // console.log(latestTaxDoc, totIncome);
            (async () => {
                const taxCalc = await getTaxCalcBeforeSubmit(latestTaxDoc);
                console.log(taxCalc);
                const afterTax = totIncome - taxCalc;
                const taxRate = Math.round((taxCalc / totIncome) * 10000) / 100;
                setTaxBreakdown({
                    ...taxBreakdown,
                    totalIncome: totIncome,
                    amountOwed: taxCalc,
                    incomeAfterTaxes: afterTax,
                    taxRate: taxRate,
                });
            })();
        }
    }, []);
    return (_jsx(_Fragment, { children: taxDocumentLength > 0 ? (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("div", { className: "tax-view-header-container", children: _jsx("h3", { className: "usa-card__heading", children: "Your tax breakdown" }) }) }), _jsx(CardBody, { children: _jsxs("div", { className: "tax-view-body-container", children: [_jsxs("div", { className: "margin-top-2 margin-bottom-2", children: [_jsx("p", { className: "font-sans-6 text-primary fs-1", children: "Total Income " }), _jsxs("span", { className: "text-black", children: ["$", taxBreakdown.totalIncome.toLocaleString()] })] }), _jsxs("div", { className: "margin-top-2 margin-bottom-2", children: [_jsx("p", { className: "font-sans-6 text-primary", children: "Amount Owed" }), _jsxs("span", { className: "text-black", children: ["$", taxBreakdown.amountOwed.toLocaleString()] })] }), _jsxs("div", { className: "margin-top-2 margin-bottom-2", children: [_jsx("p", { className: "font-sans-6 text-primary font-size-lg", children: "Income After Taxes" }), _jsxs("span", { className: "text-black", children: ["$", taxBreakdown.incomeAfterTaxes.toLocaleString()] })] }), _jsxs("div", { className: "margin-top-2 margin-bottom-2", children: [_jsx("p", { className: "font-sans-6 text-primary font-size-lg", children: "Tax Rate" }), _jsxs("span", { className: "text-black", children: [taxBreakdown.taxRate.toLocaleString(), "%"] })] })] }) })] })) : (_jsxs("div", { children: [_jsx("h1", { children: "There is currently no tax documents" }), _jsx("p", { children: "Please file your taxes" })] })) }));
}
export default TaxView;
