import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "test/customRender";
import SignUp from "./SignUp";

describe("Component: SignUp", () => {
  it("should render", async () => {
    render(<SignUp />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /registration/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter email", async () => {
    render(<SignUp />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
    fireEvent.change(input, { target: { value: "test@mail.com" } });
    await waitFor(() => {
      expect(input.value).toBe("test@mail.com");
    });
  });

  it("should enter password", async () => {
    render(<SignUp />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/registerPassword/);
    fireEvent.change(input, { target: { value: "test123" } });
    await waitFor(() => {
      expect(input.value).toBe("test123");
    });
  });

  it("should enter confirm password", async () => {
    render(<SignUp />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/confirmPassword/i);
    fireEvent.change(input, { target: { value: "qwerty123" } });
    await waitFor(() => {
      expect(input.value).toBe("qwerty123");
    });
  });
});
