import {
  Button,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  return (
    <>
      <Form onSubmit={handleSubmit} large>
        <Fieldset legend="Sign In" legendStyle="large">
          <span>
            or <a href="javascript:void(0);">create an account</a>
          </span>
          <Label htmlFor="username">Email Address</Label>
          <TextInput
            className="usa-input"
            id="username"
            name="username"
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <Label htmlFor="password-sign-in">Password</Label>
          <TextInput
            id="password-sign-in"
            name="password-sign-in"
            type={showPassword ? "text" : "password"}
          />
          <p className="usa-form__note">
            <a
              title="Show password"
              //   href="javascript:void(0);"
              className="usa-show-password"
              aria-controls="password-sign-in"
              onClick={(): void =>
                setShowPassword((showPassword) => !showPassword)
              }
            >
              {showPassword ? "Hide password" : "Show password"}
            </a>
          </p>

          <Button type="submit">Sign in</Button>
          <p>
            <p>
              <Button type="button" className="usa-button--base">
                Google Sign In
              </Button>
            </p>
            <a
              className="usa-b"
              href="javascript:void(0);"
              title="Forgot password"
            >
              Forgot password?
            </a>
          </p>
        </Fieldset>
      </Form>
    </>
  );
}

export default LoginForm;
