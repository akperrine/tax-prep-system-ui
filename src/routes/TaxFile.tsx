import { useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FileStart from "../components/file-start/FileStart";
import { Button, ButtonGroup } from "@trussworks/react-uswds";

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
  const [step, setStep] = useState(1);
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ProfileForm
            formData={profileFormData}
            setFormData={setProfileFormData}
            hiddenSubmit={true}
            handleChange={(e) => handleChange(e, setProfileFormData)}
            formHeading={"Please complete and verify"}
          />
        );
      default:
    }
  };

  return (
    <>
      {readyToFile ? (
        <div>
          {renderStep()}
          <ButtonGroup type="default" className="margin-3">
            <Button type="button" disabled={step === 1}>
              Back
            </Button>
            <Button type="button">Continue</Button>
          </ButtonGroup>
        </div>
      ) : (
        <FileStart handleClick={handleReadyToFileClick} />
      )}
    </>
  );
}

export default TaxFile;
