import {
  Button,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ISignUpUserDTO } from "../../utils/interfaces";

const defaultFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function SignUpForm() {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formInput;

    const inventoryDataPayload: ISignUpUserDTO = {
      ...formInput,
    };

    console.log(inventoryDataPayload);
  };

  const handleToggle = () => setShowPassword(!showPassword);
  return (
    <>
      <Form onSubmit={handleSubmit} large data-testid="custom-element">
        <Fieldset legend="Sign Up" legendStyle="large">
          <span>
            {/* or <a href="../login">Already have an account?</a> */}
            or <Link to={"/login"}>Already have an account?</Link>
          </span>
          <Label htmlFor="firstName">First Name</Label>
          <TextInput
            onChange={handleFormChange}
            className="usa-input"
            id="firstName"
            name="firstName"
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <Label htmlFor="lastName">Last Name</Label>
          <TextInput
            onChange={handleFormChange}
            className="usa-input"
            id="lastName"
            name="lastName"
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
          />
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
              aria-controls="password"
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
        </Fieldset>
      </Form>
    </>
  );
}

export default SignUpForm;
