import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Sidebar from "./Sidebar";

describe("Component: Sidebar", () => {
  it("should render", async () => {
    render(<Sidebar setCreateAccountOpen={() => {}} setDeleteAccountOpen={() => {}} />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /myAccounts/i,
        })
      ).toBeInTheDocument();
    });
  });
});
