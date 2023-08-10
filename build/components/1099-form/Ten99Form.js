import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dropdown, Fieldset, Form, Label, TextInput, } from "@trussworks/react-uswds";
import { useEffect } from "react";
function Ten99From({ formData, handleChange, setIsInvalid }) {
    const handleSubmit = () => { };
    useEffect(() => {
        const incomeRegex = /^(?:\$?)(?:\d{1,3}(?:,\d{3})*|\d+)\.\d{2}$/;
        // console.log(incomeRegex.test(formData.w2Income));
        if (incomeRegex.test(formData.ten99Income)) {
            setIsInvalid(false);
        }
        else {
            setIsInvalid(true);
        }
    }, [formData.ten99Income]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "profileForm-container", children: [_jsx("h2", { children: "Add 1099 form info" }), _jsx(Form, { onSubmit: handleSubmit, large: true, className: "profile-form-container", children: _jsxs("div", { className: "profile-fieldset-container", children: [_jsxs(Fieldset, { legendStyle: "large", className: "profile-fieldset", children: [_jsx(Label, { htmlFor: "ten99Income", hint: " *put 0.00 if N/A", children: "Income" }), _jsx(TextInput, { id: "ten99Income", name: "ten99Income", type: "text", value: formData.ten99Income, onChange: handleChange, required: true }), _jsx(Label, { htmlFor: "ten99Witheld", hint: " (optional)", children: "Amount witheld" }), _jsx(TextInput, { id: "ten99Witheld", name: "ten99Witheld", type: "text", value: formData.ten99Deductions, onChange: handleChange, required: true })] }), _jsxs(Fieldset, { legendStyle: "large", className: "profile-fieldset", children: [_jsx(Label, { htmlFor: "ten99Address1", hint: " (optional)", children: "Street address 1" }), _jsx(TextInput, { id: "ten99Address1", name: "ten99Address1", type: "text", value: formData.ten99Address1, onChange: handleChange }), _jsx(Label, { htmlFor: "ten99Address2", hint: " (optional)", children: "Street address 2" }), _jsx(TextInput, { id: "ten99Address2", name: "ten99Address2", type: "text", onChange: handleChange, value: formData.ten99Address2 }), _jsxs("div", { className: "grid-row grid-gap", children: [_jsxs("div", { className: "mobile-lg:grid-col-6", children: [_jsx(Label, { htmlFor: "ten99City", hint: " (optional)", children: "City" }), _jsx(TextInput, { id: "ten99City", name: "ten99City", type: "text", value: formData.ten99City, onChange: handleChange, required: true })] }), _jsxs("div", { className: "mobile-lg:grid-col-6", children: [_jsx(Label, { htmlFor: "ten99State", hint: " (optional)", children: "State" }), _jsxs(Dropdown, { id: "ten99State", name: "ten99State", value: formData.ten99State, onChange: handleChange, required: true, children: [_jsx("option", { children: "- -" }), _jsx("option", { value: "AL", children: "Alabama" }), _jsx("option", { value: "AK", children: "Alaska" }), _jsx("option", { value: "AZ", children: "Arizona" }), _jsx("option", { value: "AR", children: "Arkansas" }), _jsx("option", { value: "CA", children: "California" }), _jsx("option", { value: "CO", children: "Colorado" }), _jsx("option", { value: "CT", children: "Connecticut" }), _jsx("option", { value: "DE", children: "Delaware" }), _jsx("option", { value: "DC", children: "District of Columbia" }), _jsx("option", { value: "FL", children: "Florida" }), _jsx("option", { value: "GA", children: "Georgia" }), _jsx("option", { value: "HI", children: "Hawaii" }), _jsx("option", { value: "ID", children: "Idaho" }), _jsx("option", { value: "IL", children: "Illinois" }), _jsx("option", { value: "IN", children: "Indiana" }), _jsx("option", { value: "IA", children: "Iowa" }), _jsx("option", { value: "KS", children: "Kansas" }), _jsx("option", { value: "KY", children: "Kentucky" }), _jsx("option", { value: "LA", children: "Louisiana" }), _jsx("option", { value: "ME", children: "Maine" }), _jsx("option", { value: "MD", children: "Maryland" }), _jsx("option", { value: "MA", children: "Massachusetts" }), _jsx("option", { value: "MI", children: "Michigan" }), _jsx("option", { value: "MN", children: "Minnesota" }), _jsx("option", { value: "MS", children: "Mississippi" }), _jsx("option", { value: "MO", children: "Missouri" }), _jsx("option", { value: "MT", children: "Montana" }), _jsx("option", { value: "NE", children: "Nebraska" }), _jsx("option", { value: "NV", children: "Nevada" }), _jsx("option", { value: "NH", children: "New Hampshire" }), _jsx("option", { value: "NJ", children: "New Jersey" }), _jsx("option", { value: "NM", children: "New Mexico" }), _jsx("option", { value: "NY", children: "New York" }), _jsx("option", { value: "NC", children: "North Carolina" }), _jsx("option", { value: "ND", children: "North Dakota" }), _jsx("option", { value: "OH", children: "Ohio" }), _jsx("option", { value: "OK", children: "Oklahoma" }), _jsx("option", { value: "OR", children: "Oregon" }), _jsx("option", { value: "PA", children: "Pennsylvania" }), _jsx("option", { value: "RI", children: "Rhode Island" }), _jsx("option", { value: "SC", children: "South Carolina" }), _jsx("option", { value: "SD", children: "South Dakota" }), _jsx("option", { value: "TN", children: "Tennessee" }), _jsx("option", { value: "TX", children: "Texas" }), _jsx("option", { value: "UT", children: "Utah" }), _jsx("option", { value: "VT", children: "Vermont" }), _jsx("option", { value: "VA", children: "Virginia" }), _jsx("option", { value: "WA", children: "Washington" }), _jsx("option", { value: "WV", children: "West Virginia" }), _jsx("option", { value: "WI", children: "Wisconsin" }), _jsx("option", { value: "WY", children: "Wyoming" }), _jsx("option", { value: "AA", children: "AA - Armed Forces Americas" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Africa" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Canada" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Europe" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Middle East" }), _jsx("option", { value: "AP", children: "AP - Armed Forces Pacific" })] })] })] }), _jsx(Label, { htmlFor: "ten99Zipcode", hint: " (optional)", children: "ZIP" }), _jsx(TextInput, { type: "text", name: "ten99Zipcode", id: "ten99Zipcode", value: formData.ten99Zipcode, onChange: handleChange, inputSize: "medium", pattern: "[\\d]{5}(-[\\d]{4})?" })] })] }) })] }) }));
}
export default Ten99From;
