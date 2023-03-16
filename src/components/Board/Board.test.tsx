import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Board from "./Board";

describe("Component: Board", () => {
  it("should render", async () => {
    render(<Board />);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
});
