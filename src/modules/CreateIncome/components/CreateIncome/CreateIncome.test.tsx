import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import CreateIncome from "./CreateIncome";

describe("Component: CreateIncome", () => {
  it("should render", async () => {
    render(<CreateIncome setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /newIncome/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter transaction amount", async () => {
    render(<CreateIncome setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("sum, $");
    fireEvent.change(input, { target: { value: "1000" } });
    await waitFor(() => {
      expect(input.value).toBe("1 000");
    });
  });

  it("should enter transaction comment", async () => {
    render(<CreateIncome setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/leaveComment/i);
    fireEvent.change(input, { target: { value: "comment" } });
    await waitFor(() => {
      expect(input.value).toBe("comment");
    });
  });
});
