import authReducer, { loginSuccess, loginFailure, logout } from "./authSlice";

describe("authSlice tests", () => {
  // Test initial state
  it("should return the initial state", () => {
    const initialState = {
      token: null,
      isAuthenticated: false,
      error: null,
    };
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  // Test login success
  it("should update the state with a token on successful login", () => {
    const previousState = {
      token: null,
      isAuthenticated: false,
      error: null,
    };

    const actionPayload = "sample-token";
    const newState = authReducer(previousState, loginSuccess(actionPayload));

    expect(newState).toEqual({
      token: "sample-token",
      isAuthenticated: true,
      error: null,
    });
  });

  // Test login failure
  it("should set an error message on failed login", () => {
    const previousState = {
      token: null,
      isAuthenticated: false,
      error: null,
    };

    const actionPayload = "Invalid credentials";
    const newState = authReducer(previousState, loginFailure(actionPayload));

    expect(newState).toEqual({
      token: null,
      isAuthenticated: false,
      error: "Invalid credentials",
    });
  });

  // Test logout
  it("should clear the state on logout", () => {
    const previousState = {
      token: "sample-token",
      isAuthenticated: true,
      error: null,
    };

    const newState = authReducer(previousState, logout());

    expect(newState).toEqual({
      token: null,
      isAuthenticated: false,
      error: null,
    });
  });
});
