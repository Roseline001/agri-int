
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { AuthContext } from "../AuthContext";

test("display greeting with user's name", () => {
    globalThis.fetch = async () => ({
        ok: false
    });

    render(
        <AuthContext.Provider value={{
            user: {
                uid: "u1",
                displayName: "Rose Test"
            },
            loading: false
        }}>
            <Dashboard />
        </AuthContext.Provider>
    );

    expect(screen.getByText(/, Rose/)).toBeInTheDocument();
});

test("display error when weather fails to load", async () => {
    globalThis.fetch = async () => ({
        ok: false
    });

    render(
        <AuthContext.Provider value={{
            user: {
                uid: "u1",
                displayName: "Rose Test"
            },
            loading: false
        }}>
            <Dashboard />
        </AuthContext.Provider>
    );

    expect(await screen.findByText("Could not load the weather, Check your connection.")).toBeInTheDocument();
});
