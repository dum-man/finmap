import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import SetLanguageDropdown from "./SetLanguageDropdown";

describe("Component: SetLanguageDropdown", () => {
  it("should render", async () => {
    render(<SetLanguageDropdown />);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
