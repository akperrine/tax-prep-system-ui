import {
  Dropdown,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useEffect } from "react";

function Ten99From({ formData, handleChange, setIsInvalid }) {
  const handleSubmit = () => {};

  useEffect(() => {
    const incomeRegex = /^(?:\$?)(?:\d{1,3}(?:,\d{3})*|\d+)\.\d{2}$/;
    // console.log(incomeRegex.test(formData.w2Income));
    if (incomeRegex.test(formData.ten99Income)) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [formData.ten99Income]);
  return (
    <>
      <div className="profileForm-container">
        <h2>Add 1099 form info</h2>

        <Form onSubmit={handleSubmit} large className="profile-form-container">
          <div className="profile-fieldset-container">
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="ten99Income">Income</Label>
              <TextInput
                id="ten99Income"
                name="ten99Income"
                type="text"
                value={formData.ten99Income}
                onChange={handleChange}
                required
              />
              <Label htmlFor="ten99Witheld" hint=" (optional)">
                Amount witheld
              </Label>
              <TextInput
                id="ten99Witheld"
                name="ten99Witheld"
                type="text"
                value={formData.ten99Witheld}
                onChange={handleChange}
                required
              />
            </Fieldset>
            <Fieldset legendStyle="large" className="profile-fieldset">
              <Label htmlFor="ten99Address1" hint=" (optional)">
                Street address 1
              </Label>
              <TextInput
                id="ten99Address1"
                name="ten99Address1"
                type="text"
                value={formData.ten99Address1}
                onChange={handleChange}
              />

              <Label htmlFor="ten99Address2" hint=" (optional)">
                Street address 2
              </Label>
              <TextInput
                id="ten99Address2"
                name="ten99Address2"
                type="text"
                onChange={handleChange}
                value={formData.ten99Address2}
              />
              <div className="grid-row grid-gap">
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="ten99City" hint=" (optional)">
                    City
                  </Label>
                  <TextInput
                    id="ten99City"
                    name="ten99City"
                    type="text"
                    value={formData.ten99City}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mobile-lg:grid-col-6">
                  <Label htmlFor="ten99State" hint=" (optional)">
                    State
                  </Label>
                  <Dropdown
                    id="ten99State"
                    name="ten99State"
                    value={formData.ten99State}
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

              <Label htmlFor="ten99Zipcode" hint=" (optional)">
                ZIP
              </Label>
              <TextInput
                type="text"
                name="ten99Zipcode"
                id="ten99Zipcode"
                value={formData.ten99Zipcode}
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

export default Ten99From;
