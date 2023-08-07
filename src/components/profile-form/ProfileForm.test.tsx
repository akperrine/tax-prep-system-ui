import { MemoryRouter } from "react-router-dom";
import Profile from "./ProfileForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test.utils";
import ProfileForm from "./ProfileForm";

describe("Profile Form tests", () => {
  const testDataWithLocation = {
    id: 1,
    firstName: "Austin",
    lastName: "Perrine",
    email: "a@p.com",
    dob: "1993-03-17T05:00:00.000+00:00",
    ssn: "123121234",
    location: {
      id: 1,
      address: "123 way",
      address2: null,
      city: "Scottsdale",
      state: "AZ",
      zipcode: "11222",
    },
    appUserInformation: {
      id: 1,
      taxDocuments: [],
    },
  };
  const testDataNoLocation = {
    id: 1,
    firstName: "Austin",
    lastName: "Perrine",
    email: "a@p.com",
    dob: null,
    ssn: null,
    location: null,
    appUserInformation: {
      id: 1,
      taxDocuments: [],
    },
  };

  const mockFormData = {
    firstName: "Austin",
    lastName: "Perrin",
    email: "test@mail.com",
    day: "",
    month: "",
    year: "",
    ssn: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  };

  it("renders", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProfileForm
          setFileInvalidDate={false}
          formData={mockFormData}
          setFormData={() => {}}
          handleChange={() => {}}
          hiddenSubmit={() => {}}
          formHeading={"Update Profile"}
          setIsInvalid={() => {}}
        />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SSN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street address 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street address 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZIP/i)).toBeInTheDocument();
  });
  it("renders", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProfileForm
          setFileInvalidDate={false}
          formData={mockFormData}
          setFormData={() => {}}
          handleChange={() => {}}
          hiddenSubmit={() => {}}
          formHeading={"Update Profile"}
          setIsInvalid={() => {}}
        />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataWithLocation,
        },
      }
    );
    expect(
      screen.getByText("We're missing some information")
    ).toBeInTheDocument();
  });
});
