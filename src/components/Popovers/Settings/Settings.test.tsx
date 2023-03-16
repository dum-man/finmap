import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import Settings from "./Settings";

describe("Component: Settings", () => {
  it("should render", async () => {
    render(<Settings setOpen={() => {}} parentRef={null} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /settings/i,
        })
      ).toBeInTheDocument();
    });
  });
});
