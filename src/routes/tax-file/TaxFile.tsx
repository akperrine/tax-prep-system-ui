import { useEffect, useRef, useState } from "react";
import ProfileForm from "../../components/profile-form/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FileStart from "../../components/file-start/FileStart";
import { Alert, Button, ButtonGroup } from "@trussworks/react-uswds";
import FilingStatus from "../../components/filing-status/FilingStatus";
import W2Form from "../../components/w2-form/W2Form";
import Ten99From from "../../components/1099-form/Ten99Form";
import ReviewFile from "../../components/review-file/ReviewFile";
import { updateUser } from "../../utils/api/userApi";
import { useDispatch } from "react-redux";
import { I1099, ITaxDocumentsDto, IUser, IW2 } from "../../utils/interfaces";
import { setUser, updateTaxDoc } from "../../redux/slices/userSlice";
import { addTaxDocument } from "../../utils/api/taxApi";

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
  const [visibleToast, setVisibleToast] = useState(false);

  useEffect(() => {
    console.log(isInvalid);
  }, [isInvalid]);

  useEffect(() => {
    let updateDay,
      updateMonth,
      updateYear,
      updateSsn,
      updateAddress1,
      updateAddress2,
      updateState,
      updateCity,
      updateZipcode = "";
    if (user?.dob) {
      const yearMonthDay = user?.dob.slice(0, 10).split("-")!;
      updateYear = yearMonthDay[0];
      updateMonth = yearMonthDay[1];
      updateDay = yearMonthDay[2];
    }
    if (user?.ssn) {
      // setFormData({ ...formData, ssn: user.ssn });
      updateSsn = user.ssn;
    }
    if (user?.location) {
      updateAddress1 = user.location.address;
      updateCity = user.location.city;
      updateState = user.location.state;
      updateZipcode = user.location.zipcode.toString();
      // setFormData({
      //   ...formData,
      //   address1: user.location.address,
      //   city: user.location.city,
      //   state: user.location.state,
      //   zipcode: user.location.zipcode.toString(),
      // });
    }
    setProfileFormData({
      ...profileFormData,
      day: updateDay!,
      month: updateMonth!,
      year: updateYear!,
      address1: updateAddress1!,
      ssn: updateSsn!,
      city: updateCity!,
      state: updateState!,
      zipcode: updateZipcode,
    });
  }, []);

  const prevStep = () => {
    setStep(step - 1);
    setIsInvalid(false);
    setInvalidNext(false);
  };
  const nextStep = () => {
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
    setterFunction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const day = parseInt(profileFormData.day);
    const month = parseInt(profileFormData.month);
    const year = parseInt(profileFormData.year);
    const address2 =
      profileFormData.address2 === "" ? null : profileFormData.address2;
    const social = profileFormData.ssn.replace(/\-/g, "");

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
    const w2IncomeNumber = parseInt(taxFormData.w2Income.replace(/[$,]/g, ""));
    const ten99IncomeNumber = parseInt(
      taxFormData.ten99Income.replace(/[$,]/g, "")
    );
    const numberWitheld =
      taxFormData.w2Witheld === "" ? 0 : parseInt(taxFormData.w2Witheld);
    const w2: IW2 = {
      employerEIN: "",
      income: w2IncomeNumber,
      witheld: numberWitheld,
      location: {
        address: taxFormData.w2Address1,
        address2: taxFormData.w2Address2,
        city: taxFormData.w2City,
        state: taxFormData.w2State,
        zipcode: parseInt(taxFormData.w2Zipcode),
      },
    };
    const ten99: I1099 = {
      payerTIN: "",
      income: ten99IncomeNumber,
      location: {
        address: taxFormData.ten99Address1,
        address2: taxFormData.ten99Address2,
        city: taxFormData.ten99City,
        state: taxFormData.ten99State,
        zipcode: parseInt(taxFormData.ten99Zipcode),
      },
    };
    let filingStatus;
    if (taxFormData.filingStatus === "single") {
      filingStatus = "SINGLE";
    } else {
      filingStatus = "MARRIED_FILING_JOINTLY";
    }
    const taxDocumentDto: ITaxDocumentsDto = {
      userId: user?.id!,
      maritalStatus: filingStatus,
      formW2s: [w2],
      form1099s: [ten99],
    };
    console.log(taxDocumentDto);
    try {
      const response = await addTaxDocument(taxDocumentDto);
      dispatch(updateTaxDoc(response));
      setVisibleToast(true);
      setTimeout(() => {
        setVisibleToast(false);
      }, 3000);
    } catch (error) {}
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
          <div
            className={`profile-update-notification ${
              visibleToast ? "visible" : ""
            }`}
          >
            <Alert
              type="success"
              heading="Tax Document Filed"
              headingLevel="h4"
              className="margin-3"
            ></Alert>
          </div>
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
