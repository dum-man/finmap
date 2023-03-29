import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import TransactionCategories from "./TransactionCategories";

describe("Component: TransactionCategories", () => {
  it("should render", async () => {
    render(<TransactionCategories setOpen={() => {}} type="income" />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /incomeCategories/i,
        })
      ).toBeInTheDocument();
    });
  });
});
