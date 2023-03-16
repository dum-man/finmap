import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import Transfers from "./Transfers";

describe("Component: Transfers", () => {
  it("should render", async () => {
    render(<Transfers setOpen={() => {}} parentRef={null} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /transfers/i,
        })
      ).toBeInTheDocument();
    });
  });
});
