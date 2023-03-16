import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Navigation from "./Navigation";

describe("Component: Navigation", () => {
  it("should render", async () => {
    render(<Navigation />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /actions/i,
        })
      ).toBeInTheDocument();
    });
  });
});
