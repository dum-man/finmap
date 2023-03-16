import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import CreateTransfer from "./CreateTransfer";

describe("Component: CreateTransfer", () => {
  it("should render", async () => {
    render(<CreateTransfer setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /newTransfer/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter transfer amount", async () => {
    render(<CreateTransfer setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("sum, $");
    fireEvent.change(input, { target: { value: "1000" } });
    await waitFor(() => {
      expect(input.value).toBe("1 000");
    });
  });

  it("should enter transfer comment", async () => {
    render(<CreateTransfer setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/leaveComment/i);
    fireEvent.change(input, { target: { value: "comment" } });
    await waitFor(() => {
      expect(input.value).toBe("comment");
    });
  });
});
