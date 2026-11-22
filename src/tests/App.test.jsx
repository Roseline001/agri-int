
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App"
import { AuthContext } from "../AuthContext";

test("display loading when user is null and loading is true", () => {
    render(
        <AuthContext.Provider value={{ user: null, loading: true }}>
            <App />
        </AuthContext.Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("shows welcome back when user is null and loading is false", () => {
    render(
        <AuthContext.Provider value={{ user: null, loading: false }}>
            <App />
        </AuthContext.Provider>
    );

    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
});

test("clicking create one shows create your account", async () => {
    render(
        <AuthContext.Provider value={{ user: null, loading: false }}>
            <App />
        </AuthContext.Provider>
    );

    await userEvent.click(screen.getByText("Create one"));

    expect(screen.getByText("Create your account")).toBeInTheDocument();
});
