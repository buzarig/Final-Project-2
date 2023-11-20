// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
import { render} from "@testing-library/react";
import Register from "../src/components/register/Register.jsx";
// import userEvent from "@testing-library/user-event";
// import Register from "../src/components/register/Register";
// import api from "../src/http/api";


// Mocking the api module
// jest.mock("../../http/api", () => ({
//   post: jest.fn(() => Promise.resolve({ data: {} }))
// }));

// import { getByPlaceholderText } from "@testing-library/react";


describe("Register component", () => {
  test("renders Register component", () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    // Assert that the input elements are rendered
    // expect(true).toBe(true);
    expect(getByPlaceholderText("First name")).toBeInTheDocument();
    // expect(getByPlaceholderText("Last name")).toBeInTheDocument();
    // expect(getByPlaceholderText("Telephone")).toBeInTheDocument();
    // expect(getByPlaceholderText("Email")).toBeInTheDocument();
    // expect(getByPlaceholderText("Login")).toBeInTheDocument();
    // expect(getByPlaceholderText("Password")).toBeInTheDocument();
    // expect(getByPlaceholderText("Repeat your password")).toBeInTheDocument();
    //
    // // Assert that the button is rendered
    // expect(getByText("Registration")).toBeInTheDocument();
  });

  // test("submits the form with valid data", async () => {
  //   const { getByPlaceholderText, getByText } = render(<Register />);
  //
  //   // Fill in the form
  //   userEvent.type(getByPlaceholderText("First name"), "John");
  //   userEvent.type(getByPlaceholderText("Last name"), "Doe");
  //   userEvent.type(getByPlaceholderText("Telephone"), "+123456789012");
  //   userEvent.type(getByPlaceholderText("Email"), "john.doe@example.com");
  //   userEvent.type(getByPlaceholderText("Login"), "john_doe");
  //   userEvent.type(getByPlaceholderText("Password"), "password123");
  //   userEvent.type(getByPlaceholderText("Repeat your password"), "password123");
  //
  //   // Submit the form
  //   fireEvent.click(getByText("Registration"));
  //
  //   // Wait for the asynchronous API call
  //   await waitFor(() => expect(api.post).toHaveBeenCalled());
  //
  //   // Assert that the status component is rendered
  //   expect(getByText("StatusOk")).toBeInTheDocument();
  // });

  // Add more tests as needed for different scenarios (e.g., invalid data, error handling, etc.)
});

// test('demo', () => {
//   expect(true).toBe(true)
// })

