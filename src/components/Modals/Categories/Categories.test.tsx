import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import Categories from "./Categories";

describe("Component: Categories", () => {
  it("should render", async () => {
    render(<Categories setOpen={() => {}} type="income" />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /incomeCategories/i,
        })
      ).toBeInTheDocument();
    });
  });
});
