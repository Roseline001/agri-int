import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register";
import { expect } from "vitest";

test("Displays error when passwords do not match", 
async () => {
    render (<Register />)
    await
    userEvent.type(screen.getByPlaceholderText("Enter your name"), "Rose");
    await
    userEvent.type(screen.getByPlaceholderText("Enter your email"), "rose@gmail.com");
    await
    userEvent.type(screen.getByPlaceholderText("Create a password"), "Rose123");
    await
    userEvent.type(screen.getByPlaceholderText("Confirm your password"), "Rose456");
    await userEvent.click(screen.getByText("Create account"));
    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
});
test("Displays error when passwords is less than six characters", 
async () => {
    render (<Register />)
    await
    userEvent.type(screen.getByPlaceholderText("Enter your name"), "Rose");
    await
    userEvent.type(screen.getByPlaceholderText("Enter your email"), "rose@gmail.com");
    await
    userEvent.type(screen.getByPlaceholderText("Create a password"), "123");
    await
    userEvent.type(screen.getByPlaceholderText("Confirm your password"), "123");
    await userEvent.click(screen.getByText("Create account"));
    expect(screen.getByText("Password needs at least 6 characters.")).toBeInTheDocument();
});