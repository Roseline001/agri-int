import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../components/Sidebar";
import { expect } from "vitest";

test("renders sidebar with name and page", () => {
    render(<Sidebar name="Rose" page="dashboard" />);
    expect(screen.getByText("Rose")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
})
test("test2", async () => {
    let chosen = "";
    render(
        <Sidebar name="Rose" page="dashboard" onNavigate={(word) => {chosen = word}} />
    );
    await
    userEvent.click(screen.getByText("⌖ Locations"));
    expect(chosen).toBe("locations")
})    