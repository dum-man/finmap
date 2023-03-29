import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Calendar from "./Calendar";

describe("Component: Calendar", () => {
  it("should render", async () => {
    render(<Calendar />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /calendar/i,
        })
      ).toBeInTheDocument();
    });
  });
});
