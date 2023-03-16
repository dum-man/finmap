import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import ChangePassword from "./ChangePassword";

describe("Component: ChangePassword", () => {
  it("should render", async () => {
    render(<ChangePassword setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /changePassword/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter old password", async () => {
    render(<ChangePassword setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/oldPassword/i);
    fireEvent.change(input, { target: { value: "qwerty321" } });
    await waitFor(() => {
      expect(input.value).toBe("qwerty321");
    });
  });

  it("should enter new password", async () => {
    render(<ChangePassword setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/newPassword/i);
    fireEvent.change(input, { target: { value: "qwerty123" } });
    await waitFor(() => {
      expect(input.value).toBe("qwerty123");
    });
  });
});
