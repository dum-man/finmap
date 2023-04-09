import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import SetUsername from "./SetUsername";

describe("Component: SetUsername", () => {
  it("should render", async () => {
    render(<SetUsername onClose={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /username/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter username", async () => {
    render(<SetUsername onClose={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("username");
    fireEvent.change(input, { target: { value: "User's account" } });
    await waitFor(() => {
      expect(input.value).toBe("User's account");
    });
  });
});
