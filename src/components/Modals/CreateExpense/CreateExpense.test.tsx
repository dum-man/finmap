import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import CreateExpense from "./CreateExpense";

describe("Component: CreateExpense", () => {
  it("should render", async () => {
    render(<CreateExpense setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /newExpense/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter transaction amount", async () => {
    render(<CreateExpense setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("sum, $");
    fireEvent.change(input, { target: { value: "1000" } });
    await waitFor(() => {
      expect(input.value).toBe("1 000");
    });
  });

  it("should enter transaction comment", async () => {
    render(<CreateExpense setOpen={() => {}} />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/leaveComment/i);
    fireEvent.change(input, { target: { value: "comment" } });
    await waitFor(() => {
      expect(input.value).toBe("comment");
    });
  });
});
