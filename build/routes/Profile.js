import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
function Profile() {
    const user = useSelector((state) => state.user.user);
    const [formData, setFormData] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        day: "",
        month: "",
        year: "",
        ssn: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (_jsx(_Fragment, { children: _jsx(ProfileForm, { formData: formData, setFormData: setFormData, handleChange: handleChange, hiddenSubmit: false, formHeading: "User Profile" }) }));
}
export default Profile;
