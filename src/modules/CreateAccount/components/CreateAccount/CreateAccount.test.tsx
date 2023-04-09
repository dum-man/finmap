import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import CreateAccount from "./CreateAccount";

describe("Component: CreateAccount", () => {
  it("should render", async () => {
    render(<CreateAccount onClose={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /addAccount/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter account name", async () => {
    render(<CreateAccount onClose={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/name/i);
    fireEvent.change(input, { target: { value: "Bank account" } });
    await waitFor(() => {
      expect(input.value).toBe("Bank account");
    });
  });

  it("should enter account balance", async () => {
    render(<CreateAccount onClose={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/startingBalance/i);
    fireEvent.change(input, { target: { value: "1000" } });
    await waitFor(() => {
      expect(input.value).toBe("1 000");
    });
  });
});
