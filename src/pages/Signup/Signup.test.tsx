import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Signup from "./Signup";

describe("Component: Signup", () => {
  it("should render", async () => {
    render(<Signup />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /registration/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter email", async () => {
    render(<Signup />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/email/i);
    fireEvent.change(input, { target: { value: "test@mail.com" } });
    await waitFor(() => {
      expect(input.value).toBe("test@mail.com");
    });
  });

  it("should enter password", async () => {
    render(<Signup />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/registerPassword/);
    fireEvent.change(input, { target: { value: "test123" } });
    await waitFor(() => {
      expect(input.value).toBe("test123");
    });
  });

  it("should enter confirm password", async () => {
    render(<Signup />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/confirmPassword/i);
    fireEvent.change(input, { target: { value: "qwerty123" } });
    await waitFor(() => {
      expect(input.value).toBe("qwerty123");
    });
  });
});
