import {
  Alert,
  Button,
  DateInput,
  DateInputGroup,
  Dropdown,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { ChangeEvent, useEffect, useState } from "react";
import "./ProfileForm.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUser } from "../../utils/api/userApi";
import { IUser } from "../../utils/interfaces";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

function ProfileForm({
  formData,
  setFormData,
  handleChange,
  hiddenSubmit,
  formHeading,
  setIsInvalid,
  setFileInvalidDate,
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [noLocation, setNoLocation] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);

  useEffect(() => {
    if (!setIsInvalid) {
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
    const isValidDate = !validateDate(
      parseInt(formData.day),
      parseInt(formData.month),
      parseInt(formData.year)
    );
    console.log(formData.day);

    if (
      formData.day === "" ||
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
      isValidDate
    ) {
      setNoLocation(true);
      if (setIsInvalid) {
        setIsInvalid(true);
      }
      console.log("not good");
    } else {
      if (setIsInvalid) {
        setNoLocation(false);
        setIsInvalid(false);
      }
      console.log("all good but valid");
    }
    if (isValidDate) {
      setFileInvalidDate(true);
    } else {
      setFileInvalidDate(false);
    }

    // if (setFileInvalidDate) {
    //   if (
    //     validateDate(
    //       parseInt(formData.day),
    //       parseInt(formData.month),
    //       parseInt(formData.year)
    //     )
    //   ) {
    //     console.log(
    //       validateDate(
    //         parseInt(formData.day),
    //         parseInt(formData.month),
    //         parseInt(formData.year)
    //       )
    //     );
    //     setFileInvalidDate(false);
    //     setIsInvalid(false);
    //   } else {
    //     setFileInvalidDate(true);
    //     setIsInvalid(true);
    //   }
    // }
  }, [formData]);

  const validateDate = (day: number, month: number, year: number): boolean => {
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
    // no negative numbers
    if (day < 1 || month < 1 || year < 1900) return false;
    // check valid month
    if (month > 12) return false;
    //check not more days than a month
    // more than 31
    if (monthsWith31Days.includes(month) && day > 31) {
      return false;
      // Check days in Feb
    } else if (month == 2 && day > 28) {
      return false;
      // Check days with only 30 days
    } else if (day > 30) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalidDate(false);

    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);
    const address2 = formData.address2 === "" ? null : formData.address2;
    const social = formData.ssn.replace(/\-/g, "");

    const isValidDate = validateDate(day, month, year);
    if (!isValidDate) {
      setInvalidDate(true);
    } else {
      let date = new Date(year, month - 1, day);
      let ISODate = date.toISOString();
      if (user) {
        const userDTO: IUser = {
          id: user.id.toString(),
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          email: formData.email!,
          dob: ISODate,
          ssn: social,
          location: {
            address: formData.address1!,
            address2: address2,
            city: formData.city,
            state: formData.state!,
            zipcode: parseInt(formData.zipcode)!,
          },
        };
        try {
          const response = await updateUser(userDTO);
          dispatch(setUser(response));
          setVisibleToast(true);
          setTimeout(() => {
            setVisibleToast(false);
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <div className="profileForm-container">
        <div
          className={`profile-update-notification ${
            visibleToast ? "visible" : ""
          }`}
        >
          <Alert
            type="success"
            heading="Profile Updated"
            headingLevel="h4"
            className="margin-3"
          ></Alert>
        </div>
        <h2>{`${formHeading}`}</h2>
        <div className="profile-alert-container">
          {noLocation && (
            <Alert type="warning" headingLevel="h4" className="margin-1" noIcon>
              We're missing some information
            </Alert>
          )}
          {invalidDate && (
            <Alert type="error" headingLevel="h4" className="margin-1" noIcon>
              Invalid Date
            </Alert>
          )}
        </div>
        <Form onSubmit={handleSubmit} large className="profile-form-container">
          <div className="profile-fieldset-container">
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="firstName">First name</Label>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Label htmlFor="lastName">Last name</Label>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <Label htmlFor="email">Email:</Label>
              <TextInput
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Label htmlFor="dob">Date of Birth (mm/dd/yyyy):</Label>
              <DateInputGroup>
                <DateInput
                  id="testDateInput"
                  name="month"
                  label="Month"
                  unit="month"
                  value={formData.month}
                  maxLength={2}
                  minLength={1}
                  onChange={handleChange}
                />
                <DateInput
                  id="testDateInput"
                  name="day"
                  label="Day"
                  unit="day"
                  value={formData.day}
                  maxLength={2}
                  minLength={1}
                  onChange={handleChange}
                />
                <DateInput
                  id="testDateInput"
                  name="year"
                  label="Year"
                  unit="year"
                  value={formData.year}
                  maxLength={4}
                  minLength={4}
                  onChange={handleChange}
                />
              </DateInputGroup>
              <Label htmlFor="ssn">SSN:</Label>
              <TextInput
                type="text"
                name="ssn"
                id="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
              />
            </Fieldset>
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="address1">Street address 1</Label>
              <TextInput
                id="address1"
                name="address1"
                type="text"
                value={formData.address1}
                onChange={handleChange}
                required
              />

              <Label htmlFor="address2" hint=" (optional)">
                Street address 2
              </Label>
              <TextInput
                id="address2"
                name="address2"
                type="text"
                value={formData.address2}
                onChange={handleChange}
              />

              <div className="grid-row grid-gap">
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="city">City</Label>
                  <TextInput
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="state">State</Label>
                  <Dropdown
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option>- -</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="AA">AA - Armed Forces Americas</option>
                    <option value="AE">AE - Armed Forces Africa</option>
                    <option value="AE">AE - Armed Forces Canada</option>
                    <option value="AE">AE - Armed Forces Europe</option>
                    <option value="AE">AE - Armed Forces Middle East</option>
                    <option value="AP">AP - Armed Forces Pacific</option>
                  </Dropdown>
                </div>
              </div>

              <Label htmlFor="zipcode">ZIP</Label>
              <TextInput
                type="text"
                name="zipcode"
                id="zipcode"
                inputSize="medium"
                pattern="[\d]{5}(-[\d]{4})?"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </Fieldset>
          </div>
        </Form>
        {!hiddenSubmit && (
          <Button
            form="profile-form-container"
            type="submit"
            size="big"
            className="margin-3"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
}

export default ProfileForm;
