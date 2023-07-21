import {
  Alert,
  Button,
  Card,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ISignUpUserDTO } from "../../utils/interfaces";
import { addUser } from "../../utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const defaultFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function SignUpForm() {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inventoryDataPayload: ISignUpUserDTO = {
      ...formInput,
    };

    try {
      await addUser(inventoryDataPayload).then((data) => {
        dispatch(setUser(data));
        navigate("/");
      });
    } catch (error) {
      setShowError(true);
    }
  };

  const handleToggle = () => setShowPassword(!showPassword);
  return (
    <>
      <Card>
        <Form onSubmit={handleSubmit} large data-testid="custom-element">
          <Fieldset legend="Sign Up" legendStyle="large">
            <span>
              or <Link to={"/"}>Already have an account?</Link>
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
      </Card>
      {showError && (
        <Alert
          type="error"
          heading="User Not Found"
          headingLevel="h4"
          className="margin-1"
        >
          User already exists
        </Alert>
      )}
    </>
  );
}

export default SignUpForm;
