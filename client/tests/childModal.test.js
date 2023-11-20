import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

import ChildModal from "../src/components/modal/Modal";

describe("ChildModal component", () => {
  it("renders with given props", () => {
    const handleClose = jest.fn();

    const { getByText, getByRole } = render(
      <Router>
        <ChildModal show onClose={handleClose} />
      </Router>
    );

    const title = getByText("Registration successful.");
    const congratsText = getByText("Congratulations 🐸!");
    const loginText = getByText("Please, log in to your account!");
    const signInButton = getByRole("button", { name: "Sign in" });

    expect(title).toBeInTheDocument();
    expect(congratsText).toBeInTheDocument();
    expect(loginText).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it("does not render when show prop is false", () => {
    const handleClose = jest.fn();

    const { container } = render(
      <Router>
        <ChildModal show={false} onClose={handleClose} />
      </Router>
    );

    const modalContainer = container.querySelector(".MuiModal-root");

    expect(modalContainer).toBeNull();
  });
});
