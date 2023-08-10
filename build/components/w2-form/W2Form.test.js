import { jsx as _jsx } from "react/jsx-runtime";
import { renderWithProviders } from "../../utils/test.utils";
import { MemoryRouter } from "react-router-dom";
import W2Form from "./W2Form";
import { screen } from "@testing-library/react";
describe("W2Form tests", () => {
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
    const mockTaxData = {
        filingStatus: "",
        w2Income: "",
        w2Witheld: "",
        w2Address1: "",
        w2Address2: "",
        w2City: "",
        w2State: "",
        w2Zipcode: "",
        ten99Income: "",
        ten99Deductions: "",
        ten99Address1: "",
        ten99Address2: "",
        ten99City: "",
        ten99State: "",
        ten99Zipcode: "",
    };
    test("r", () => {
        renderWithProviders(_jsx(MemoryRouter, { children: _jsx(W2Form, { formData: mockTaxData, setIsInvalid: () => { } }) }), {
            preloadedState: {
                user: testDataNoLocation,
            },
        });
        const w2Income = screen.getByText("Income");
        expect(w2Income).toBeInTheDocument();
    });
});
