import { useEffect, useRef, useState } from "react";
import ProfileForm from "../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FileStart from "../components/file-start/FileStart";
import { Alert, Button, ButtonGroup } from "@trussworks/react-uswds";
import FilingStatus from "../components/filing-status/FilingStatus";
import W2Form from "../components/w2-form/W2Form";
import Ten99From from "../components/1099-form/Ten99Form";
import ReviewFile from "../components/review-file/ReviewFile";
import { updateUser } from "../utils/api/userApi";
import { useDispatch } from "react-redux";
import { IUser } from "../utils/interfaces";
import { setUser } from "../redux/slices/userSlice";

function TaxFile() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
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
    w2Witheld: "",
    w2Address1: "",
    w2Address2: "",
    w2City: "",
    w2State: "",
    w2Zipcode: "",
    ten99Income: "",
    ten99Deductions: "",
    ten99Address1: "",
    ten99Address2: "",
    ten99City: "",
    ten99State: "",
    ten99Zipcode: "",
  });
  const [step, setStep] = useState(1);
  const [readyToFile, setReadyToFile] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidNext, setInvalidNext] = useState(false);
  // const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (user?.dob) {
      const yearMonthDay = user?.dob.slice(0, 10).split("-")!;
      const userYear = yearMonthDay[0];
      const userMonth = yearMonthDay[1];
      const userDay = yearMonthDay[2];

      setProfileFormData({
        ...profileFormData,
        day: userDay,
        month: userMonth,
        year: userYear,
      });
    }
    if (user?.ssn) {
      setProfileFormData({ ...profileFormData, ssn: user.ssn });
    }
    if (user?.location) {
      setProfileFormData({
        ...profileFormData,
        address1: user.location.address,
        city: user.location.city,
        state: user.location.state,
        zipcode: user.location.zipcode.toString(),
      });
    }
  }, []);

  const prevStep = () => {
    setStep(step - 1);
    setIsInvalid(false);
    setInvalidNext(false);
  };
  const nextStep = () => {
    console.log(isInvalid);
    if (isInvalid === false) {
      setInvalidNext(false);
      setStep(step + 1);
    } else {
      setInvalidNext(true);
    }
  };

  const handleReadyToFileClick = () => setReadyToFile(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, setterFunction) => {
    const { name, value } = e.target;
    console.log(name, value);
    setterFunction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const validateDate = (day: number, month: number, year: number): boolean => {
  //   const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  //   // no negative numbers
  //   if (day < 0 || month < 0 || year < 1900) return false;
  //   // check valid month
  //   if (month > 12) return false;
  //   //check not more days than a month
  //   // more than 31
  //   if (monthsWith31Days.includes(month) && day > 31) {
  //     return false;
  //     // Check days in Feb
  //   } else if (month == 2 && day > 28) {
  //     return false;
  //     // Check days with only 30 days
  //   } else if (day > 30) {
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async () => {
    const day = parseInt(profileFormData.day);
    const month = parseInt(profileFormData.month);
    const year = parseInt(profileFormData.year);
    const address2 =
      profileFormData.address2 === "" ? null : profileFormData.address2;
    const social = profileFormData.ssn.replace(/\-/g, "");

    // const isValidDate = validateDate(day, month, year);
    // if (!isValidDate) {
    // setInvalidDate(true);
    // } else {
    let date = new Date(year, month - 1, day);
    let ISODate = date.toISOString();
    if (user) {
      const userDTO: IUser = {
        id: user.id.toString(),
        firstName: profileFormData.firstName!,
        lastName: profileFormData.lastName!,
        email: profileFormData.email!,
        dob: ISODate,
        ssn: social,
        location: {
          address: profileFormData.address1!,
          address2: address2,
          city: profileFormData.city,
          state: profileFormData.state!,
          zipcode: parseInt(profileFormData.zipcode)!,
        },
      };
      try {
        const response = await updateUser(userDTO);
        dispatch(setUser(response));
        // setTimeout(() => {
        //   setVisibleToast(false);
        // }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
    // }
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
            setIsInvalid={setIsInvalid}
            setFileInvalidDate={setInvalidDate}
          />
        );
      case 2:
        return (
          <FilingStatus
            formData={taxFormData}
            setFormData={setTaxFormData}
            setIsInvalid={setIsInvalid}
          />
        );
      case 3:
        return (
          <W2Form
            formData={taxFormData}
            handleChange={(e) => handleChange(e, setTaxFormData)}
            setIsInvalid={setIsInvalid}
          />
        );
      case 4:
        return (
          <Ten99From
            formData={taxFormData}
            handleChange={(e) => handleChange(e, setTaxFormData)}
            setIsInvalid={setIsInvalid}
          />
        );
      case 5:
        return (
          <ReviewFile
            profileFormData={profileFormData}
            taxFormData={taxFormData}
          />
        );
      default:
    }
  };

  return (
    <>
      {readyToFile ? (
        <div>
          {invalidNext && (
            <Alert type="error" headingLevel="h4" className="margin-1" noIcon>
              Missing valid input
            </Alert>
          )}
          {invalidDate && (
            <Alert type="error" headingLevel="h4" className="margin-1" noIcon>
              Invalid Date
            </Alert>
          )}
          {renderStep()}
          <ButtonGroup type="default" className="margin-3">
            <Button type="button" disabled={step === 1} onClick={prevStep}>
              Back
            </Button>
            <Button type="button" disabled={step === 5} onClick={nextStep}>
              Continue
            </Button>
          </ButtonGroup>
          {step === 5 && (
            <Button type="submit" onClick={handleSubmit}>
              Submit and file
            </Button>
          )}
        </div>
      ) : (
        <FileStart handleClick={handleReadyToFileClick} />
      )}
    </>
  );
}

export default TaxFile;
