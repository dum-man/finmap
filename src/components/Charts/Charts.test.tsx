import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Charts from "./Charts";

describe("Component: Charts", () => {
  it("should render", async () => {
    HTMLCanvasElement.prototype.getContext = jest.fn();

    render(<Charts />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /analytics/i,
        })
      ).toBeInTheDocument();
    });
  });
});
