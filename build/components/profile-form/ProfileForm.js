import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, Button, DateInput, DateInputGroup, Dropdown, Fieldset, Form, Label, TextInput, } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import "./ProfileForm.css";
import { useSelector } from "react-redux";
import { updateUser } from "../../utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
function ProfileForm({ formData, setFormData, handleChange, hiddenSubmit, formHeading, setIsInvalid, setFileInvalidDate, }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [noLocation, setNoLocation] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);
    const [visibleToast, setVisibleToast] = useState(false);
    useEffect(() => {
        if (!setIsInvalid) {
            let updateDay, updateMonth, updateYear, updateSsn, updateAddress1, updateAddress2, updateState, updateCity, updateZipcode = "";
            if (user?.dob) {
                const yearMonthDay = user?.dob.slice(0, 10).split("-");
                updateYear = yearMonthDay[0];
                updateMonth = yearMonthDay[1];
                updateDay = yearMonthDay[2];
            }
            if (user?.ssn) {
                updateSsn = user.ssn;
            }
            if (user?.location) {
                updateAddress1 = user.location.address;
                updateCity = user.location.city;
                updateState = user.location.state;
                updateZipcode = user.location.zipcode.toString();
            }
            console.log(updateDay);
            setFormData({
                ...formData,
                day: updateDay,
                month: updateMonth,
                year: updateYear,
                address1: updateAddress1,
                ssn: updateSsn,
                city: updateCity,
                state: updateState,
                zipcode: updateZipcode,
            });
        }
    }, []);
    useEffect(() => {
        const isValidDate = !validateDate(parseInt(formData.day), parseInt(formData.month), parseInt(formData.year));
        console.log(formData.day);
        if (formData.day === "" ||
            formData.day === undefined ||
            formData.month === "" ||
            formData.month === undefined ||
            formData.year === "" ||
            formData.year === undefined ||
            formData.ssn === "" ||
            formData.ssn === undefined ||
            formData.address1 === "" ||
            formData.address1 === undefined ||
            formData.city === "" ||
            formData.city === undefined ||
            formData.state === "" ||
            formData.state === undefined ||
            formData.zipcode === "" ||
            formData.zipcode === undefined ||
            isValidDate) {
            setNoLocation(true);
            if (setIsInvalid) {
                setIsInvalid(true);
            }
            console.log("not good");
        }
        else {
            setNoLocation(false);
            if (setIsInvalid) {
                setIsInvalid(false);
            }
            console.log("all good but valid");
        }
        if (isValidDate) {
            if (setFileInvalidDate) {
                setFileInvalidDate(true);
            }
        }
        else {
            if (setFileInvalidDate) {
                setFileInvalidDate(false);
            }
        }
    }, [formData]);
    const validateDate = (day, month, year) => {
        const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
        // no negative numbers
        if (day < 1 || month < 1 || year < 1900)
            return false;
        // check valid month
        if (month > 12)
            return false;
        //check not more days than a month
        // more than 31
        if (monthsWith31Days.includes(month) && day > 31) {
            return false;
            // Check days in Feb
        }
        else if (month == 2 && day > 28) {
            return false;
            // Check days with only 30 days
        }
        else if (day > 30) {
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidDate(false);
        if (noLocation) {
            setVisibleToast(true);
            setTimeout(() => {
                setVisibleToast(false);
            }, 3000);
            return;
        }
        const day = parseInt(formData.day);
        const month = parseInt(formData.month);
        const year = parseInt(formData.year);
        const address2 = formData.address2 === "" ? null : formData.address2;
        const social = formData.ssn.replace(/\-/g, "");
        const isValidDate = validateDate(day, month, year);
        if (!isValidDate) {
            if (setFileInvalidDate) {
                setInvalidDate(true);
            }
        }
        else {
            let date = new Date(year, month - 1, day);
            let ISODate = date.toISOString();
            if (user) {
                const userDTO = {
                    id: user.id.toString(),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    dob: ISODate,
                    ssn: social,
                    location: {
                        address: formData.address1,
                        address2: address2,
                        city: formData.city,
                        state: formData.state,
                        zipcode: parseInt(formData.zipcode),
                    },
                };
                try {
                    const response = await updateUser(userDTO);
                    dispatch(setUser(response));
                    setVisibleToast(true);
                    setTimeout(() => {
                        setVisibleToast(false);
                    }, 3000);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "profileForm-container", children: [_jsx("div", { className: `profile-update-notification ${visibleToast ? "visible" : ""}`, children: noLocation ? (_jsx(Alert, { type: "error", heading: "Invalid: Missing Info", headingLevel: "h4", className: "margin-3" })) : (_jsx(Alert, { type: "success", heading: "Profile Updated", headingLevel: "h4", className: "margin-3" })) }), _jsx("h2", { children: `${formHeading}` }), _jsxs("div", { className: "profile-alert-container", children: [noLocation && (_jsx(Alert, { type: "warning", headingLevel: "h4", className: "margin-1", noIcon: true, children: "We're missing some information" })), invalidDate && (_jsx(Alert, { type: "error", headingLevel: "h4", className: "margin-1", noIcon: true, children: "Invalid Date" }))] }), _jsx(Form, { onSubmit: handleSubmit, large: true, className: "profile-form-container", children: _jsxs("div", { className: "profile-fieldset-container", children: [_jsxs(Fieldset, { legendStyle: "large", className: "profile-fieldset", children: [_jsx(Label, { htmlFor: "firstName", children: "First name" }), _jsx(TextInput, { id: "firstName", name: "firstName", type: "text", value: formData.firstName, onChange: handleChange, required: true }), _jsx(Label, { htmlFor: "lastName", children: "Last name" }), _jsx(TextInput, { id: "lastName", name: "lastName", type: "text", value: formData.lastName, onChange: handleChange, required: true }), _jsx(Label, { htmlFor: "email", children: "Email:" }), _jsx(TextInput, { type: "email", name: "email", id: "email", value: formData.email, onChange: handleChange, required: true }), _jsx(Label, { htmlFor: "dob", children: "Date of Birth (mm/dd/yyyy):" }), _jsxs(DateInputGroup, { children: [_jsx(DateInput, { id: "testDateInput", name: "month", label: "Month", unit: "month", value: formData.month, maxLength: 2, minLength: 1, onChange: handleChange }), _jsx(DateInput, { id: "testDateInput", name: "day", label: "Day", unit: "day", value: formData.day, maxLength: 2, minLength: 1, onChange: handleChange }), _jsx(DateInput, { id: "testDateInput", name: "year", label: "Year", unit: "year", value: formData.year, maxLength: 4, minLength: 4, onChange: handleChange })] }), _jsx(Label, { htmlFor: "ssn", children: "SSN:" }), _jsx(TextInput, { type: "text", name: "ssn", id: "ssn", value: formData.ssn, onChange: handleChange, required: true })] }), _jsxs(Fieldset, { legendStyle: "large", className: "profile-fieldset", children: [_jsx(Label, { htmlFor: "address1", children: "Street address 1" }), _jsx(TextInput, { id: "address1", name: "address1", type: "text", value: formData.address1, onChange: handleChange, required: true }), _jsx(Label, { htmlFor: "address2", hint: " (optional)", children: "Street address 2" }), _jsx(TextInput, { id: "address2", name: "address2", type: "text", value: formData.address2, onChange: handleChange }), _jsxs("div", { className: "grid-row grid-gap", children: [_jsxs("div", { className: "mobile-lg:grid-col-6", children: [_jsx(Label, { htmlFor: "city", children: "City" }), _jsx(TextInput, { id: "city", name: "city", type: "text", value: formData.city, onChange: handleChange, required: true })] }), _jsxs("div", { className: "mobile-lg:grid-col-6", children: [_jsx(Label, { htmlFor: "state", children: "State" }), _jsxs(Dropdown, { id: "state", name: "state", value: formData.state, onChange: handleChange, required: true, children: [_jsx("option", { children: "- -" }), _jsx("option", { value: "AL", children: "Alabama" }), _jsx("option", { value: "AK", children: "Alaska" }), _jsx("option", { value: "AZ", children: "Arizona" }), _jsx("option", { value: "AR", children: "Arkansas" }), _jsx("option", { value: "CA", children: "California" }), _jsx("option", { value: "CO", children: "Colorado" }), _jsx("option", { value: "CT", children: "Connecticut" }), _jsx("option", { value: "DE", children: "Delaware" }), _jsx("option", { value: "DC", children: "District of Columbia" }), _jsx("option", { value: "FL", children: "Florida" }), _jsx("option", { value: "GA", children: "Georgia" }), _jsx("option", { value: "HI", children: "Hawaii" }), _jsx("option", { value: "ID", children: "Idaho" }), _jsx("option", { value: "IL", children: "Illinois" }), _jsx("option", { value: "IN", children: "Indiana" }), _jsx("option", { value: "IA", children: "Iowa" }), _jsx("option", { value: "KS", children: "Kansas" }), _jsx("option", { value: "KY", children: "Kentucky" }), _jsx("option", { value: "LA", children: "Louisiana" }), _jsx("option", { value: "ME", children: "Maine" }), _jsx("option", { value: "MD", children: "Maryland" }), _jsx("option", { value: "MA", children: "Massachusetts" }), _jsx("option", { value: "MI", children: "Michigan" }), _jsx("option", { value: "MN", children: "Minnesota" }), _jsx("option", { value: "MS", children: "Mississippi" }), _jsx("option", { value: "MO", children: "Missouri" }), _jsx("option", { value: "MT", children: "Montana" }), _jsx("option", { value: "NE", children: "Nebraska" }), _jsx("option", { value: "NV", children: "Nevada" }), _jsx("option", { value: "NH", children: "New Hampshire" }), _jsx("option", { value: "NJ", children: "New Jersey" }), _jsx("option", { value: "NM", children: "New Mexico" }), _jsx("option", { value: "NY", children: "New York" }), _jsx("option", { value: "NC", children: "North Carolina" }), _jsx("option", { value: "ND", children: "North Dakota" }), _jsx("option", { value: "OH", children: "Ohio" }), _jsx("option", { value: "OK", children: "Oklahoma" }), _jsx("option", { value: "OR", children: "Oregon" }), _jsx("option", { value: "PA", children: "Pennsylvania" }), _jsx("option", { value: "RI", children: "Rhode Island" }), _jsx("option", { value: "SC", children: "South Carolina" }), _jsx("option", { value: "SD", children: "South Dakota" }), _jsx("option", { value: "TN", children: "Tennessee" }), _jsx("option", { value: "TX", children: "Texas" }), _jsx("option", { value: "UT", children: "Utah" }), _jsx("option", { value: "VT", children: "Vermont" }), _jsx("option", { value: "VA", children: "Virginia" }), _jsx("option", { value: "WA", children: "Washington" }), _jsx("option", { value: "WV", children: "West Virginia" }), _jsx("option", { value: "WI", children: "Wisconsin" }), _jsx("option", { value: "WY", children: "Wyoming" }), _jsx("option", { value: "AA", children: "AA - Armed Forces Americas" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Africa" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Canada" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Europe" }), _jsx("option", { value: "AE", children: "AE - Armed Forces Middle East" }), _jsx("option", { value: "AP", children: "AP - Armed Forces Pacific" })] })] })] }), _jsx(Label, { htmlFor: "zipcode", children: "ZIP" }), _jsx(TextInput, { type: "text", name: "zipcode", id: "zipcode", inputSize: "medium", pattern: "[\\d]{5}(-[\\d]{4})?", value: formData.zipcode, onChange: handleChange, required: true })] })] }) }), !hiddenSubmit && (_jsx(Button, { form: "profile-form-container", type: "submit", size: "big", className: "margin-3", onClick: handleSubmit, children: "Submit" }))] }) }));
}
export default ProfileForm;
