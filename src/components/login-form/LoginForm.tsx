import {
  Button,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILoginUserDTO } from "../../utils/interfaces";
import { getUser } from "../../utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { StateAbbreviation } from "../../utils/enums";

const defaultFormInput = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => setShowPassword((showPassword) => !showPassword);

  // update inputs to state
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userPayload: ILoginUserDTO = {
      ...formInput,
    };
    try {
      // getUser(userPayload);
      const mockReturn = {
        id: 1,
        firstName: "Austin",
        lastName: "Perrine",
        email: "a@p.com",
        dob: "1993-03-17T05:00:00.000+00:00",
        location: {
          id: 1,
          address: "123 way",
          address2: null,
          city: "Scottsdale",
          state: StateAbbreviation.AZ,
          zipcode: 11222,
        },
        appUserInformation: {
          ssn: 123456789,
          taxDocuments: [],
        },
      };
      dispatch(setUser(mockReturn));
      setFormInput(defaultFormInput);
      setShowPassword(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} large data-testid="custom-element">
        <Fieldset legend="Sign In" legendStyle="large">
          <span>
            or <Link to={"/signup"}>Create an account</Link>
          </span>
          <Label htmlFor="email">Email</Label>
          <TextInput
            onChange={handleFormChange}
            className="usa-input"
            id="email"
            name="email"
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <Label htmlFor="password">Password</Label>
          <TextInput
            onChange={handleFormChange}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
          />
          <p className="usa-form__note">
            <a
              title="Show password"
              //   href="javascript:void(0);"
              className="usa-show-password"
              aria-controls="password-sign-in"
              onClick={handleToggle}
            >
              {showPassword ? "Hide password" : "Show password"}
            </a>
          </p>

          <Button type="submit">Sign in</Button>
          <p>
            <Button type="button" className="usa-button--base">
              Google Sign In
            </Button>
          </p>
          {/* <a
              className="usa-b"
              href="javascript:void(0);"
              title="Forgot password"
            >
              Forgot password?
            </a> */}
        </Fieldset>
      </Form>
    </>
  );
}

export default LoginForm;
