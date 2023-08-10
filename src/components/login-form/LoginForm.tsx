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
import { ILoginUserDTO, IUser } from "../../utils/interfaces";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { getUser } from "../../utils/api/userApi";

const defaultFormInput = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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
      await getUser(userPayload)
        .then((data) => {
          dispatch(setUser(data));
          navigate("/");
        })
        .catch((error) => {
          setShowError(true);
          setErrorMessage(error.message);
        });
    } catch (error) {
      setFormInput(defaultFormInput);
      setShowPassword(false);
    }
  };
  return (
    <>
      <Card>
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
              type="email"
              autoCapitalize="off"
              autoCorrect="off"
              required
            />
            <Label htmlFor="password">Password</Label>
            <TextInput
              onChange={handleFormChange}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
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
          {errorMessage ? errorMessage : "Sorry, something went wrong."}
        </Alert>
      )}
    </>
  );
}

export default LoginForm;
