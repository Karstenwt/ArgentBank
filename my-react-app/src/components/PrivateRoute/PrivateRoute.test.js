import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PrivateRoute from "./PrivateRoute";

const mockStore = configureStore([]);

describe("PrivateRoute", () => {
  it("redirects to /sign-in if not authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <div>Protected Page</div>
                </PrivateRoute>
              }
            />
            <Route path="/sign-in" element={<div>Sign In Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("Sign In Page")).toBeInTheDocument();
  });

  it("renders the protected page if authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <div>Protected Page</div>
                </PrivateRoute>
              }
            />
            <Route path="/sign-in" element={<div>Sign In Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("Protected Page")).toBeInTheDocument();
  });
});
