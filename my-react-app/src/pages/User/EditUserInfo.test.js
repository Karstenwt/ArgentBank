import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import User from "./User";

const mockStore = configureStore([]);

describe("User Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: true },
    });
  });

  it("should render the user page with edit button", () => {
    const { getByText } = render(
      <Provider store={store}>
        <User />
      </Provider>
    );
    expect(getByText(/welcome back/i)).toBeInTheDocument();
    expect(getByText(/edit name/i)).toBeInTheDocument();
  });

  it("should show the edit form when edit button is clicked", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    fireEvent.click(getByText(/edit name/i));

    expect(getByText(/edit user info/i)).toBeInTheDocument();
    expect(getByLabelText(/username:/i)).toBeInTheDocument();
    expect(getByLabelText(/first name:/i)).toBeInTheDocument();
    expect(getByLabelText(/last name:/i)).toBeInTheDocument();
  });

  it("should return to the default view when cancel is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <User />
      </Provider>
    );

    fireEvent.click(getByText(/edit name/i));
    fireEvent.click(getByText(/cancel/i));

    expect(getByText(/welcome back/i)).toBeInTheDocument();
    expect(getByText(/edit name/i)).toBeInTheDocument();
  });
});
