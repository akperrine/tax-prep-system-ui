import { renderWithProviders } from "../../utils/test.utils";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";
import App from "../../App";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";

describe("Navigation tests", () => {
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

  beforeEach(() => {});

  test("renders navigation links correctly", () => {
    const { getByText, store } = renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      {
        preloadedState: {
          user: testDataNoLocation,
        },
      }
    );

    console.log(store.getState());

    // Test whether navigation links are present
    const homeLink = getByText("Home");
    // const aboutLink = getByText("File Taxes");
    const contactLink = getByText("Profile");

    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});
