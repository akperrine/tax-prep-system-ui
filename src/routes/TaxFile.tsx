import { useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FileStart from "../components/file-start/FileStart";
import {
  Button,
  ButtonGroup,
  PrimaryNav,
  ProcessList,
  ProcessListHeading,
  ProcessListItem,
} from "@trussworks/react-uswds";
import FilingStatus from "../components/filing-status/FilingStatus";
import W2Form from "../components/w2-form/W2Form";
import Ten99From from "../components/1099-form/Ten99Form";
import ReviewFile from "../components/review-file/ReviewFile";

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
  const [taxFormData, setTaxFormData] = useState({
    filingStatus: "",
    w2Income: "",
    w2witheld: "",
    w2Address1: "",
    w2Address2: "",
    w2City: "",
    w2State: "",
    w2Zipcode: "",
    ten99Income: "",
    Ten99witheld: "",
    Ten99Address1: "",
    Ten99Address2: "",
    Ten99City: "",
    Ten99State: "",
    Ten99Zipcode: "",
  });
  console.log(taxFormData);
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
      case 2:
        return (
          <FilingStatus formData={taxFormData} setFormData={setTaxFormData} />
        );
      case 3:
        return (
          <W2Form
            formData={taxFormData}
            setFormData={setTaxFormData}
            handleChange={(e) => handleChange(e, setTaxFormData)}
          />
        );
      case 4:
        return (
          <Ten99From
            formData={taxFormData}
            setFormData={setTaxFormData}
            handleChange={(e) => handleChange(e, setTaxFormData)}
          />
        );
      case 5:
        return (
          <ReviewFile
          // profileFormData={profileFormData}
          // taxFormData={taxFormData}
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
            <Button type="button" disabled={step === 1} onClick={prevStep}>
              Back
            </Button>
            <Button type="button" disabled={step === 5} onClick={nextStep}>
              Continue
            </Button>
          </ButtonGroup>
          {step === 5 && <Button type="submit">Submit and file</Button>}
        </div>
      ) : (
        <FileStart handleClick={handleReadyToFileClick} />
      )}
    </>
  );
}

export default TaxFile;
