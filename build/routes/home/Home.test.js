import { jsx as _jsx } from "react/jsx-runtime";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { renderWithProviders } from "../../utils/test.utils";
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));
describe("Home page tests", () => {
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
    it("renders with user name", async () => {
        const { store } = renderWithProviders(_jsx(MemoryRouter, { children: _jsx(Home, {}) }), {
            preloadedState: {
                user: testDataNoLocation,
            },
        });
        expect(store.getState().user.firstName).toContain("Austin");
    });
});
