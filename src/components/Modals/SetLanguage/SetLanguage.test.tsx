import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test/customRender";
import SetLanguage from "./SetLanguage";

describe("Component: SetLanguage", () => {
  it("should render", async () => {
    render(<SetLanguage setOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /interfaceLanguage/i,
        })
      ).toBeInTheDocument();
    });
  });
});
