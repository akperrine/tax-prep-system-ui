import { useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FileStart from "../components/file-start/FileStart";

function TaxFile() {
  const user = useSelector((state: RootState) => state.user.user);
  const [profileFormData, setProfileFormData] = useState({
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
  const [taxFormData, setTaxFormData] = useState({});
  const [step, setStep] = useState(0);
  const [readyToFile, setReadyToFile] = useState(false);

  const prevStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);

  const handleReadyToFileClick = () => setReadyToFile(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, setterFunction) => {
    const { name, value } = e.target;
    setterFunction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {readyToFile ? (
        <ProfileForm
          formData={profileFormData}
          setFormData={setProfileFormData}
          hiddenSubmit={true}
          handleChange={(e) => handleChange(e, setProfileFormData)}
          formHeading={"Please complete and verify"}
        />
      ) : (
        <FileStart handleClick={handleReadyToFileClick} />
      )}
    </>
  );
}

export default TaxFile;
