import { jsx as _jsx } from "react/jsx-runtime";
import { renderWithProviders } from "../../utils/test.utils";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";
describe("SignUp tests", () => {
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
    test("store renders", () => {
        const { getByText, store } = renderWithProviders(_jsx(MemoryRouter, { children: _jsx(SignUp, {}) }), {
            preloadedState: {
                user: null,
            },
        });
        expect(store.getState().user).toBe(null);
    });
});
