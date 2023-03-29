import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import DeleteAccount from "./DeleteAccount";

describe("Component: DeleteAccount", () => {
  it("should render", async () => {
    render(<DeleteAccount setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /deleteAccount/i,
        })
      ).toBeInTheDocument();
    });
  });
});
