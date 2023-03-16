import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import ResetPassword from "./ResetPassword";

describe("Component: ResetPassword", () => {
  it("should render", async () => {
    render(<ResetPassword setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /resetPassword/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter email", async () => {
    render(<ResetPassword setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("email");
    fireEvent.change(input, { target: { value: "test@mail.com" } });
    await waitFor(() => {
      expect(input.value).toBe("test@mail.com");
    });
  });
});
