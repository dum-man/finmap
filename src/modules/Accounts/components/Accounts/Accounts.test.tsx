import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Accounts from "./Accounts";

describe("Component: Accounts", () => {
  it("should render", async () => {
    render(<Accounts setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /accounts/i,
        })
      ).toBeInTheDocument();
    });
  });
});
