import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import TransfersMenu from "./TransfersMenu";

describe("Component: TransfersMenu", () => {
  it("should render", async () => {
    render(<TransfersMenu setOpen={() => {}} parentRef={null} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /transfers/i,
        })
      ).toBeInTheDocument();
    });
  });
});
