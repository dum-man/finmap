import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import CreateTransferModal from "./CreateTransfer";

describe("Component: CreateTransferModal", () => {
  it("should render", async () => {
    render(<CreateTransferModal setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /newTransfer/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter transfer amount", async () => {
    render(<CreateTransferModal setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("sum, $");
    fireEvent.change(input, { target: { value: "1000" } });
    await waitFor(() => {
      expect(input.value).toBe("1 000");
    });
  });

  it("should enter transfer comment", async () => {
    render(<CreateTransferModal setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/leaveComment/i);
    fireEvent.change(input, { target: { value: "comment" } });
    await waitFor(() => {
      expect(input.value).toBe("comment");
    });
  });
});
