import { useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IUser, IUserState } from "../utils/interfaces";

function Profile() {
  const user = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState<IUser>({
    firstName: user?.firstName!,
    lastName: user?.lastName!,
    email: user?.email!,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <ProfileForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        hiddenSubmit={false}
        formHeading="User Profile"
      />
    </>
  );
}

export default Profile;
