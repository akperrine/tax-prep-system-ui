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
import { Link, json, useNavigate } from "react-router-dom";
import { ILoginUserDTO, IUser } from "../../utils/interfaces";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { StateAbbreviation } from "../../utils/enums";
import { getUser } from "../../utils/api/userApi";

const defaultFormInput = {
  email: "",
  password: "",
};

function LoginForm() {
  const [formInput, setFormInput] = useState(defaultFormInput);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
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
          console.log(error, "hi");
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
      </Card>
      {showError && (
        <Alert
          type="error"
          heading="User Not Found"
          headingLevel="h4"
          className="margin-1"
        >
          Wrong email or password
        </Alert>
      )}
    </>
  );
}

export default LoginForm;
