import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import SetLanguage from "./SetLanguage";

describe("Component: SetLanguagePopover", () => {
  it("should render", async () => {
    render(<SetLanguage />);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
