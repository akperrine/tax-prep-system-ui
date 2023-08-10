import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Radio } from "@trussworks/react-uswds";
import { FilingStatusOptions } from "../../utils/enums";
import "./FilingStatus.css";
import { useEffect, useState } from "react";
function FilingStatus({ formData, setFormData, setIsInvalid }) {
    const [selected, setSelected] = useState("none");
    const handleClick = (e) => {
        setSelected(e.target.name);
        setFormData({ ...formData, filingStatus: e.target.name });
    };
    useEffect(() => {
        if (formData.filingStatus === "") {
            setIsInvalid(true);
        }
        else {
            setSelected(formData.filingStatus);
            setIsInvalid(false);
        }
    }, [formData.filingStatus]);
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Filing Status" }), _jsxs("div", { className: "filing-radio-container", children: [_jsx(Radio, { id: "input-radio-single", name: "single", label: "Single", checked: selected === FilingStatusOptions.SINGLE, onChange: handleClick }), _jsx(Radio, { id: "input-radio-jointly", name: "jointly", label: "Jointly", checked: selected === FilingStatusOptions.MARRIED_FILING_JOINTLY, onChange: handleClick })] })] }));
}
export default FilingStatus;
