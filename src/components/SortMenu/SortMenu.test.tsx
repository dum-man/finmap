import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import SortMenu from "./SortMenu";

describe("Component: SortMenu", () => {
  it("should render", async () => {
    render(<SortMenu />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /type/i,
        })
      ).toBeInTheDocument();
    });
  });
});
