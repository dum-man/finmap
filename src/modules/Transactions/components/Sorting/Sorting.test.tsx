import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Sorting from "./Sorting";

describe("Component: Sorting", () => {
  it("should render", async () => {
    render(<Sorting />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /type/i,
        })
      ).toBeInTheDocument();
    });
  });
});
