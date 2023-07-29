import {
  Dropdown,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useEffect } from "react";

function W2Form({ formData, handleChange, setIsInvalid }) {
  const handleSubmit = () => {};

  useEffect(() => {
    const incomeRegex = /^(?:\$?)(?:\d{1,3}(?:,\d{3})*|\d+)\.\d{2}$/;
    // console.log(incomeRegex.test(formData.w2Income));
    if (incomeRegex.test(formData.w2Income)) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [formData.w2Income]);
  return (
    <>
      <div className="profileForm-container">
        <h2>Add W2 form info</h2>

        <Form onSubmit={handleSubmit} large className="profile-form-container">
          <div className="profile-fieldset-container">
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="w2Income">Income</Label>
              <TextInput
                id="w2Income"
                name="w2Income"
                type="text"
                value={formData.w2Income}
                onChange={handleChange}
                required
              />
              <Label htmlFor="w2Witheld" hint=" (optional)">
                Amount witheld
              </Label>
              <TextInput
                id="w2Witheld"
                name="w2Witheld"
                type="text"
                value={formData.w2Witheld}
                onChange={handleChange}
                required
              />
            </Fieldset>
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="w2Address1" hint=" (optional)">
                Street address 1
              </Label>
              <TextInput
                id="w2Address1"
                name="w2Address1"
                type="text"
                value={formData.w2Address1}
                onChange={handleChange}
              />

              <Label htmlFor="w2Address2" hint=" (optional)">
                Street address 2
              </Label>
              <TextInput
                id="w2Address2"
                name="w2Address2"
                type="text"
                onChange={handleChange}
                value={formData.w2Address2}
              />
              <div className="grid-row grid-gap">
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="w2City" hint=" (optional)">
                    City
                  </Label>
                  <TextInput
                    id="w2City"
                    name="w2City"
                    type="text"
                    value={formData.w2City}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="w2State" hint=" (optional)">
                    State
                  </Label>
                  <Dropdown
                    id="w2State"
                    name="w2State"
                    value={formData.w2State}
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

              <Label htmlFor="w2Zipcode" hint=" (optional)">
                ZIP
              </Label>
              <TextInput
                type="text"
                name="w2Zipcode"
                id="w2Zipcode"
                value={formData.w2Zipcode}
                onChange={handleChange}
                inputSize="medium"
                pattern="[\d]{5}(-[\d]{4})?"
              />
            </Fieldset>
          </div>
        </Form>
      </div>
    </>
  );
}

export default W2Form;
